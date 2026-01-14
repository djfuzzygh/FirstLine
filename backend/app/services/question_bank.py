"""
WHO IMCI & GHS Compliant Question Bank
Based on:
- WHO Integrated Management of Childhood Illness (IMCI)
- Ghana Health Service Clinical Guidelines
- Community-Based Health Planning and Services (CHPS) protocols
"""

# WHO IMCI Danger Signs - Always check these first
GENERAL_DANGER_SIGNS = [
    {
        "question": "Is the patient able to drink or breastfeed?",
        "type": "choice",
        "options": ["Yes, normally", "Yes, but with difficulty", "No, unable to drink"],
        "critical": True,
        "imci_ref": "General Danger Sign"
    },
    {
        "question": "Does the patient vomit everything?",
        "type": "choice",
        "options": ["Yes", "No", "Unsure"],
        "critical": True,
        "imci_ref": "General Danger Sign"
    },
    {
        "question": "Has the patient had convulsions/seizures?",
        "type": "choice",
        "options": ["Yes, currently", "Yes, in past 24 hours", "No"],
        "critical": True,
        "imci_ref": "General Danger Sign"
    }
]

# Symptom-specific question banks
FEVER_QUESTIONS = [
    {
        "question": "How many days has the fever lasted?",
        "type": "number",
        "unit": "days",
        "imci_ref": "Fever Assessment"
    },
    {
        "question": "Is there a stiff neck?",
        "type": "choice",
        "options": ["Yes", "No", "Unsure"],
        "imci_ref": "Meningitis screening"
    },
    {
        "question": "Is there a rash?",
        "type": "choice",
        "options": ["Yes, widespread", "Yes, localized", "No"],
        "imci_ref": "Measles/Meningitis screening"
    },
    {
        "question": "Has the patient traveled to a malaria-endemic area recently?",
        "type": "choice",
        "options": ["Yes", "No", "Lives in endemic area"],
        "imci_ref": "Malaria risk assessment"
    },
    {
        "question": "Is the patient taking any antimalarial medication?",
        "type": "choice",
        "options": ["Yes", "No", "Unsure"],
        "imci_ref": "Treatment history"
    }
]

DIARRHEA_QUESTIONS = [
    {
        "question": "How many days has the diarrhea lasted?",
        "type": "number",
        "unit": "days",
        "imci_ref": "Diarrhea duration"
    },
    {
        "question": "Is there blood in the stool?",
        "type": "choice",
        "options": ["Yes", "No", "Unsure"],
        "critical": True,
        "imci_ref": "Dysentery screening"
    },
    {
        "question": "Are the eyes sunken?",
        "type": "choice",
        "options": ["Yes, very sunken", "Yes, somewhat", "No"],
        "imci_ref": "Dehydration sign"
    },
    {
        "question": "When you pinch the skin, does it go back:",
        "type": "choice",
        "options": ["Immediately", "Slowly (< 2 seconds)", "Very slowly (> 2 seconds)"],
        "imci_ref": "Dehydration - skin pinch test"
    },
    {
        "question": "Is the patient restless or irritable?",
        "type": "choice",
        "options": ["Yes, very", "Somewhat", "No, calm"],
        "imci_ref": "Dehydration sign"
    }
]

COUGH_RESPIRATORY_QUESTIONS = [
    {
        "question": "How many days has the cough/breathing problem lasted?",
        "type": "number",
        "unit": "days",
        "imci_ref": "Cough duration"
    },
    {
        "question": "Is there fast breathing? (Count breaths for 1 minute)",
        "type": "choice",
        "options": ["Yes (>50/min if <1yr, >40/min if 1-5yr)", "No", "Unable to count"],
        "imci_ref": "Pneumonia screening"
    },
    {
        "question": "Is there chest indrawing (lower chest wall pulls in when breathing)?",
        "type": "choice",
        "options": ["Yes, severe", "Yes, mild", "No"],
        "critical": True,
        "imci_ref": "Severe pneumonia sign"
    },
    {
        "question": "Is there stridor (harsh sound when breathing in)?",
        "type": "choice",
        "options": ["Yes, when calm", "Yes, when crying only", "No"],
        "critical": True,
        "imci_ref": "Severe respiratory distress"
    },
    {
        "question": "Is there wheezing?",
        "type": "choice",
        "options": ["Yes", "No", "Unsure"],
        "imci_ref": "Asthma/Bronchiolitis screening"
    }
]

MALNUTRITION_QUESTIONS = [
    {
        "question": "Is there visible severe wasting (very thin arms/legs)?",
        "type": "choice",
        "options": ["Yes, severe", "Yes, moderate", "No"],
        "critical": True,
        "imci_ref": "Severe Acute Malnutrition"
    },
    {
        "question": "Is there swelling of both feet (edema)?",
        "type": "choice",
        "options": ["Yes, both feet", "Yes, one foot", "No"],
        "critical": True,
        "imci_ref": "Kwashiorkor screening"
    },
    {
        "question": "What is the child's weight? (if known)",
        "type": "number",
        "unit": "kg",
        "imci_ref": "Nutritional assessment"
    }
]

