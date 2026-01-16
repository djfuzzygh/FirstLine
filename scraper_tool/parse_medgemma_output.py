#!/usr/bin/env python3
"""
Parse the raw MedGemma output from Kaggle logs
Extract actual SYMPTOMS, REASONING, and TREATMENT data
"""

import re
import json
from pathlib import Path

INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'

def load_original_kb():
    """Load the original cleaned knowledge base"""
    with open(INPUT_FILE, 'r') as f:
        content = f.read()
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
    return json.loads(match.group(1))

def parse_kaggle_log(log_text):
    """Parse the full Kaggle log and extract all responses"""
    
    # Split by RAW AI RESPONSE markers
    responses = re.split(r'🤖 RAW AI RESPONSE:', log_text)
    
    parsed_data = {}
    
    for response in responses[1:]:  # Skip first empty split
        # Extract condition name from the user prompt
        condition_match = re.search(r'Enhance.*?for:\s*([^\n]+)', response)
        if not condition_match:
            continue
        
        condition_name = condition_match.group(1).strip()
        
        # Try to extract SYMPTOMS
        symptoms_match = re.search(r'\*\*EXPANDED SYMPTOMS:\*\*\s*\[(.*?)\]', response, re.DOTALL)
        symptoms = []
        if symptoms_match:
            symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))
            symptoms = [s.strip() for s in symptoms if s.strip() and len(s) < 200][:12]
        
        # Try to extract REASONING
        reasoning_match = re.search(r'\*\*ENHANCED CLINICAL REASONING:\*\*\s*(.+?)(?=\*\*TREATMENT|--------|$)', response, re.DOTALL)
        reasoning = ""
        if reasoning_match:
            reasoning = reasoning_match.group(1).strip()
            reasoning = re.sub(r'\s+', ' ', reasoning)
            reasoning = reasoning[:800]
        
        # Try to extract TREATMENT
        treatment_match = re.search(r'\*\*TREATMENT RECOMMENDATIONS:\*\*\s*\[(.*?)\]', response, re.DOTALL)
        treatment = []
        if treatment_match:
            treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))
            treatment = [t.strip() for t in treatment if t.strip() and len(t) < 300][:10]
        
        if symptoms or reasoning or treatment:
            parsed_data[condition_name] = {
                'symptoms': symptoms,
                'reasoning': reasoning,
                'treatment': treatment
            }
    
    return parsed_data

def match_to_kb_keys(parsed_data, original_kb):
    """Match parsed condition names to KB keys"""
    
    enhanced_kb = original_kb.copy()
    matched_count = 0
    
    for condition_name, data in parsed_data.items():
        # Try to find matching key in original KB
        condition_lower = condition_name.lower().strip()
        
        # Try exact match first
        for key, original in original_kb.items():
            if original['diagnosis'].lower() == condition_lower:
                enhanced_kb[key] = {
                    **original,
                    'symptoms': data['symptoms'] if data['symptoms'] else original.get('symptoms', []),
                    'reasoning': data['reasoning'] if data['reasoning'] else original.get('reasoning', ''),
                    'treatment': data['treatment'] if data['treatment'] else original.get('treatment', []),
                    'enhanced_by': 'MedGemma-Parsed',
                    'enhanced_date': '2026-01-16'
                }
                matched_count += 1
                break
    
    return enhanced_kb, matched_count

def main():
    print("🧹 Parsing MedGemma Kaggle output...")
    print("="*60)
    
    # Load original KB
    original_kb = load_original_kb()
    print(f"\n📖 Loaded {len(original_kb)} original conditions")
    
    # Ask user to paste the Kaggle log
    print("\n📋 Please paste the full Kaggle log output")
    print("   (Everything from the notebook, including all RAW AI RESPONSE sections)")
    print("   Press Ctrl+D (Mac/Linux) or Ctrl+Z (Windows) when done:\n")
    
    try:
        log_text = input()
    except EOFError:
        log_text = ""
    
    if not log_text:
        print("\n❌ No input provided. Using cleaned data as-is.")
        return
    
    # Parse the log
    print("\n🔍 Parsing responses...")
    parsed_data = parse_kaggle_log(log_text)
    print(f"✅ Extracted {len(parsed_data)} condition responses")
    
    # Match to KB keys
    print("\n🔗 Matching to knowledge base...")
    enhanced_kb, matched = match_to_kb_keys(parsed_data, original_kb)
    print(f"✅ Matched {matched}/{len(parsed_data)} conditions")
    
    # Save
    with open(OUTPUT_FILE, 'w') as f:
        f.write("// MedGemma-Enhanced Clinical Knowledge Base\n")
        f.write("// Parsed from Kaggle GPU output\n")
        f.write(f"// Enhanced: {matched}/{len(original_kb)} conditions\n")
        f.write("// Last updated: 2026-01-16\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(enhanced_kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    
    print(f"\n✅ Saved to: {OUTPUT_FILE}")
    print(f"📊 Stats:")
    print(f"   Total conditions: {len(enhanced_kb)}")
    print(f"   Enhanced: {matched}")
    print(f"   Original: {len(enhanced_kb) - matched}")

if __name__ == '__main__':
    main()
