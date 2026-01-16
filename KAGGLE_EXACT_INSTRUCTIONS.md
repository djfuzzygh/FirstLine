# 🎯 EXACT INSTRUCTIONS FOR YOUR KAGGLE NOTEBOOK

## 📍 **Where to Add the Batch Code**

Your Kaggle notebook currently:
1. Clones the repo
2. Installs dependencies
3. Starts the server with `uvicorn main:app`

You need to **modify the `main.py` file** BEFORE starting the server.

---

## ✅ **Step-by-Step Instructions**

### **Step 1: Add a New Cell BEFORE the uvicorn command**

In your Kaggle notebook, add this cell **BEFORE** the `!uvicorn main:app` line:

```python
# ============================================================
# ADD BATCH ENHANCEMENT ENDPOINTS TO main.py
# ============================================================

print("📝 Adding batch enhancement endpoints...")

batch_code = '''
# ============================================================
# BATCH ENHANCEMENT ENDPOINTS
# ============================================================

from pydantic import BaseModel
from typing import Dict
from pathlib import Path
from datetime import datetime
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
    conditions = request.conditions
    total = len(conditions)
    
    print(f"📥 Received {total} conditions for batch enhancement")
    
    status = {
        "total": total,
        "processed": 0,
        "status": "processing",
        "started_at": str(datetime.now())
    }
    
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status, f)
    
    asyncio.create_task(process_batch_background(conditions))
    
    return BatchEnhancementResponse(
        status="started",
        message=f"Processing {total} conditions in background",
        total=total
    )

async def process_batch_background(conditions):
    enhanced = {}
    total = len(conditions)
    
    print(f"🧠 Starting batch processing of {total} conditions...")
    
    for i, (key, condition) in enumerate(conditions.items()):
        try:
            prompt = f"""<start_of_turn>user
Enhance: {condition['diagnosis']} (Tier: {condition['tier']})
Current symptoms: {', '.join(condition.get('symptoms', [])[:3])}

Provide:
SYMPTOMS: ["s1", "s2", "s3", "s4", "s5"]
REASONING: Brief pathophysiology.
TREATMENT: ["t1", "t2", "t3"]
<end_of_turn>
<start_of_turn>model
"""
            
            response = agent._call_model(prompt)
            
            import re
            symptoms = condition.get('symptoms', [])
            reasoning = condition.get('reasoning', '')
            treatment = condition.get('treatment', [])
            
            symptoms_match = re.search(r'SYMPTOMS:\\s*\\[(.*?)\\]', response, re.DOTALL)
            if symptoms_match:
                symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))
            
            reasoning_match = re.search(r'REASONING:\\s*(.+?)(?=TREATMENT:|$)', response, re.DOTALL)
            if reasoning_match:
                reasoning = reasoning_match.group(1).strip()
            
            treatment_match = re.search(r'TREATMENT:\\s*\\[(.*?)\\]', response, re.DOTALL)
            if treatment_match:
                treatment = re.findall(r'"([^"]+)"', treatment_match.group(1))
            
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
    
    print(f"💾 Saving {len(enhanced)} enhanced conditions...")
    with open(BATCH_RESULTS_FILE, 'w') as f:
        json.dump(enhanced, f, indent=2)
    
    status = {
        "total": total,
        "processed": total,
        "status": "complete",
        "completed_at": str(datetime.now())
    }
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status, f)
    
    print(f"✅ Batch processing complete!")

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
    return {"error": "Results not ready"}
'''

# Append to main.py
with open('main.py', 'a') as f:
    f.write('\n\n' + batch_code)

print("✅ Batch endpoints added to main.py")
```

### **Step 2: Your Notebook Structure Should Be:**

```
Cell 1: Load secrets, clone repo, install deps
Cell 2: Configure ngrok
Cell 3: ADD BATCH CODE (NEW CELL - code above) ← ADD THIS
Cell 4: Start server with uvicorn
```

### **Step 3: Run the Notebook**

Run all cells in order. You should see:
```
✅ Batch endpoints added to main.py
🚀 SUCCESS! BACKEND URL: https://...ngrok-free.dev
⏳ STARTING SERVER...
```

---

## 🧪 **Test It Works**

After the server starts, in a new Kaggle cell:

```python
import requests
r = requests.get("http://localhost:8000/batch_status")
print(r.json())
```

Should show: `{"status": "not_started"}`

---

## 🚀 **Then Run on Your Mac**

```bash
cd scraper_tool
python3 enhance_batch.py
```

---

**That's it! The batch code will be added to main.py before the server starts!** 🎉
