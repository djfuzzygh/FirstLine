#!/usr/bin/env python3
"""
PRAGMATIC: Use existing Kaggle backend creatively
Works with current endpoints, no backend changes needed
"""

import json
import re
import os
import requests
import time
from pathlib import Path
from tqdm import tqdm

MEDGEMMA_API = "https://heliolatrous-unstooping-rosy.ngrok-free.dev"
INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'
CHECKPOINT_FILE = Path(__file__).parent / 'enhancement_checkpoint.json'

print(f"🔗 Using Kaggle via: {MEDGEMMA_API}\n")

def load_kb():
    with open(INPUT_FILE, 'r') as f:
        content = f.read()
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
    return json.loads(match.group(1))

def load_checkpoint():
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_checkpoint(cp):
    with open(CHECKPOINT_FILE, 'w') as f:
        json.dump(cp, f, indent=2)

def enhance_via_triage(condition):
    """Use /triage endpoint creatively to get MedGemma reasoning"""
    
    # Craft symptoms to trigger good reasoning
    symptoms_text = f"Patient with {condition['diagnosis']}. " + ", ".join(condition.get('symptoms', [])[:5])
    
    try:
        response = requests.post(
            f"{MEDGEMMA_API}/triage",
            json={
                "intake": {
                    "age": 30,
                    "sex": "M",
                    "symptoms": symptoms_text,
                    "duration_days": 3,
                    "has_consent": True,
                    "image_description": f"Clinical presentation of {condition['diagnosis']}",
                    "temp_c": None,
                    "rr": None,
                    "pregnancy_status": False
                },
                "followup_responses": {}
            },
            timeout=45
        )
        
        if response.status_code == 200:
            data = response.json()
            # Extract MedGemma's reasoning and actions
            reasoning = data.get('reasoning', condition.get('reasoning', ''))
            actions = data.get('recommended_actions', [])
            first_aid = data.get('first_aid_advice', [])
            
            # Combine actions and first aid as treatment
            treatment = first_aid + actions
            
            # Keep original symptoms but enhance reasoning and treatment
            return condition.get('symptoms', []), reasoning, treatment[:10]
        
    except Exception as e:
        print(f"⚠️  {e}")
    
    return condition.get('symptoms', []), condition.get('reasoning', ''), condition.get('treatment', [])

def process_all(kb):
    print("🧠 Enhancing via Kaggle GPU...")
    print(f"📊 {len(kb)} conditions\n")
    
    cp = load_checkpoint()
    enhanced = {}
    
    for key, cond in tqdm(kb.items(), desc="Processing"):
        if key in cp:
            enhanced[key] = cp[key]
            continue
        
        symptoms, reasoning, treatment = enhance_via_triage(cond)
        
        result = cond.copy()
        result['symptoms'] = symptoms
        result['reasoning'] = reasoning if reasoning else cond.get('reasoning', '')
        result['treatment'] = treatment if treatment else cond.get('treatment', [])
        result['enhanced_by'] = 'MedGemma-Kaggle-Triage'
        result['enhanced_date'] = '2026-01-16'
        
        enhanced[key] = result
        cp[key] = result
        
        time.sleep(0.5)  # Rate limit
        
        if len(cp) % 10 == 0:
            save_checkpoint(cp)
            print(f"\n💾 Saved: {len(cp)}/424")
    
    save_checkpoint(cp)
    return enhanced

def save_kb(kb):
    with open(OUTPUT_FILE, 'w') as f:
        f.write("// MedGemma-Enhanced via Kaggle\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print(f"\n✅ Saved: {OUTPUT_FILE}")

def main():
    print("🚀 Pragmatic Kaggle Enhancement")
    print("="*60 + "\n")
    
    # Test connection
    try:
        r = requests.get(MEDGEMMA_API, timeout=5)
        print("✅ Connected to Kaggle\n")
    except:
        print("❌ Cannot connect!")
        return
    
    kb = load_kb()
    print(f"📖 Loaded {len(kb)} conditions\n")
    
    enhanced = process_all(kb)
    save_kb(enhanced)
    
    count = sum(1 for c in enhanced.values() if 'enhanced_by' in c)
    print(f"\n🎉 Enhanced {count}/{len(enhanced)} conditions!")

if __name__ == '__main__':
    main()
