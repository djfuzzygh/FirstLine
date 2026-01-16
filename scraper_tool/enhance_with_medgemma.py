#!/usr/bin/env python3
"""
MedGemma Knowledge Base Enhancement Pipeline
Enhances clinical knowledge with MedGemma AI in 2 passes
"""

import requests
import json
import time
import re
import os
from pathlib import Path
from tqdm import tqdm

# Configuration
# Set MEDGEMMA_API environment variable to your Kaggle endpoint
# Example: export MEDGEMMA_API="https://your-kaggle-notebook.kaggle.net"
MEDGEMMA_API = os.getenv('MEDGEMMA_API', 'http://localhost:8000')
print(f"🔗 Using MedGemma API: {MEDGEMMA_API}\n")

INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'
EMBEDDINGS_FILE = Path(__file__).parent.parent / 'web_app' / 'data' / 'medical_embeddings.json'
CHECKPOINT_FILE = Path(__file__).parent / 'enhancement_checkpoint.json'

# Rate limiting
DELAY_BETWEEN_CALLS = 0.5  # seconds

def load_knowledge_base():
    """Load cleaned knowledge base"""
    print("📖 Loading knowledge base...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract JSON from JS file
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
    if not match:
        raise ValueError("Could not parse knowledge base file")
    
    kb = json.loads(match.group(1))
    print(f"✅ Loaded {len(kb)} conditions\n")
    return kb

def load_checkpoint():
    """Load processing checkpoint"""
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_checkpoint(checkpoint):
    """Save processing checkpoint"""
    with open(CHECKPOINT_FILE, 'w') as f:
        json.dump(checkpoint, f, indent=2)

def call_medgemma(prompt, max_retries=3):
    """Call MedGemma via the backend agent with retry logic"""
    for attempt in range(max_retries):
        try:
            # Create a mock intake request that will trigger the model
            response = requests.post(
                f"{MEDGEMMA_API}/triage",
                json={
                    "intake": {
                        "age": 30,
                        "sex": "M",
                        "symptoms": prompt,  # Use prompt as symptoms
                        "duration_days": 1,
                        "has_consent": True,
                        "image_description": None,
                        "temp_c": None,
                        "rr": None,
                        "pregnancy_status": False
                    },
                    "followup_responses": {}
                },
                timeout=60  # Longer timeout for model inference
            )
            
            if response.status_code == 200:
                data = response.json()
                # Extract reasoning which contains the model's response
                return data.get('reasoning', '')
            else:
                print(f"⚠️  API returned status {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"⚠️  API call failed (attempt {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
    
    return None

def parse_json_from_response(response_text):
    """Extract JSON array from MedGemma response"""
    try:
        # Try to find JSON array in response
        match = re.search(r'\[[\s\S]*\]', response_text)
        if match:
            return json.loads(match.group(0))
        
        # Fallback: split by newlines and clean
        lines = response_text.strip().split('\n')
        items = []
        for line in lines:
            line = line.strip()
            if line and not line.startswith('#') and not line.startswith('//'):
                # Remove bullet points and numbering
                line = re.sub(r'^[\d\.\-\*\•]\s*', '', line)
                if line:
                    items.append(line)
        return items[:10]  # Limit to 10 items
        
    except Exception as e:
        print(f"⚠️  Could not parse JSON: {e}")
        return []

def enhance_pass1_symptoms_reasoning(condition):
    """
    Pass 1: Enhance symptoms and clinical reasoning
    """
    prompt = f"""You are a medical expert. Enhance the clinical knowledge for: {condition['diagnosis']}

Current Information:
- Symptoms: {', '.join(condition.get('symptoms', [])[:5])}
- Reasoning: {condition.get('reasoning', 'Not provided')}

Please provide:

1. EXPANDED SYMPTOMS (include medical synonyms and red flags):
[Return as JSON array of strings]

2. ENHANCED CLINICAL REASONING (3-4 sentences):
- Explain pathophysiology
- Why these symptoms occur
- Key diagnostic considerations
- Urgency assessment

Format your response as:
SYMPTOMS: [json array]
REASONING: [text]
"""
    
    response = call_medgemma(prompt)
    if not response:
        return condition.get('symptoms', []), condition.get('reasoning', '')
    
    # Parse response
    symptoms = condition.get('symptoms', [])
    reasoning = condition.get('reasoning', '')
    
    # Extract symptoms
    symptoms_match = re.search(r'SYMPTOMS:\s*(\[[\s\S]*?\])', response)
    if symptoms_match:
        try:
            symptoms = json.loads(symptoms_match.group(1))
        except:
            symptoms = parse_json_from_response(symptoms_match.group(1))
    
    # Extract reasoning
    reasoning_match = re.search(r'REASONING:\s*([\s\S]*?)(?:\n\n|$)', response)
    if reasoning_match:
        reasoning = reasoning_match.group(1).strip()
    
    return symptoms, reasoning

def enhance_pass2_treatment(condition):
    """
    Pass 2: Improve treatment recommendations
    """
    prompt = f"""You are a medical expert. Provide evidence-based treatment for: {condition['diagnosis']}

Current treatments: {', '.join(condition.get('treatment', [])[:3])}

Provide a prioritized treatment plan:
1. Emergency actions (if {condition['tier']} tier)
2. First-line treatments
3. Self-care measures
4. When to seek medical help

Return as JSON array of treatment steps (max 8 items).
Format: ["action 1", "action 2", ...]
"""
    
    response = call_medgemma(prompt)
    if not response:
        return condition.get('treatment', [])
    
    # Parse treatment array
    treatment = parse_json_from_response(response)
    
    # Fallback to original if parsing failed
    if not treatment:
        treatment = condition.get('treatment', [])
    
    return treatment

def enhance_condition(key, condition, checkpoint):
    """Enhance a single condition with MedGemma (2 passes)"""
    
    # Check if already processed
    if key in checkpoint:
        return checkpoint[key]
    
    enhanced = condition.copy()
    
    try:
        # Pass 1: Symptoms + Reasoning
        print(f"\n🔄 Pass 1: Enhancing symptoms & reasoning for {condition['diagnosis']}...")
        symptoms, reasoning = enhance_pass1_symptoms_reasoning(condition)
        enhanced['symptoms'] = symptoms
        enhanced['reasoning'] = reasoning
        print(f"✅ Pass 1 complete for {condition['diagnosis']}")
        
        time.sleep(DELAY_BETWEEN_CALLS)
        
        # Pass 2: Treatment
        print(f"🔄 Pass 2: Enhancing treatment for {condition['diagnosis']}...")
        treatment = enhance_pass2_treatment(condition)
        enhanced['treatment'] = treatment
        print(f"✅ Pass 2 complete for {condition['diagnosis']}\n")
        
        time.sleep(DELAY_BETWEEN_CALLS)
        
        # Mark as enhanced
        enhanced['enhanced_by'] = 'MedGemma'
        enhanced['enhanced_date'] = '2026-01-16'
        
        return enhanced
        
    except Exception as e:
        print(f"❌ Error enhancing {key}: {e}")
        return condition

def process_all_conditions(kb):
    """Process all conditions through MedGemma"""
    
    print("🧠 Starting MedGemma Enhancement Pipeline...")
    print(f"📊 Processing {len(kb)} conditions with 2 passes each")
    print(f"⏱️  Estimated time: {len(kb) * 2 * (DELAY_BETWEEN_CALLS + 2)} seconds (~{len(kb) * 2 * (DELAY_BETWEEN_CALLS + 2) / 60:.1f} minutes)\n")
    
    # Load checkpoint
    checkpoint = load_checkpoint()
    enhanced_kb = {}
    
    # Process conditions
    for key, condition in tqdm(kb.items(), desc="Enhancing conditions"):
        enhanced = enhance_condition(key, condition, checkpoint)
        enhanced_kb[key] = enhanced
        
        # Save checkpoint every 10 conditions
        checkpoint[key] = enhanced
        if len(checkpoint) % 10 == 0:
            save_checkpoint(checkpoint)
    
    # Final checkpoint save
    save_checkpoint(checkpoint)
    
    return enhanced_kb

def save_enhanced_kb(enhanced_kb):
    """Save enhanced knowledge base"""
    print("\n💾 Saving enhanced knowledge base...")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("// MedGemma-Enhanced Clinical Knowledge Base\n")
        f.write("// Enhanced with AI-powered medical reasoning\n")
        f.write("// Last updated: 2026-01-16\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(enhanced_kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    
    print(f"✅ Saved to: {OUTPUT_FILE}")

def generate_statistics(original_kb, enhanced_kb):
    """Generate enhancement statistics"""
    print("\n" + "="*60)
    print("📊 ENHANCEMENT STATISTICS")
    print("="*60)
    
    total_conditions = len(enhanced_kb)
    enhanced_count = sum(1 for c in enhanced_kb.values() if c.get('enhanced_by') == 'MedGemma')
    
    # Calculate average improvements
    avg_symptoms_before = sum(len(c.get('symptoms', [])) for c in original_kb.values()) / total_conditions
    avg_symptoms_after = sum(len(c.get('symptoms', [])) for c in enhanced_kb.values()) / total_conditions
    
    avg_treatment_before = sum(len(c.get('treatment', [])) for c in original_kb.values()) / total_conditions
    avg_treatment_after = sum(len(c.get('treatment', [])) for c in enhanced_kb.values()) / total_conditions
    
    print(f"\n✅ Successfully enhanced: {enhanced_count}/{total_conditions} conditions")
    print(f"\n📈 Improvements:")
    print(f"   Symptoms per condition: {avg_symptoms_before:.1f} → {avg_symptoms_after:.1f} (+{avg_symptoms_after - avg_symptoms_before:.1f})")
    print(f"   Treatments per condition: {avg_treatment_before:.1f} → {avg_treatment_after:.1f} (+{avg_treatment_after - avg_treatment_before:.1f})")
    
    # Sample enhanced condition
    sample_key = list(enhanced_kb.keys())[0]
    sample = enhanced_kb[sample_key]
    
    print(f"\n📝 Sample Enhanced Condition: {sample['diagnosis']}")
    print(f"   Tier: {sample['tier']}")
    print(f"   Symptoms ({len(sample.get('symptoms', []))}): {', '.join(sample.get('symptoms', [])[:3])}...")
    print(f"   Reasoning: {sample.get('reasoning', '')[:100]}...")
    print(f"   Treatments ({len(sample.get('treatment', []))}): {sample.get('treatment', [])[:2]}")
    
    print("\n" + "="*60)

def main():
    """Main enhancement pipeline"""
    
    print("🚀 MedGemma Knowledge Base Enhancement")
    print("="*60 + "\n")
    
    # Test API connection
    print("🔌 Testing MedGemma API connection...")
    try:
        # Try root endpoint first (Kaggle might not have /health)
        response = requests.get(MEDGEMMA_API, timeout=5)
        print(f"✅ MedGemma API is reachable (status: {response.status_code})\n")
    except requests.exceptions.RequestException as e:
        print(f"⚠️  Warning: Could not verify API connection: {e}")
        print("Proceeding anyway - will fail on first API call if unreachable\n")
    
    # Load knowledge base
    original_kb = load_knowledge_base()
    
    # Process all conditions
    enhanced_kb = process_all_conditions(original_kb)
    
    # Save results
    save_enhanced_kb(enhanced_kb)
    
    # Generate statistics
    generate_statistics(original_kb, enhanced_kb)
    
    print("\n🎉 Enhancement complete!")
    print(f"\n📁 Output files:")
    print(f"   - Enhanced KB: {OUTPUT_FILE}")
    print(f"   - Checkpoint: {CHECKPOINT_FILE}")
    
    print("\n🚀 Next steps:")
    print("   1. Review the enhanced knowledge base")
    print("   2. Update reasoning_engine/index.js to use new file")
    print("   3. Test with: node test_reasoning_engine.js")
    print("   4. Deploy to production")

if __name__ == '__main__':
    main()
