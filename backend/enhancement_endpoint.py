"""
Add this to your backend/main.py to enable enhancement endpoint
"""

from pydantic import BaseModel

class EnhancementRequest(BaseModel):
    diagnosis: str
    tier: str
    symptoms: list
    reasoning: str
    treatment: list

class EnhancementResponse(BaseModel):
    symptoms: list
    reasoning: str
    treatment: list

@app.post("/enhance", response_model=EnhancementResponse)
async def enhance_condition(request: EnhancementRequest):
    """
    Enhance a clinical condition with MedGemma
    Single-pass enhancement for efficiency
    """
    
    prompt = f"""<start_of_turn>user
You are a medical expert. Enhance this clinical condition:

CONDITION: {request.diagnosis} (Severity: {request.tier})
CURRENT DATA:
- Symptoms: {', '.join(request.symptoms[:3])}
- Reasoning: {request.reasoning}
- Treatment: {', '.join(request.treatment[:2])}

Provide ALL of the following:

1. SYMPTOMS (8-12 items with medical terms)
2. REASONING (3-4 sentences on pathophysiology)
3. TREATMENT (6-8 prioritized steps)

FORMAT:
SYMPTOMS: ["symptom1", "symptom2", ...]
REASONING: Your reasoning here.
TREATMENT: ["step1", "step2", ...]
<end_of_turn>
<start_of_turn>model
"""
    
    response = agent._call_model(prompt)
    
    # Parse response
    import re
    import json
    
    symptoms = request.symptoms
    reasoning = request.reasoning
    treatment = request.treatment
    
    # Extract symptoms
    symptoms_match = re.search(r'SYMPTOMS:\s*(\[[\s\S]*?\])', response, re.IGNORECASE)
    if symptoms_match:
        try:
            symptoms = json.loads(symptoms_match.group(1))
        except:
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
            treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))
    
    return EnhancementResponse(
        symptoms=symptoms[:15],
        reasoning=reasoning,
        treatment=treatment[:10]
    )
