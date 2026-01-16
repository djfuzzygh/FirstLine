#!/usr/bin/env python3
"""
Clinical Knowledge Base Cleaner
Transforms raw NHS scraped data into structured, intelligent medical knowledge
"""

import json
import re
from collections import defaultdict
from pathlib import Path

# Danger sign keywords for tier classification
RED_KEYWORDS = [
    'meningitis', 'sepsis', 'stroke', 'heart attack', 'cardiac arrest',
    'anaphylaxis', 'severe bleeding', 'unconscious', 'seizure', 'coma',
    'difficulty breathing', 'chest pain', 'blue lips', 'severe dehydration',
    'diabetic ketoacidosis', 'ectopic pregnancy', 'appendicitis'
]

YELLOW_KEYWORDS = [
    'pneumonia', 'dehydration', 'chest infection', 'kidney infection',
    'high fever', 'cellulitis', 'deep vein thrombosis', 'angioedema',
    'middle ear infection', 'acute', 'severe', 'persistent vomiting'
]

# Common symptom synonyms for normalization
SYMPTOM_SYNONYMS = {
    'fever': ['high temperature', 'hot', 'burning up', 'pyrexia'],
    'vomiting': ['being sick', 'throwing up', 'nausea and vomiting'],
    'diarrhea': ['diarrhoea', 'loose stool', 'watery stool', 'runs'],
    'headache': ['head pain', 'migraine'],
    'cough': ['coughing', 'persistent cough'],
    'rash': ['skin rash', 'spots', 'red skin'],
    'pain': ['ache', 'discomfort', 'soreness'],
    'breathing difficulty': ['shortness of breath', 'breathlessness', 'wheezing'],
    'confusion': ['disorientation', 'confused'],
    'weakness': ['fatigue', 'tiredness', 'lethargy']
}

# Estimated prevalence (cases per 100,000 per year)
PREVALENCE_ESTIMATES = {
    'common_cold': 1000,
    'flu': 500,
    'gastroenteritis': 300,
    'urinary_tract_infection': 200,
    'pneumonia': 50,
    'meningitis': 5,
    'sepsis': 10,
    'stroke': 20,
    'heart_attack': 15,
}

def extract_json_from_js(js_content):
    """Extract JSON object from JavaScript file"""
    # Find the CLINICAL_KNOWLEDGE_BASE object
    match = re.search(r'CLINICAL_KNOWLEDGE_BASE\s*=\s*({[\s\S]*});', js_content)
    if match:
        json_str = match.group(1)
        
        # Fix JavaScript to JSON
        # 1. Quote unquoted keys
        json_str = re.sub(r'(\w+):', r'"\1":', json_str)
        # 2. Remove trailing commas
        json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)
        # 3. Fix already quoted keys (double quoting issue)
        json_str = re.sub(r'""(\w+)"":', r'"\1":', json_str)
        
        return json.loads(json_str)
    return {}

def classify_tier(condition):
    """Intelligently classify condition severity"""
    diagnosis_lower = condition['diagnosis'].lower()
    symptoms_text = ' '.join(condition.get('symptoms', [])).lower()
    treatment_text = ' '.join(condition.get('treatment', [])).lower()
    
    # Check for RED flags
    for keyword in RED_KEYWORDS:
        if keyword in diagnosis_lower or keyword in symptoms_text:
            return 'RED'
    
    # Check for YELLOW flags
    for keyword in YELLOW_KEYWORDS:
        if keyword in diagnosis_lower or keyword in symptoms_text:
            return 'YELLOW'
    
    # Check for urgent language in treatment
    if any(word in treatment_text for word in ['emergency', '999', 'urgent', 'immediately']):
        return 'RED'
    
    return 'GREEN'

