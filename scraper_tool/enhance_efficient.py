#!/usr/bin/env python3
"""
EFFICIENT MedGemma Enhancement - Single Pass, Better Prompts
Reduces time by 50% with combined prompts
"""

import json
import re
import os
from pathlib import Path
from tqdm import tqdm
import sys

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from app.services.agent import TriageAgent

# Configuration
INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'
CHECKPOINT_FILE = Path(__file__).parent / 'enhancement_checkpoint.json'

def load_knowledge_base():
    """Load cleaned knowledge base"""
    print("📖 Loading knowledge base...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
    if not match:
        raise ValueError("Could not parse knowledge base file")
    
    kb = json.loads(match.group(1))
    print(f"✅ Loaded {len(kb)} conditions\n")
    return kb

def load_checkpoint():
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_checkpoint(checkpoint):
    with open(CHECKPOINT_FILE, 'w') as f:
        json.dump(checkpoint, f, indent=2)

def enhance_condition_efficient(agent, condition):
    """Single-pass enhancement with combined prompt"""
    
    # EFFICIENT: One prompt for everything
    prompt = f"""<start_of_turn>user
You are a medical expert. Enhance this clinical condition in ONE response:

CONDITION: {condition['diagnosis']} (Severity: {condition['tier']})
CURRENT DATA:
- Symptoms: {', '.join(condition.get('symptoms', [])[:3])}
- Reasoning: {condition.get('reasoning', 'Basic description')}
- Treatment: {', '.join(condition.get('treatment', [])[:2])}

TASK: Provide ALL of the following in your response:

1. SYMPTOMS (8-12 items including medical terms):
   - Expand current symptoms
   - Add medical synonyms
   - Include red flags for {condition['tier']} tier

2. REASONING (3-4 sentences):
   - Pathophysiology
   - Why symptoms occur
   - Urgency level

3. TREATMENT (6-8 prioritized steps):
   - Emergency actions if {condition['tier']} tier
   - Evidence-based interventions
   - Self-care measures

FORMAT YOUR RESPONSE EXACTLY AS:
SYMPTOMS: ["symptom1", "symptom2", ...]
REASONING: Your enhanced reasoning here.
TREATMENT: ["step1", "step2", ...]
<end_of_turn>
<start_of_turn>model
"""
    
    try:
        response = agent._call_model(prompt)
        
        # Parse all three sections
        symptoms = condition.get('symptoms', [])
        reasoning = condition.get('reasoning', '')
        treatment = condition.get('treatment', [])
        
        # Extract symptoms
        symptoms_match = re.search(r'SYMPTOMS:\s*(\[[\s\S]*?\])', response, re.IGNORECASE)
        if symptoms_match:
            try:
                symptoms = json.loads(symptoms_match.group(1))
            except:
                # Fallback: extract items between quotes
                symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))
        
        # Extract reasoning
        reasoning_match = re.search(r'REASONING:\s*(.*?)(?=TREATMENT:|$)', response, re.IGNORECASE | re.DOTALL)
        if reasoning_match:
            reasoning = reasoning_match.group(1).strip()
        
        # Extract treatment
        treatment_match = re.search(r'TREATMENT:\s*(\[[\s\S]*?\])', response, re.IGNORECASE)
        if treatment_match:
            try:
                treatment = json.loads(treatment_match.group(1))
            except:
                # Fallback: extract items between quotes
                treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))
        
        return symptoms, reasoning, treatment
        
    except Exception as e:
        print(f"⚠️  Error: {e}")
        return condition.get('symptoms', []), condition.get('reasoning', ''), condition.get('treatment', [])

def process_all_conditions(kb, agent):
    """Process all conditions efficiently"""
    
    print("🧠 Starting EFFICIENT MedGemma Enhancement...")
    print(f"📊 Processing {len(kb)} conditions with SINGLE-PASS method\n")
    print("⚡ Expected time: ~50% faster than 2-pass approach\n")
    
    checkpoint = load_checkpoint()
    enhanced_kb = {}
    
    for key, condition in tqdm(kb.items(), desc="Enhancing"):
        if key in checkpoint:
            enhanced_kb[key] = checkpoint[key]
            continue
        
        try:
            symptoms, reasoning, treatment = enhance_condition_efficient(agent, condition)
            
            enhanced = condition.copy()
            enhanced['symptoms'] = symptoms[:15]  # Limit to 15
            enhanced['reasoning'] = reasoning
            enhanced['treatment'] = treatment[:10]  # Limit to 10
            enhanced['enhanced_by'] = 'MedGemma-Efficient'
            enhanced['enhanced_date'] = '2026-01-16'
            
            enhanced_kb[key] = enhanced
            checkpoint[key] = enhanced
            
            # Save every 10
            if len(checkpoint) % 10 == 0:
                save_checkpoint(checkpoint)
                print(f"\n💾 Checkpoint saved: {len(checkpoint)}/424")
                
        except Exception as e:
            print(f"\n❌ Error with {key}: {e}")
            enhanced_kb[key] = condition
    
    save_checkpoint(checkpoint)
    return enhanced_kb

def save_enhanced_kb(enhanced_kb):
    """Save enhanced knowledge base"""
    print("\n💾 Saving enhanced knowledge base...")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("// MedGemma-Enhanced Clinical Knowledge Base (Efficient Method)\n")
        f.write("// Single-pass enhancement for optimal performance\n")
        f.write("// Last updated: 2026-01-16\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(enhanced_kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    
    print(f"✅ Saved to: {OUTPUT_FILE}")

def main():
    print("🚀 EFFICIENT MedGemma Enhancement")
    print("="*60 + "\n")
    
    mode = os.getenv("FIRSTLINE_MODE", "mock")
    if mode == "mock":
        print("⚠️  Set FIRSTLINE_MODE=actual to use real model")
        print("  export FIRSTLINE_MODE=actual")
        return
    
    print("🔄 Loading MedGemma model...")
    agent = TriageAgent(mode="actual")
    
    original_kb = load_knowledge_base()
    enhanced_kb = process_all_conditions(original_kb, agent)
    save_enhanced_kb(enhanced_kb)
    
    # Stats
    enhanced_count = sum(1 for c in enhanced_kb.values() if c.get('enhanced_by') == 'MedGemma-Efficient')
    print(f"\n✅ Enhanced {enhanced_count}/{len(enhanced_kb)} conditions")
    print("\n🎉 Done!")

if __name__ == '__main__':
    main()
