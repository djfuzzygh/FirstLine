# 🔧 CORRECTED KAGGLE CELL - Add AFTER cloning repo

# ============================================================
# ADD BATCH ENDPOINTS TO EXISTING main.py
# ============================================================

print("📝 Adding batch enhancement endpoints to main.py...")

batch_endpoints = '''

# ============================================================
# BATCH ENHANCEMENT ENDPOINTS (Added for enhancement)
# ============================================================

from pathlib import Path
import asyncio

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
    """Receive all conditions for batch processing"""
    conditions = request.conditions
    total = len(conditions)
    
    print(f"📥 Received {total} conditions for batch enhancement")
    
    status_data = {
        "total": total,
        "processed": 0,
        "status": "processing",
        "started_at": datetime.now().isoformat()
    }
    
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status_data, f)
    
    # Start background processing
    asyncio.create_task(process_batch_background(conditions))
    
    return BatchEnhancementResponse(
        status="started",
        message=f"Processing {total} conditions in background. Check /batch_status",
        total=total
    )

async def process_batch_background(conditions):
    """Background task to process all conditions"""
    enhanced = {}
    total = len(conditions)
    
    print(f"🧠 Starting batch processing of {total} conditions...")
    
    for i, (key, condition) in enumerate(conditions.items()):
        try:
            # Create enhancement prompt
            prompt = f"""<start_of_turn>user
Enhance: {condition['diagnosis']} (Tier: {condition['tier']})
Current: {', '.join(condition.get('symptoms', [])[:3])}

Provide:
SYMPTOMS: ["s1", "s2", "s3", "s4", "s5"]
REASONING: Brief pathophysiology sentence.
TREATMENT: ["t1", "t2", "t3"]
<end_of_turn>
<start_of_turn>model
"""
            
            # Call MedGemma
            response = agent._call_model(prompt)
            
            # Parse response
            import re
            symptoms = condition.get('symptoms', [])
            reasoning = condition.get('reasoning', '')
            treatment = condition.get('treatment', [])
            
            # Extract symptoms
            symptoms_match = re.search(r'SYMPTOMS:\\s*\\[(.*?)\\]', response, re.DOTALL)
            if symptoms_match:
                symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))[:10]
            
            # Extract reasoning  
            reasoning_match = re.search(r'REASONING:\\s*(.+?)(?=TREATMENT:|$)', response, re.DOTALL)
            if reasoning_match:
                reasoning = reasoning_match.group(1).strip()
            
            # Extract treatment
            treatment_match = re.search(r'TREATMENT:\\s*\\[(.*?)\\]', response, re.DOTALL)
            if treatment_match:
                treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))[:8]
            
            enhanced[key] = {
                **condition,
                'symptoms': symptoms if symptoms else condition.get('symptoms', []),
                'reasoning': reasoning if reasoning else condition.get('reasoning', ''),
                'treatment': treatment if treatment else condition.get('treatment', []),
                'enhanced_by': 'MedGemma-Batch',
                'enhanced_date': '2026-01-16'
            }
            
        except Exception as e:
            print(f"⚠️  Error with {key}: {e}")
            enhanced[key] = condition
        
        # Update status every 10 conditions
        if (i + 1) % 10 == 0:
            status_data = {
                "total": total,
                "processed": i + 1,
                "status": "processing",
                "progress": f"{(i+1)/total*100:.1f}%",
                "last_updated": datetime.now().isoformat()
            }
            with open(BATCH_STATUS_FILE, 'w') as f:
                json.dump(status_data, f)
            print(f"   Progress: {i+1}/{total} ({(i+1)/total*100:.1f}%)")
    
    # Save final results
    print(f"💾 Saving {len(enhanced)} enhanced conditions...")
    with open(BATCH_RESULTS_FILE, 'w') as f:
        json.dump(enhanced, f, indent=2)
    
    # Update final status
    status_data = {
        "total": total,
        "processed": total,
        "status": "complete",
        "completed_at": datetime.now().isoformat()
    }
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status_data, f)
    
    print(f"✅ Batch processing complete! {total} conditions enhanced.")

@app.get("/batch_status")
async def get_batch_status():
    """Check processing status"""
    if BATCH_STATUS_FILE.exists():
        with open(BATCH_STATUS_FILE, 'r') as f:
            return json.load(f)
    return {"status": "not_started", "message": "No batch processing started"}

@app.get("/batch_results")
async def get_batch_results():
    """Download enhanced results"""
    if BATCH_RESULTS_FILE.exists():
        with open(BATCH_RESULTS_FILE, 'r') as f:
            return json.load(f)
    return {"error": "Results not ready. Check /batch_status first"}
'''

# Append to the existing main.py file
with open('main.py', 'a') as f:
    f.write(batch_endpoints)

print("✅ Batch endpoints added to main.py!")