PREGNANCY_QUESTIONS = [
    {
        "question": "How many weeks/months pregnant?",
        "type": "number",
        "unit": "weeks",
        "imci_ref": "Gestational age"
    },
    {
        "question": "Is there vaginal bleeding?",
        "type": "choice",
        "options": ["Yes, heavy", "Yes, light spotting", "No"],
        "critical": True,
        "imci_ref": "Obstetric emergency"
    },
    {
        "question": "Is there severe headache with blurred vision?",
        "type": "choice",
        "options": ["Yes, both", "Headache only", "No"],
        "critical": True,
        "imci_ref": "Pre-eclampsia screening"
    },
    {
        "question": "Is there swelling of face and hands?",
        "type": "choice",
        "options": ["Yes, severe", "Yes, mild", "No"],
        "imci_ref": "Pre-eclampsia sign"
    },
    {
        "question": "Is there reduced fetal movement?",
        "type": "choice",
        "options": ["Yes, no movement today", "Yes, less than usual", "No, normal movement"],
        "critical": True,
        "imci_ref": "Fetal distress"
    }
]

INJURY_QUESTIONS = [
    {
        "question": "Is there active bleeding?",
        "type": "choice",
        "options": ["Yes, severe", "Yes, controlled", "No"],
        "critical": True,
        "imci_ref": "Trauma assessment"
    },
    {
        "question": "Is the patient conscious and alert?",
        "type": "choice",
        "options": ["Yes, fully alert", "Drowsy/confused", "Unconscious"],
        "critical": True,
        "imci_ref": "Head injury screening"
    },
    {
        "question": "Is there suspected bone fracture?",
        "type": "choice",
        "options": ["Yes, visible deformity", "Yes, suspected", "No"],
        "imci_ref": "Fracture assessment"
    }
]

# Age-specific additional questions
INFANT_QUESTIONS = [
    {
        "question": "Is the baby breastfeeding?",
        "type": "choice",
        "options": ["Yes, normally", "Yes, but poorly", "No, stopped"],
        "imci_ref": "Infant feeding assessment"
    },
    {
        "question": "Is the baby's fontanelle (soft spot) sunken?",
        "type": "choice",
        "options": ["Yes, very sunken", "Slightly sunken", "Normal"],
        "imci_ref": "Dehydration in infants"
    }
]

# GHS-specific additions for Ghana context
GHANA_SPECIFIC_QUESTIONS = [
    {
        "question": "Has the patient been to a health facility in the past week?",
        "type": "choice",
        "options": ["Yes", "No"],
        "imci_ref": "GHS - Treatment history"
    },
    {
        "question": "Is the patient taking any herbal medicine?",
        "type": "choice",
        "options": ["Yes", "No", "Unsure"],
        "imci_ref": "GHS - Traditional medicine use"
    }
]


def select_questions(intake_data):
    """
    Intelligently select the most appropriate questions based on:
    - Patient symptoms
    - Age
    - Pregnancy status
    - WHO IMCI guidelines
    - GHS protocols
    """
    selected_questions = []
    symptoms_lower = intake_data.get('symptoms', '').lower()
    age = intake_data.get('age', 0)
    is_pregnant = intake_data.get('pregnancy_status', False)
    
    # Priority 1: Always check general danger signs for children under 5
    if age < 5:
        selected_questions.extend(GENERAL_DANGER_SIGNS[:1])  # Most critical
    
    # Priority 2: Symptom-specific questions
    if any(word in symptoms_lower for word in ['fever', 'hot', 'temperature', 'malaria']):
        selected_questions.extend(FEVER_QUESTIONS[:2])
    
    if any(word in symptoms_lower for word in ['diarrhea', 'diarrhoea', 'stool', 'loose', 'watery']):
        selected_questions.extend(DIARRHEA_QUESTIONS[:2])
    
    if any(word in symptoms_lower for word in ['cough', 'breathing', 'breath', 'wheeze', 'pneumonia']):
        selected_questions.extend(COUGH_RESPIRATORY_QUESTIONS[:2])
    
    if any(word in symptoms_lower for word in ['thin', 'wasting', 'malnourish', 'weight loss']):
        selected_questions.extend(MALNUTRITION_QUESTIONS[:2])
    
    if is_pregnant or any(word in symptoms_lower for word in ['pregnant', 'pregnancy', 'antenatal']):
        selected_questions.extend(PREGNANCY_QUESTIONS[:2])
    
    if any(word in symptoms_lower for word in ['injury', 'accident', 'fall', 'cut', 'wound', 'bleeding']):
        selected_questions.extend(INJURY_QUESTIONS[:2])
    
    # Priority 3: Age-specific questions
    if age < 2:
        selected_questions.extend(INFANT_QUESTIONS[:1])
    
    # Priority 4: Ensure we have exactly 3 questions
    # If less than 3, add general danger signs
    while len(selected_questions) < 3:
        remaining_danger_signs = [q for q in GENERAL_DANGER_SIGNS if q not in selected_questions]
        if remaining_danger_signs:
            selected_questions.append(remaining_danger_signs[0])
        else:
            # Add Ghana-specific if still needed
            selected_questions.append(GHANA_SPECIFIC_QUESTIONS[0])
            break
    
    # Return top 3 most relevant
    return selected_questions[:3]
