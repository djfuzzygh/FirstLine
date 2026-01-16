# COMPLETE KAGGLE NOTEBOOK - PASTE THIS ENTIRE FILE
# Replace your current Kaggle notebook with this

# ============================================================
# CELL 1: SETUP & CLONE
# ============================================================
import os
import shutil
from kaggle_secrets import UserSecretsClient

print("🔐 Loading Secrets...")
user_secrets = UserSecretsClient()
try:
    HF_TOKEN_VAL = user_secrets.get_secret("HUGGINGFACE_TOKEN")
    NGROK_TOKEN_VAL = user_secrets.get_secret("NGROK_TOKEN")
except Exception as e:
    print("❌ ERROR: Secrets not found!")
    raise e

# Cleanup
if os.path.exists("FirstLine"):
    shutil.rmtree("FirstLine")

# Clone & Install
print("📦 Installing Dependencies...")
!git clone https://github.com/djfuzzygh/FirstLine.git
%cd FirstLine/backend
!pip install -r requirements.txt
!pip install pyngrok uvicorn

# ============================================================
# CELL 2: ADD BATCH ENDPOINTS TO main.py
# ============================================================
print("📝 Adding batch enhancement endpoints to main.py...")

batch_code = '''

# ============================================================
# BATCH ENHANCEMENT ENDPOINTS
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
    
    asyncio.create_task(process_batch_background(conditions))
    
    return BatchEnhancementResponse(
        status="started",
        message=f"Processing {total} conditions. Check /batch_status",
        total=total
    )

async def process_batch_background(conditions):
    enhanced = {}
    total = len(conditions)
    
    print(f"🧠 Processing {total} conditions...")
    
    for i, (key, condition) in enumerate(conditions.items()):
        try:
            prompt = f"""<start_of_turn>user
Enhance: {condition['diagnosis']} ({condition['tier']})
Symptoms: {', '.join(condition.get('symptoms', [])[:3])}

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
                symptoms = re.findall(r'"([^"]+)"', symptoms_match.group(1))[:10]
            
            reasoning_match = re.search(r'REASONING:\\s*(.+?)(?=TREATMENT:|$)', response, re.DOTALL)
            if reasoning_match:
                reasoning = reasoning_match.group(1).strip()
            
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
            print(f"⚠️  {key}: {e}")
            enhanced[key] = condition
        
        if (i + 1) % 10 == 0:
            status_data = {
                "total": total,
                "processed": i + 1,
                "status": "processing",
                "progress": f"{(i+1)/total*100:.1f}%"
            }
            with open(BATCH_STATUS_FILE, 'w') as f:
                json.dump(status_data, f)
            print(f"Progress: {i+1}/{total}")
    
    with open(BATCH_RESULTS_FILE, 'w') as f:
        json.dump(enhanced, f, indent=2)
    
    status_data = {
        "total": total,
        "processed": total,
        "status": "complete",
        "completed_at": datetime.now().isoformat()
    }
    with open(BATCH_STATUS_FILE, 'w') as f:
        json.dump(status_data, f)
    
    print(f"✅ Complete! {total} conditions enhanced")

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
    return {"error": "Not ready. Check /batch_status"}
'''

with open('main.py', 'a') as f:
    f.write(batch_code)

print("✅ Batch endpoints added!")

# ============================================================
# CELL 3: START SERVER
# ============================================================
from pyngrok import ngrok
from huggingface_hub import login

print("🚀 Configuring...")
login(HF_TOKEN_VAL)
ngrok.set_auth_token(NGROK_TOKEN_VAL)

try:
    public_url = ngrok.connect(8000).public_url
    print(f"\n🚀 SUCCESS! URL: {public_url}\n")
except:
    print("\n⚠️ Tunnel already active\n")

os.environ["FIRSTLINE_MODE"] = "actual"
os.environ["HF_TOKEN"] = HF_TOKEN_VAL

print("⏳ STARTING SERVER...")
!uvicorn main:app --host 0.0.0.0 --port 8000
