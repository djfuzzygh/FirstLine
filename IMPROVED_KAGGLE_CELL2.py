# UPDATED KAGGLE CELL 2 - BETTER PROMPT FORMAT
# Replace your Cell 2 with this

print("📝 Adding batch endpoints with IMPROVED prompts...")

batch_endpoints_code = """

# ============================================================
# BATCH ENHANCEMENT ENDPOINTS (Improved Prompts)
# ============================================================

from pydantic import BaseModel
from typing import Dict
from pathlib import Path
from datetime import datetime
import asyncio
import json
import re

class BatchEnhancementRequest(BaseModel):
    conditions: Dict[str, dict]

class BatchEnhancementResponse(BaseModel):
    status: str
    message: str
    total: int

BATCH_RESULTS_FILE = Path("/kaggle/working/enhanced_conditions.json")
BATCH_STATUS_FILE = Path("/kaggle/working/batch_status.json")

@app.post("/batch_enhance", response_model=BatchEnhancementResponse)
async def batch_enhance(request: BatchEnhancementRequest):
    conditions = request.conditions
    total = len(conditions)
    print(f"📥 Received {total} conditions")
    status_data = {"total": total, "processed": 0, "status": "processing", "started_at": datetime.now().isoformat()}
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status_data, f)
    asyncio.create_task(process_batch_background(conditions))
    return BatchEnhancementResponse(status="started", message=f"Processing {total} conditions", total=total)

async def process_batch_background(conditions):
    enhanced = {}
    total = len(conditions)
    print(f"🧠 Processing {total} conditions...")
    
    for i, (key, condition) in enumerate(conditions.items()):
        try:
            # IMPROVED PROMPT - More context, clearer instructions
            prompt = f'''<start_of_turn>user
You are a medical expert. Enhance the clinical knowledge for: {condition['diagnosis']}

Current Information:
- Symptoms: {', '.join(condition.get('symptoms', [])[:5])}
- Reasoning: {condition.get('reasoning', 'Not provided')}
- Tier: {condition['tier']}

Please provide:

1. EXPANDED SYMPTOMS (8-12 items, include medical synonyms and red flags):
[Return as JSON array of strings]

2. ENHANCED CLINICAL REASONING (3-4 sentences):
- Explain pathophysiology
- Why these symptoms occur
- Key diagnostic considerations
- Urgency assessment

3. TREATMENT RECOMMENDATIONS (6-8 prioritized steps):
- Emergency actions if needed
- First-line treatments
- Self-care measures
- When to seek help

Format your response EXACTLY as:
SYMPTOMS: ["symptom1", "symptom2", "symptom3", ...]
REASONING: Your enhanced reasoning here.
TREATMENT: ["treatment1", "treatment2", "treatment3", ...]
<end_of_turn>
<start_of_turn>model
'''
            
            response = agent._call_model(prompt)
            
            # Parse response
            symptoms = condition.get('symptoms', [])
            reasoning = condition.get('reasoning', '')
            treatment = condition.get('treatment', [])
            
            # Extract symptoms
            symptoms_match = re.search(r'SYMPTOMS:\\s*\\[(.*?)\\]', response, re.DOTALL)
            if symptoms_match:
                symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))[:12]
            
            # Extract reasoning
            reasoning_match = re.search(r'REASONING:\\s*(.+?)(?=TREATMENT:|$)', response, re.DOTALL)
            if reasoning_match:
                reasoning = reasoning_match.group(1).strip()
            
            # Extract treatment
            treatment_match = re.search(r'TREATMENT:\\s*\\[(.*?)\\]', response, re.DOTALL)
            if treatment_match:
                treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))[:10]
            
            enhanced[key] = {
                **condition,
                'symptoms': symptoms if symptoms else condition.get('symptoms', []),
                'reasoning': reasoning if reasoning else condition.get('reasoning', ''),
                'treatment': treatment if treatment else condition.get('treatment', []),
                'enhanced_by': 'MedGemma-Batch-v2',
                'enhanced_date': '2026-01-16'
            }
            
        except Exception as e:
            print(f"⚠️  {key}: {str(e)[:30]}")
            enhanced[key] = condition
        
        # Update status every 10
        if (i + 1) % 10 == 0:
            with open(BATCH_STATUS_FILE, 'w') as f:
                json.dump({"total": total, "processed": i + 1, "status": "processing", "progress": f"{(i+1)/total*100:.1f}%"}, f)
            print(f"Progress: {i+1}/{total}")
    
    # Save results
    with open(BATCH_RESULTS_FILE, 'w') as f:
        json.dump(enhanced, f, indent=2)
    
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump({"total": total, "processed": total, "status": "complete", "completed_at": datetime.now().isoformat()}, f)
    
    print("✅ Complete!")

@app.get("/batch_status")
async def get_batch_status():
    if BATCH_STATUS_FILE.exists():
        with open(BATCH_STATUS_FILE, 'r') as f:
            return json.load(f)
    return {"status": "not_started"}

@app.get("/batch_results")
async def get_batch_results():
    if BATCH_RESULTS_FILE.exists():
        with open(BATCH_RESULTS_FILE, 'r') as f:
            return json.load(f)
    return {"error": "Not ready"}
"""

with open('main.py', 'a') as f:
    f.write(batch_endpoints_code)

print("✅ Batch endpoints added with IMPROVED prompts!")