def extract_real_symptoms(condition):
    """Extract and clean actual symptoms from all fields"""
    symptoms = set()
    
    # From symptoms array
    for symptom in condition.get('symptoms', []):
        if is_valid_symptom(symptom):
            symptoms.add(normalize_symptom(symptom))
    
    # From red_flags (these are critical symptoms)
    for flag in condition.get('red_flags', []):
        if is_valid_symptom(flag):
            symptoms.add(normalize_symptom(flag))
    
    # Extract from diagnosis name (e.g., "Fever in adults" -> "fever")
    diagnosis_symptoms = extract_symptoms_from_text(condition['diagnosis'])
    symptoms.update(diagnosis_symptoms)
    
    # Remove duplicates and sort by relevance
    cleaned = list(symptoms)[:20]  # Limit to top 20
    return cleaned

def is_valid_symptom(text):
    """Check if text is a valid symptom (not metadata)"""
    if not text or len(text) < 3:
        return False
    
    # Filter out metadata phrases
    skip_phrases = [
        'are pregnant', 'think you might', 'are breastfeeding',
        'have been', 'you have', 'call the', 'contact',
        'nhs inform', 'macmillan', 'about nhs', 'editorial'
    ]
    
    text_lower = text.lower()
    return not any(phrase in text_lower for phrase in skip_phrases)

def normalize_symptom(symptom):
    """Normalize symptom to canonical form"""
    symptom = symptom.lower().strip()
    
    # Remove common prefixes
    symptom = re.sub(r'^(a |an |the |feeling |being )', '', symptom)
    
    # Map to canonical form using synonyms
    for canonical, synonyms in SYMPTOM_SYNONYMS.items():
        if symptom in synonyms or any(syn in symptom for syn in synonyms):
            return canonical
    
    return symptom

def extract_symptoms_from_text(text):
    """Extract symptom keywords from text"""
    symptoms = set()
    text_lower = text.lower()
    
    # Common symptom patterns
    symptom_patterns = [
        r'\b(pain|ache|fever|cough|rash|bleeding|swelling|vomiting|diarrhea)\b',
        r'\b(headache|nausea|dizziness|fatigue|weakness)\b'
    ]
    
    for pattern in symptom_patterns:
        matches = re.findall(pattern, text_lower)
        symptoms.update(matches)
    
    return symptoms

def clean_treatment_array(treatments):
    """Extract actionable treatment steps"""
    cleaned = []
    
    for treatment in treatments:
        if not treatment or len(treatment) < 5:
            continue
        
        # Skip metadata
        if any(skip in treatment.lower() for skip in [
            'are pregnant', 'macmillan', 'nhs inform', 'call the'
        ]):
            continue
        
        # Clean up
        treatment = treatment.strip()
        if treatment and len(treatment) > 10:
            cleaned.append(treatment)
    
    return cleaned[:10]  # Limit to top 10 treatments

def generate_clinical_reasoning(condition):
    """Generate evidence-based clinical reasoning"""
    tier = condition['tier']
    diagnosis = condition['diagnosis']
    symptoms = condition.get('symptoms', [])
    
    reasoning_parts = []
    
    # Tier-specific reasoning
    if tier == 'RED':
        reasoning_parts.append(
            f"{diagnosis} is a medical emergency requiring immediate hospital treatment. "
            f"Delays can lead to serious complications including organ failure or death."
        )
    elif tier == 'YELLOW':
        reasoning_parts.append(
            f"{diagnosis} requires prompt medical evaluation as symptoms can worsen rapidly. "
            f"Early treatment significantly improves outcomes."
        )
    else:
        reasoning_parts.append(
            f"{diagnosis} can typically be managed with self-care measures. "
            f"However, seek medical advice if symptoms persist beyond 7 days or worsen."
        )
    
    # Add symptom context
    if len(symptoms) > 0:
        key_symptoms = symptoms[:3]
        reasoning_parts.append(
            f"Key diagnostic features include: {', '.join(key_symptoms)}."
        )
    
    return ' '.join(reasoning_parts)

