#!/usr/bin/env python3
"""
Parse MedGemma output from the provided Kaggle log
Extract SYMPTOMS, REASONING, TREATMENT from the verbose responses
"""

import re
import json
from pathlib import Path

INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'
KAGGLE_LOG_FILE = Path(__file__).parent / 'kaggle_output.txt'

def load_original_kb():
    with open(INPUT_FILE, 'r') as f:
        content = f.read()
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
    return json.loads(match.group(1))

# Sample data from the Kaggle log you provided
SAMPLE_RESPONSES = {
    "Anxiety disorders in children and young people": {
        "symptoms": [
            "Difficulty concentrating or paying attention",
            "Sleep disturbances (insomnia, nightmares, restless sleep)",
            "Changes in appetite or weight (loss or gain)",
            "Increased irritability or anger outbursts",
            "Persistent worry or excessive fear",
            "Physical symptoms like stomach aches, headaches, or fatigue",
            "Avoidance of social situations or school",
            "Feeling restless or unable to sit still",
            "Trembling or shaking",
            "Feeling dizzy or lightheaded",
            "Difficulty breathing or shortness of breath",
            "Panic attacks (sudden episodes of intense fear)"
        ],
        "reasoning": "Anxiety disorders in children and young people involve excessive fear, worry, and related behavioral disturbances that interfere with daily functioning. Pathophysiology often involves dysregulation in the amygdala (fear center), hippocampus (memory), and prefrontal cortex (executive function), leading to heightened sensitivity to perceived threats and difficulty regulating emotional responses. Symptoms like concentration problems, sleep issues, appetite changes, irritability, and physical complaints arise from the chronic activation of the body's stress response system (fight-or-flight), leading to physiological arousal and cognitive difficulties.",
        "treatment": [
            "Seek immediate emergency care if the child/young person expresses suicidal thoughts, makes a suicide plan, or engages in self-harming behaviors",
            "Cognitive Behavioral Therapy (CBT) and Parent-Child Interaction Therapy (PCIT) are evidence-based first-line treatments",
            "Selective Serotonin Reuptake Inhibitors (SSRIs) may be considered for moderate to severe cases",
            "Encourage regular physical activity, promote healthy sleep routines, establish consistent meal times",
            "Teach relaxation techniques (deep breathing, mindfulness)",
            "Foster open communication about feelings",
            "Consult a pediatrician, child psychiatrist, or mental health professional if symptoms persist for more than a month"
        ]
    }
}

def main():
    print("🧹 Cleaning MedGemma output data...")
    print("="*60)
    
    # Load original KB
    original_kb = load_original_kb()
    print(f"\n📖 Loaded {len(original_kb)} original conditions")
    
    # For now, use the sample data
    # In production, this would parse the full Kaggle log
    enhanced_kb = original_kb.copy()
    
    # Match sample responses to KB
    for condition_name, data in SAMPLE_RESPONSES.items():
        for key, original in original_kb.items():
            if condition_name.lower() in original['diagnosis'].lower():
                enhanced_kb[key] = {
                    **original,
                    'symptoms': data['symptoms'],
                    'reasoning': data['reasoning'],
                    'treatment': data['treatment'],
                    'enhanced_by': 'MedGemma-Cleaned',
                    'enhanced_date': '2026-01-16'
                }
                print(f"✅ Enhanced: {original['diagnosis']}")
                break
    
    # Save
    with open(OUTPUT_FILE, 'w') as f:
        f.write("// MedGemma-Enhanced Clinical Knowledge Base\n")
        f.write("// Cleaned from Kaggle GPU output\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(enhanced_kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    
    print(f"\n✅ Saved to: {OUTPUT_FILE}")
    print(f"\n📊 Note: This is a sample with 1 condition enhanced.")
    print(f"   To enhance all 424, we need the full Kaggle log output.")

if __name__ == '__main__':
    main()
