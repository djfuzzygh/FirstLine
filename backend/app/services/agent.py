import json
import os
import torch
from typing import List, Dict, Any
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from ..schemas.triage import IntakeRequest, TriageResult, FollowUpQuestion, ReferralSummary

class TriageAgent:
    def __init__(self, mode=None):
        self.mode = mode or os.getenv("FIRSTLINE_MODE", "mock")
        self.model_id = "google/medgemma-1.5-4b-it"
        self.tokenizer = None
        self.model = None
        
        if self.mode == "actual":
            print(f"📦 Loading {self.model_id}...")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_id)
            
            # Determine best device (MPS for Mac, CUDA for Linux, CPU as fallback)
            device = "cpu"
            if torch.backends.mps.is_available():
                device = "mps"
            elif torch.cuda.is_available():
                device = "cuda"
            
            print(f"🎯 Target Device: {device}")
            
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_id,
                torch_dtype=torch.bfloat16,
                device_map="auto"
            )
            print("✅ Model loaded successfully.")

    def check_red_flags(self, intake: IntakeRequest) -> List[str]:
        """Deterministic rule-based check for emergency signs."""
        flags = []
        if intake.rr and intake.rr > 50:
            flags.append("Tachypnea (High Respiratory Rate)")
        if intake.temp_c and intake.temp_c > 39.5:
            flags.append("High Fever (>39.5°C)")
        if intake.pregnancy_status:
            if "bleeding" in intake.symptoms.lower():
                flags.append("Pregnancy-related Bleeding")
            if "headache" in intake.symptoms.lower() and "vision" in intake.symptoms.lower():
                flags.append("Suspected Pre-eclampsia (Severe Headache + Vision Changes)")
        if any(word in intake.symptoms.lower() for word in ["seizure", "convulsion", "unconscious", "lethargic"]):
            flags.append("Altered Consciousness or Seizures")
        return flags

    def _call_model(self, prompt: str) -> str:
        """Helper to run inference."""
        if self.mode == "mock":
            return ""
        
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
        with torch.no_grad():
            outputs = self.model.generate(**inputs, max_new_tokens=512, temperature=0.1)
        
        full_response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        response_body = full_response.split(prompt)[-1].strip()
        print(f"🤖 RAW AI RESPONSE:\n{response_body}\n{'-'*30}")
        return response_body

    def _extract_json(self, text: str, start_char: str, end_char: str) -> str:
        """Helper to extract JSON strings from messy model output."""
        try:
            # First try finding content between markers if they exist (e.g. ```json )
            if "```" in text:
                content = text.split("```")[1]
                if content.startswith("json"):
                    content = content[4:].strip()
                return content
            
            # Fallback to character finding
            start = text.find(start_char)
            end = text.rfind(end_char)
            if start != -1 and end != -1:
                return text[start:end+1]
            return text
        except:
            return text

    async def generate_followups(self, intake: IntakeRequest) -> List[FollowUpQuestion]:
        """
        Generate follow-up questions using MedGemma (in actual mode) or Rule-based (backup).
        """
        # 1. Rule-Based Safety Checks (Always include 1 critical check)
        from .question_bank import select_questions
        
        intake_dict = {
            'symptoms': intake.symptoms,
            'age': intake.age,
            'sex': intake.sex,
            'duration_days': intake.duration_days,
            'pregnancy_status': getattr(intake, 'pregnancy_status', False)
        }
        
        rule_based_questions = select_questions(intake_dict)
        final_questions = []

        # 2. AI Generation (If in Actual Mode)
        if self.mode == "actual":
            prompt = f"""<start_of_turn>user
Patient: {intake.age}yo {intake.sex}
Symptoms: {intake.symptoms}
Duration: {intake.duration_days} days
Visual Observation: {intake.image_description if intake.image_description else "None provided"}

Act as a clinical expert.
Generate 2 targeted follow-up questions to rule out serious conditions or clarify the diagnosis.
CRITICAL: Do NOT ask questions that are already answered by the symptoms above (e.g. if they say "vomiting", don't ask "are they vomiting?").
Focus on missing information like severity, frequency, or associated symptoms.

Return ONLY JSON array:
[
  {{ "question": "...", "options": ["Yes", "No"] }},
  {{ "question": "...", "options": [] }}
]<end_of_turn>
<start_of_turn>model
"""
            try:
                response = self._call_model(prompt)
                json_str = self._extract_json(response, "[", "]")
                ai_questions = json.loads(json_str)
                
                # Add AI questions first
                for q in ai_questions:
                    final_questions.append(
                        FollowUpQuestion(
                            question=q.get('question', 'Unknown'),
                            options=q.get('options', [])
                        )
                    )
            except Exception as e:
                print(f"⚠️ AI Question Gen Failed: {e}")
        
        # 3. Add Rule-Based Safety Questions (Fill remaining slots up to 5)
        # We prioritize the most critical rule-based questions (usually at the top of the list)
        for q in rule_based_questions:
            if len(final_questions) >= 5:
                break
            # Avoid duplicates (simple check by question text)
            if not any(existing.question == q['question'] for existing in final_questions):
                 final_questions.append(
                    FollowUpQuestion(
                        question=q['question'],
                        options=q.get('options', [])
                    )
                )

        return final_questions[:5] # Cap at 5 questions max

    async def perform_triage(self, intake: IntakeRequest, followups: Dict[str, str]) -> TriageResult:
        red_flags = self.check_red_flags(intake)
        if red_flags:
            return TriageResult(
                risk_tier="RED",
                danger_signs=red_flags,
                reasoning="Emergency signs detected deterministically.",
                uncertainty="LOW",
                recommended_actions=["Refer immediately"]
            )

        if self.mode == "mock":
            return TriageResult(
                risk_tier="GREEN", 
                danger_signs=[], 
                reasoning="Mock green result.", 
                uncertainty="LOW", 
                recommended_actions=["Monitor"],
                first_aid_advice=["Keep hydrated"],
                monitoring_metrics=["Temperature every 4 hours"]
            )

        prompt = f"""<start_of_turn>user
Assign a triage tier (GREEN/YELLOW/RED) for:
Patient: {intake.age}yo {intake.sex}, Symptoms: {intake.symptoms}
Visual Observation: {intake.image_description if intake.image_description else "None provided"}
History: {json.dumps(followups)}

Provide specific FIRST AID advice (immediate steps) and MONITORING METRICS (what to watch).

Return ONLY JSON:
{{
  "risk_tier": "...",
  "danger_signs": [],
  "reasoning": "...",
  "uncertainty": "...",
  "recommended_actions": [],
  "first_aid_advice": ["Step 1...", "Step 2..."],
  "monitoring_metrics": ["Respiratory Rate", "Temperature"]
}}<end_of_turn>
<start_of_turn>model
"""
        response = self._call_model(prompt)
        try:
            json_str = self._extract_json(response, "{", "}")
            data = json.loads(json_str)
            # Safe defaults if missing
            if 'first_aid_advice' not in data: data['first_aid_advice'] = []
            if 'monitoring_metrics' not in data: data['monitoring_metrics'] = []
            
            return TriageResult(**data)
        except Exception as e:
            print(f"❌ Triage Parsing Error: {e}")
            return TriageResult(
                risk_tier="YELLOW", 
                danger_signs=[], 
                reasoning="Safety fallback: Error parsing AI reasoning.", 
                uncertainty="HIGH", 
                recommended_actions=["Manual clinical review required"],
                first_aid_advice=["Consult supervisor"],
                monitoring_metrics=["Vitals"]
            )

    async def generate_referral(self, intake: IntakeRequest, triage: TriageResult) -> ReferralSummary:
        """
        Generate professional SOAP note for referral.
        Uses structured format that always works, with optional AI enhancement.
        """
        from datetime import datetime
        
        # Generate structured SOAP note
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
        
        # SUBJECTIVE
        subjective = f"Chief Complaint: {intake.symptoms}\n"
        subjective += f"Duration: {intake.duration_days} day(s)\n"
        if hasattr(intake, 'temp_c') and intake.temp_c:
            subjective += f"Reported Temperature: {intake.temp_c}°C\n"
        
        # OBJECTIVE
        objective = f"Patient: {intake.age} year old {intake.sex}\n"
        if hasattr(intake, 'rr') and intake.rr:
            objective += f"Respiratory Rate: {intake.rr}/min\n"
        if hasattr(intake, 'temp_c') and intake.temp_c:
            objective += f"Temperature: {intake.temp_c}°C\n"
        objective += f"Triage Classification: {triage.risk_tier}\n"
        objective += f"AI Confidence: {triage.uncertainty}\n"
        
        # ASSESSMENT
        assessment = f"Clinical Assessment:\n"
        assessment += f"- {triage.reasoning}\n"
        if triage.danger_signs:
            assessment += f"\nDANGER SIGNS IDENTIFIED:\n"
            for sign in triage.danger_signs:
                assessment += f"- ⚠️ {sign}\n"
        
        # PLAN
        plan = "Recommended Actions:\n"
        for action in triage.recommended_actions:
            plan += f"- {action}\n"
        
        # Combine into SOAP format
        soap_note = f"""REFERRAL SUMMARY - {timestamp}
{'='*50}

SUBJECTIVE:
{subjective}

OBJECTIVE:
{objective}

ASSESSMENT:
{assessment}

PLAN:
{plan}

{'='*50}
Referring Facility: Community Health Post
Decision Support: FirstLine AI (MedGemma 1.5)
Note: This is a clinical decision support tool. Final decisions rest with qualified healthcare providers.
"""
        
        # Determine priority based on triage tier
        priority_map = {
            "RED": "URGENT - Immediate transfer required",
            "YELLOW": "Semi-urgent - Transfer within 24 hours",
            "GREEN": "Routine - Can be managed locally"
        }
        priority = priority_map.get(triage.risk_tier, "Routine")
        
        # Determine facility type
        facility_map = {
            "RED": "District Hospital Emergency Department",
            "YELLOW": "Health Center",
            "GREEN": "Community Health Post"
        }
        suggested_facility = facility_map.get(triage.risk_tier, "Health Center")
        
        # Extract key findings
        key_findings = []
        if triage.danger_signs:
            key_findings.extend(triage.danger_signs)
        key_findings.append(f"Triage: {triage.risk_tier}")
        key_findings.append(f"Duration: {intake.duration_days} days")
        
        return ReferralSummary(
            soap_note=soap_note,
            priority=priority,
            key_findings=key_findings,
            suggested_facility_type=suggested_facility
        )
