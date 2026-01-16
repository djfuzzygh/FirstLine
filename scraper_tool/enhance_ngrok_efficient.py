#!/usr/bin/env python3
"""
Efficient MedGemma Enhancement via ngrok + Kaggle
Single-pass method using /enhance endpoint
"""

import json
import re
import os
import requests
import time
from pathlib import Path
from tqdm import tqdm

# Configuration
MEDGEMMA_API = os.getenv('MEDGEMMA_API', 'https://heliolatrous-unstooping-rosy.ngrok-free.dev')
INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'
CHECKPOINT_FILE = Path(__file__).parent / 'enhancement_checkpoint.json'
DELAY = 0.3  # Reduced delay for efficiency

print(f"🔗 Using API: {MEDGEMMA_API}\n")

def load_knowledge_base():
    print("📖 Loading knowledge base...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
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

def enhance_via_api(condition):
    """Call /enhance endpoint with single request"""
    try:
        response = requests.post(
            f"{MEDGEMMA_API}/enhance",
            json={
                "diagnosis": condition['diagnosis'],
                "tier": condition['tier'],
                "symptoms": condition.get('symptoms', []),
                "reasoning": condition.get('reasoning', ''),
                "treatment": condition.get('treatment', [])
            },
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            return data['symptoms'], data['reasoning'], data['treatment']
        else:
            print(f"⚠️  API error {response.status_code}")
            return None, None, None
            
    except Exception as e:
        print(f"⚠️  Request failed: {e}")
        return None, None, None

def process_all_conditions(kb):
    print("🧠 Starting Efficient Enhancement via Kaggle...")
    print(f"📊 Processing {len(kb)} conditions")
    print(f"⏱️  Estimated time: ~{len(kb) * 3 / 60:.1f} minutes\n")
    
    checkpoint = load_checkpoint()
    enhanced_kb = {}
    
    for key, condition in tqdm(kb.items(), desc="Enhancing"):
        if key in checkpoint:
            enhanced_kb[key] = checkpoint[key]
            continue
        
        symptoms, reasoning, treatment = enhance_via_api(condition)
        
        if symptoms:
            enhanced = condition.copy()
            enhanced['symptoms'] = symptoms
            enhanced['reasoning'] = reasoning
            enhanced['treatment'] = treatment
            enhanced['enhanced_by'] = 'MedGemma-Kaggle'
            enhanced['enhanced_date'] = '2026-01-16'
            enhanced_kb[key] = enhanced
            checkpoint[key] = enhanced
        else:
            enhanced_kb[key] = condition
        
        time.sleep(DELAY)
        
        if len(checkpoint) % 10 == 0:
            save_checkpoint(checkpoint)
            print(f"\n💾 Checkpoint: {len(checkpoint)}/424")
    
    save_checkpoint(checkpoint)
    return enhanced_kb

def save_enhanced_kb(enhanced_kb):
    print("\n💾 Saving...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("// MedGemma-Enhanced via Kaggle\n")
        f.write("// Last updated: 2026-01-16\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(enhanced_kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print(f"✅ Saved to: {OUTPUT_FILE}")

def main():
    print("🚀 Efficient Enhancement via ngrok + Kaggle")
    print("="*60 + "\n")
    
    # Test connection
    try:
        r = requests.get(MEDGEMMA_API, timeout=5)
        print(f"✅ Connected to Kaggle backend\n")
    except:
        print("❌ Cannot connect to backend")
        print("Make sure your Kaggle notebook is running!")
        return
    
    kb = load_knowledge_base()
    enhanced_kb = process_all_conditions(kb)
    save_enhanced_kb(enhanced_kb)
    
    enhanced_count = sum(1 for c in enhanced_kb.values() if c.get('enhanced_by') == 'MedGemma-Kaggle')
    print(f"\n✅ Enhanced {enhanced_count}/{len(enhanced_kb)} conditions")
    print("🎉 Done!")

if __name__ == '__main__':
    main()
