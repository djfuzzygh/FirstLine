# ============================================================
# BATCH ENHANCEMENT ENDPOINTS
# Add this code to your Kaggle notebook main.py
# Paste it AFTER your existing endpoints (after /referral_summary)
# ============================================================

from pydantic import BaseModel
from typing import Dict
from pathlib import Path
from datetime import datetime
import asyncio

# Models
class BatchEnhancementRequest(BaseModel):
    conditions: Dict[str, dict]

class BatchEnhancementResponse(BaseModel):
    status: str
    message: str
    total: int

# File paths for storing results
BATCH_RESULTS_FILE = Path("/kaggle/working/enhanced_conditions.json")
BATCH_STATUS_FILE = Path("/kaggle/working/batch_status.json")

# ============================================================
# ENDPOINT 1: Upload all conditions for processing
# ============================================================
@app.post("/batch_enhance", response_model=BatchEnhancementResponse)
async def batch_enhance(request: BatchEnhancementRequest):
    """
    Receive all 424 conditions, start background processing
    """
    conditions = request.conditions
    total = len(conditions)
    
    print(f"📥 Received {total} conditions for batch enhancement")
    
    # Save initial status
    status = {
        "total": total,
        "processed": 0,
        "status": "processing",
        "started_at": str(datetime.now())
    }
    
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status, f)
    
    # Start background processing
    asyncio.create_task(process_batch_background(conditions))
    
    return BatchEnhancementResponse(
        status="started",
        message=f"Processing {total} conditions in background. Check /batch_status for progress.",
        total=total
    )

# ============================================================
# BACKGROUND TASK: Process all conditions
# ============================================================
async def process_batch_background(conditions):
    """Process all conditions in background"""
    enhanced = {}
    total = len(conditions)
    
    print(f"🧠 Starting batch processing of {total} conditions...")
    
    for i, (key, condition) in enumerate(conditions.items()):
        try:
            # Create enhancement prompt
            prompt = f"""<start_of_turn>user
You are a medical expert. Enhance this condition briefly:

CONDITION: {condition['diagnosis']} (Tier: {condition['tier']})
CURRENT SYMPTOMS: {', '.join(condition.get('symptoms', [])[:3])}

Provide ONLY:
SYMPTOMS: ["symptom1", "symptom2", "symptom3", "symptom4", "symptom5"]
REASONING: One sentence about pathophysiology.
TREATMENT: ["treatment1", "treatment2", "treatment3"]
<end_of_turn>
<start_of_turn>model
"""
            
            # Call MedGemma
            response = agent._call_model(prompt)
            
            # Parse response (simple extraction)
            import re
            
            symptoms = condition.get('symptoms', [])
            reasoning = condition.get('reasoning', '')
            treatment = condition.get('treatment', [])
            
            # Try to extract symptoms
            symptoms_match = re.search(r'SYMPTOMS:\s*\[(.*?)\]', response, re.DOTALL)
            if symptoms_match:
                symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))
            
            # Try to extract reasoning
            reasoning_match = re.search(r'REASONING:\s*(.+?)(?=TREATMENT:|$)', response, re.DOTALL)
            if reasoning_match:
                reasoning = reasoning_match.group(1).strip()
            
            # Try to extract treatment
            treatment_match = re.search(r'TREATMENT:\s*\[(.*?)\]', response, re.DOTALL)
            if treatment_match:
                treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))
            
            # Save enhanced version
            enhanced[key] = {
                **condition,
                'symptoms': symptoms[:10],
                'reasoning': reasoning,
                'treatment': treatment[:8],
                'enhanced_by': 'MedGemma-Batch',
                'enhanced_date': '2026-01-16'
            }
            
        except Exception as e:
            print(f"⚠️  Error with {key}: {e}")
            enhanced[key] = condition
        
        # Update status every 10 conditions
        if (i + 1) % 10 == 0:
            status = {
                "total": total,
                "processed": i + 1,
                "status": "processing",
                "progress": f"{(i+1)/total*100:.1f}%",
                "last_updated": str(datetime.now())
            }
            with open(BATCH_STATUS_FILE, 'w') as f:
                json.dump(status, f)
            print(f"   Progress: {i+1}/{total} ({(i+1)/total*100:.1f}%)")
    
    # Save final results
    print(f"💾 Saving {len(enhanced)} enhanced conditions...")
    with open(BATCH_RESULTS_FILE, 'w') as f:
        json.dump(enhanced, f, indent=2)
    
    # Update final status
    status = {
        "total": total,
        "processed": total,
        "status": "complete",
        "completed_at": str(datetime.now())
    }
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status, f)
    
    print(f"✅ Batch processing complete! {total} conditions enhanced.")

# ============================================================
# ENDPOINT 2: Check processing status
# ============================================================
@app.get("/batch_status")
async def get_batch_status():
    """Check how many conditions have been processed"""
    if BATCH_STATUS_FILE.exists():
        with open(BATCH_STATUS_FILE, 'r') as f:
            return json.load(f)
    return {"status": "not_started", "message": "No batch processing started yet"}

# ============================================================
# ENDPOINT 3: Download enhanced results
# ============================================================
@app.get("/batch_results")
async def get_batch_results():
    """Download all enhanced conditions"""
    if BATCH_RESULTS_FILE.exists():
        with open(BATCH_RESULTS_FILE, 'r') as f:
            return json.load(f)
    return {"error": "Results not ready. Check /batch_status first."}

# ============================================================
# That's it! Now restart your FastAPI server cell
# ============================================================