def estimate_prevalence(diagnosis):
    """Estimate condition prevalence for Bayesian reasoning"""
    diagnosis_lower = diagnosis.lower()
    
    # Check exact matches
    for key, prevalence in PREVALENCE_ESTIMATES.items():
        if key in diagnosis_lower:
            return prevalence / 100000  # Convert to probability
    
    # Default estimates by tier
    if 'cancer' in diagnosis_lower:
        return 0.0001  # Rare
    elif any(word in diagnosis_lower for word in ['common', 'cold', 'flu']):
        return 0.01  # Very common
    else:
        return 0.001  # Moderate

def extract_age_groups(condition):
    """Determine applicable age groups"""
    diagnosis_lower = condition['diagnosis'].lower()
    symptoms_text = ' '.join(condition.get('symptoms', [])).lower()
    
    age_groups = []
    
    # Child-specific conditions
    if any(word in diagnosis_lower for word in ['child', 'baby', 'infant', 'pediatric']):
        age_groups.append('child')
    
    # Adult-specific conditions
    if any(word in diagnosis_lower for word in ['adult', 'elderly', 'menopause']):
        age_groups.append('adult')
    
    # If no specific age mentioned, assume all ages
    if not age_groups:
        age_groups = ['all']
    
    return age_groups

def clean_condition(key, condition):
    """Clean and enhance a single condition entry"""
    
    # Re-classify tier
    tier = classify_tier(condition)
    
    # Extract real symptoms
    symptoms = extract_real_symptoms(condition)
    
    # Clean treatments
    treatments = clean_treatment_array(condition.get('treatment', []))
    
    # Generate reasoning
    reasoning = generate_clinical_reasoning({
        'diagnosis': condition['diagnosis'],
        'tier': tier,
        'symptoms': symptoms
    })
    
    # Add metadata
    prevalence = estimate_prevalence(condition['diagnosis'])
    age_groups = extract_age_groups(condition)
    
    return {
        'id': key,
        'diagnosis': condition['diagnosis'],
        'tier': tier,
        'symptoms': symptoms,
        'reasoning': reasoning,
        'treatment': treatments,
        'prevalence': prevalence,
        'age_groups': age_groups,
        'source': 'NHS Inform',
        'last_updated': '2026-01-16'
    }

def main():
    """Main cleaning pipeline"""
    print("🧹 Starting Clinical Knowledge Base Cleaning...")
    
    # Read raw data
    input_file = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge.js'
    with open(input_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    print(f"📖 Reading from: {input_file}")
    
    # Extract JSON
    raw_conditions = extract_json_from_js(js_content)
    print(f"✅ Found {len(raw_conditions)} conditions")
    
    # Clean each condition
    cleaned_conditions = {}
    stats = {'RED': 0, 'YELLOW': 0, 'GREEN': 0}
    
    for key, condition in raw_conditions.items():
        try:
            cleaned = clean_condition(key, condition)
            cleaned_conditions[key] = cleaned
            stats[cleaned['tier']] += 1
        except Exception as e:
            print(f"⚠️  Error cleaning {key}: {e}")
    
    print(f"\n📊 Cleaning Statistics:")
    print(f"   🔴 RED (Emergency): {stats['RED']}")
    print(f"   🟡 YELLOW (Urgent): {stats['YELLOW']}")
    print(f"   🟢 GREEN (Self-care): {stats['GREEN']}")
    
    # Save cleaned data
    output_file = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("// Auto-generated cleaned clinical knowledge base\n")
        f.write("// Last updated: 2026-01-16\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(cleaned_conditions, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    
    print(f"\n✅ Cleaned data saved to: {output_file}")
    
    # Generate symptom synonyms file
    synonyms_file = Path(__file__).parent.parent / 'web_app' / 'data' / 'symptom_synonyms.json'
    synonyms_file.parent.mkdir(exist_ok=True)
    with open(synonyms_file, 'w') as f:
        json.dump(SYMPTOM_SYNONYMS, f, indent=2)
    
    print(f"✅ Symptom synonyms saved to: {synonyms_file}")
    
    print("\n🎉 Cleaning complete!")

if __name__ == '__main__':
    main()
