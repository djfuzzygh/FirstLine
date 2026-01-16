# 🚀 Efficient Enhancement via ngrok + Kaggle

## ⚡ **50% Faster with Single-Pass Method**

### **Step 1: Add Enhancement Endpoint to Kaggle**

In your Kaggle notebook, add this code to `backend/main.py`:

```python
# Copy the code from backend/enhancement_endpoint.py
# Add it after your existing endpoints
```

Or simply run this in your Kaggle notebook:

```python
# Add to your main.py
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
    # ... (copy full code from enhancement_endpoint.py)
```

### **Step 2: Restart Your Backend**

In Kaggle, restart the cell running your FastAPI server so it picks up the new endpoint.

### **Step 3: Run Enhancement**

On your Mac:

```bash
cd scraper_tool
export MEDGEMMA_API="https://heliolatrous-unstooping-rosy.ngrok-free.dev"
python3 enhance_ngrok_efficient.py
```

---

## ⏱️ **Time Estimate:**

- **Old method (2-pass):** ~35 minutes
- **New method (1-pass):** ~17 minutes ⚡
- **Per condition:** ~2.5 seconds

---

## 📊 **What Happens:**

```
Your Mac → ngrok → Kaggle GPU → MedGemma → Enhanced Data
```

1. Script sends condition data to `/enhance` endpoint
2. Kaggle runs MedGemma with optimized prompt
3. Gets symptoms + reasoning + treatment in ONE call
4. Saves checkpoint every 10 conditions

---

## ✅ **Benefits:**

- ✅ Uses Kaggle's free GPU
- ✅ 50% faster than 2-pass method
- ✅ Single API call per condition
- ✅ Better prompt engineering
- ✅ Checkpoint/resume support

---

## 🔧 **Quick Start:**

### Option A: Add endpoint manually
1. Copy code from `backend/enhancement_endpoint.py`
2. Add to your Kaggle `main.py`
3. Restart backend
4. Run `python3 enhance_ngrok_efficient.py`

### Option B: I can guide you through adding it
Just let me know and I'll help you update the Kaggle notebook!

---

**Ready to add the endpoint and run?** 🚀
