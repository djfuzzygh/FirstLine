#!/usr/bin/env python3
"""
Direct MedGemma Enhancement using the loaded model
Runs enhancement directly without API calls
"""

import json
import sys
import os
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from app.services.agent import TriageAgent
from tqdm import tqdm
import re

# Configuration
INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'
CHECKPOINT_FILE = Path(__file__).parent / 'enhancement_checkpoint.json'

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

def enhance_with_model(agent, condition):
    """Enhance condition using direct model access"""
    
    # Pass 1: Enhance symptoms and reasoning
    prompt1 = f"""<start_of_turn>user
You are a medical expert. Enhance the clinical knowledge for: {condition['diagnosis']}

Current Information:
- Symptoms: {', '.join(condition.get('symptoms', [])[:5])}
- Reasoning: {condition.get('reasoning', 'Not provided')}

Provide:
1. EXPANDED SYMPTOMS (8-12 items, include medical synonyms and red flags)
2. ENHANCED CLINICAL REASONING (3-4 sentences explaining pathophysiology, urgency, and diagnostic considerations)

Format as:
SYMPTOMS: ["symptom1", "symptom2", ...]
REASONING: [your enhanced reasoning text]
<end_of_turn>
<start_of_turn>model
"""
    
    response1 = agent._call_model(prompt1)
    
    # Parse symptoms
    symptoms = condition.get('symptoms', [])
    reasoning = condition.get('reasoning', '')
    
    symptoms_match = re.search(r'SYMPTOMS:\s*(\[[\s\S]*?\])', response1)
    if symptoms_match:
        try:
            symptoms = json.loads(symptoms_match.group(1))
        except:
            # Fallback parsing
            pass
    
    reasoning_match = re.search(r'REASONING:\s*([\s\S]*?)(?:\n\n|$)', response1)
    if reasoning_match:
        reasoning = reasoning_match.group(1).strip()
    
    # Pass 2: Enhance treatment
    prompt2 = f"""<start_of_turn>user
Provide evidence-based treatment for: {condition['diagnosis']} ({condition['tier']} tier)

Current treatments: {', '.join(condition.get('treatment', [])[:3])}

Provide prioritized treatment plan (6-8 steps):
1. Emergency actions (if RED tier)
2. First-line treatments
3. Self-care measures
4. When to seek help

Return as JSON array: ["step 1", "step 2", ...]
<end_of_turn>
<start_of_turn>model
"""
    
    response2 = agent._call_model(prompt2)
    
    # Parse treatment
    treatment = condition.get('treatment', [])
    treatment_match = re.search(r'\[[\s\S]*?\]', response2)
    if treatment_match:
        try:
            treatment = json.loads(treatment_match.group(0))
        except:
            # Fallback: split by newlines
            lines = response2.strip().split('\n')
            treatment = [line.strip() for line in lines if line.strip() and not line.startswith('#')][:8]
    
    return symptoms, reasoning, treatment

def process_all_conditions(kb, agent):
    """Process all conditions through MedGemma"""
    
    print("🧠 Starting Direct MedGemma Enhancement...")
    print(f"📊 Processing {len(kb)} conditions with 2 passes each\n")
    
    # Load checkpoint
    checkpoint = load_checkpoint()
    enhanced_kb = {}
    
    # Process conditions
    for key, condition in tqdm(kb.items(), desc="Enhancing conditions"):
        # Check if already processed
        if key in checkpoint:
            enhanced_kb[key] = checkpoint[key]
            continue
        
        try:
            symptoms, reasoning, treatment = enhance_with_model(agent, condition)
            
            enhanced = condition.copy()
            enhanced['symptoms'] = symptoms
            enhanced['reasoning'] = reasoning
            enhanced['treatment'] = treatment
            enhanced['enhanced_by'] = 'MedGemma-Direct'
            enhanced['enhanced_date'] = '2026-01-16'
            
            enhanced_kb[key] = enhanced
            checkpoint[key] = enhanced
            
            # Save checkpoint every 10 conditions
            if len(checkpoint) % 10 == 0:
                save_checkpoint(checkpoint)
                
        except Exception as e:
            print(f"\n❌ Error enhancing {key}: {e}")
            enhanced_kb[key] = condition
    
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

def main():
    """Main enhancement pipeline"""
    
    print("🚀 Direct MedGemma Knowledge Base Enhancement")
    print("="*60 + "\n")
    
    # Check mode
    mode = os.getenv("FIRSTLINE_MODE", "mock")
    print(f"📋 Backend mode: {mode}")
    
    if mode == "mock":
        print("\n⚠️  WARNING: Backend is in MOCK mode!")
        print("Set FIRSTLINE_MODE=actual to use real MedGemma model")
        print("\nTo enable:")
        print("  export FIRSTLINE_MODE=actual")
        print("  python3 enhance_direct.py")
        return
    
    # Initialize agent with MedGemma model
    print("\n🔄 Loading MedGemma model...")
    agent = TriageAgent(mode="actual")
    
    # Load knowledge base
    original_kb = load_knowledge_base()
    
    # Process all conditions
    enhanced_kb = process_all_conditions(original_kb, agent)
    
    # Save results
    save_enhanced_kb(enhanced_kb)
    
    print("\n🎉 Enhancement complete!")
    print(f"\n📁 Output: {OUTPUT_FILE}")
    print(f"📁 Checkpoint: {CHECKPOINT_FILE}")

if __name__ == '__main__':
    main()
