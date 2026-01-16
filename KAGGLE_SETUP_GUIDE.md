# 🚀 Kaggle Notebook Setup Guide

## 📋 **What Your Kaggle Notebook Does**

Your Kaggle notebook serves as the **MedGemma-powered backend** for FirstLine. It:

1. ✅ Loads the MedGemma model (google/medgemma-1.5-4b-it)
2. ✅ Creates a FastAPI server
3. ✅ Exposes it via ngrok tunnel
4. ✅ Provides AI-enhanced clinical reasoning
5. ✅ Works as an optional enhancement to your offline app

---

## 🎯 **Quick Setup (5 minutes)**

### **Step 1: Create New Kaggle Notebook**
1. Go to [kaggle.com/code](https://www.kaggle.com/code)
2. Click "New Notebook"
3. Name it: "FirstLine MedGemma Backend"

### **Step 2: Configure Notebook**
1. **Enable GPU:**
   - Click "Accelerator" → Select "GPU T4 x2" or "GPU P100"
   
2. **Enable Internet:**
   - Click "Settings" → Toggle "Internet" ON

3. **Add Secrets:**
   - Click "Add-ons" → "Secrets"
   - Add two secrets:
     - `HUGGINGFACE_TOKEN` = your HuggingFace token
     - `NGROK_TOKEN` = your ngrok token

### **Step 3: Copy Code**
1. Open `FINAL_KAGGLE_NOTEBOOK_PRODUCTION.py`
2. Copy ALL the code
3. Paste into Kaggle notebook

### **Step 4: Run**
1. Click "Run All" or press Shift+Enter on each cell
2. Wait 2-3 minutes for model to load
3. **Copy the ngrok URL** from Cell 5 output
4. Use this URL in your FirstLine app

---

## 📊 **Notebook Structure**

```
Cell 1: Setup & Installation
├─ Check GPU
├─ Install dependencies
└─ ~30 seconds

Cell 2: Load Secrets
├─ Get HuggingFace token
├─ Get ngrok token
└─ ~5 seconds

Cell 3: Load MedGemma Model
├─ Load tokenizer
├─ Load model (FP16 optimized)
└─ ~2-3 minutes

Cell 4: Create FastAPI Backend
├─ Define API endpoints
├─ Create data models
├─ Setup CORS
└─ ~5 seconds

Cell 5: Start Ngrok Tunnel
├─ Kill old tunnels
├─ Start new tunnel
├─ Print public URL ← COPY THIS!
└─ ~10 seconds

Cell 6: Start Server
├─ Run FastAPI server
└─ Keep running...
```

---

## 🌐 **Using the Backend**

### **In Your App:**

```javascript
// Set the ngrok URL
const MEDGEMMA_API = 'https://xxxx-xx-xx-xx-xx.ngrok-free.dev';

// Call the triage endpoint
const response = await fetch(`${MEDGEMMA_API}/triage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        intake: {
            age: 25,
            sex: 'M',
            symptoms: 'fever, cough, chest pain',
            duration_days: 2,
            temp_c: 39.5,
            rr: 24
        },
        followup_responses: {}
    })
});

const result = await response.json();
console.log(result);
// {
//   diagnosis: "Possible pneumonia",
//   tier: "RED",
//   confidence: 75,
//   reasoning: "...",
//   actions: ["🚨 Seek immediate medical attention", ...],
//   danger_signs: 2
// }
```

---

## 🧪 **Testing the Backend**

### **1. Health Check**
```bash
curl https://your-ngrok-url.ngrok-free.dev/health
```

Expected response:
```json
{
  "status": "healthy",
  "gpu_available": true,
  "model_loaded": true,
  "tokenizer_loaded": true
}
```

### **2. Stats**
```bash
curl https://your-ngrok-url.ngrok-free.dev/stats
```

### **3. Triage Request**
```bash
curl -X POST https://your-ngrok-url.ngrok-free.dev/triage \
  -H "Content-Type: application/json" \
  -d '{
    "intake": {
      "age": 5,
      "sex": "M",
      "symptoms": "high fever, vomiting",
      "duration_days": 2,
      "temp_c": 40.2
    }
  }'
```

---

## ⚙️ **Configuration Options**

### **Model Settings (in Cell 3):**
```python
# Use FP16 for speed (recommended)
torch_dtype=torch.float16

# Or use FP32 for accuracy (slower)
torch_dtype=torch.float32

# Adjust max tokens for longer responses
max_new_tokens=500  # Default
max_new_tokens=1000  # Longer responses
```

### **Server Settings (in Cell 6):**
```python
# Port (default 8000)
port=8000

# Log level
log_level="info"  # or "debug" for more details
```

---

## 🔧 **Troubleshooting**

### **Problem: Model fails to load**
**Solution:**
- Check GPU is enabled
- Check HuggingFace token is valid
- Try restarting the notebook

### **Problem: Ngrok fails**
**Solution:**
- Check ngrok token is valid
- Try killing existing tunnels: `ngrok.kill()`
- Get a new token from ngrok.com

### **Problem: Out of memory**
**Solution:**
- Use GPU T4 x2 or P100
- Reduce `max_new_tokens`
- Use FP16 instead of FP32

### **Problem: Slow responses**
**Solution:**
- Ensure GPU is being used
- Reduce `max_new_tokens`
- Check GPU memory usage in stats endpoint

---

## 📊 **Performance Expectations**

| Metric | Value |
|--------|-------|
| Model Load Time | 2-3 minutes |
| First Request | 5-10 seconds |
| Subsequent Requests | 2-5 seconds |
| GPU Memory Usage | ~4-6 GB |
| Max Concurrent Requests | 1-2 (single GPU) |

---

## 🎯 **Integration with Your App**

### **Offline-First Strategy:**

```javascript
async function analyzePatient(input) {
    // ALWAYS try offline first
    const offlineResult = await offlineEngine.analyze(input);
    
    // If online, enhance with MedGemma
    if (navigator.onLine && MEDGEMMA_API) {
        try {
            const onlineResult = await fetch(`${MEDGEMMA_API}/triage`, {
                method: 'POST',
                body: JSON.stringify({ intake: input }),
                timeout: 5000  // 5 second timeout
            });
            
            // Merge results
            return mergeResults(offlineResult, onlineResult);
        } catch (error) {
            // Fall back to offline
            return offlineResult;
        }
    }
    
    return offlineResult;
}
```

---

## 📝 **Important Notes**

### **For Hackathon Submission:**
1. ✅ Include the Kaggle notebook link in your submission
2. ✅ Explain it's an optional enhancement (not required)
3. ✅ Emphasize offline-first design
4. ✅ Show it works without the backend

### **Limitations:**
- ⚠️ Ngrok free tier has limits (40 requests/minute)
- ⚠️ Kaggle notebooks timeout after 12 hours
- ⚠️ Need to restart notebook daily
- ⚠️ Single GPU = limited concurrency

### **For Production:**
- Consider deploying to a permanent server
- Use a paid ngrok plan or proper domain
- Add authentication
- Add rate limiting
- Add monitoring

---

## ✅ **Checklist**

Before running:
- [ ] GPU enabled in Kaggle
- [ ] Internet enabled in Kaggle
- [ ] HuggingFace token added to secrets
- [ ] Ngrok token added to secrets
- [ ] Code pasted into notebook

After running:
- [ ] All cells executed successfully
- [ ] Ngrok URL copied
- [ ] Health check passes
- [ ] Test triage request works
- [ ] URL added to your app

---

## 🚀 **Ready to Go!**

Your Kaggle notebook is now configured to:
- ✅ Load MedGemma model
- ✅ Provide AI-enhanced triage
- ✅ Work as optional backend
- ✅ Support your offline-first app

**Just run it and copy the ngrok URL!**

---

**See `FINAL_KAGGLE_NOTEBOOK_PRODUCTION.py` for the complete code.**
