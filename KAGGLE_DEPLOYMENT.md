# 🦅 Deployment Guide: Running FirstLine on Kaggle

This is the **Pro-Tier** deployment strategy.
By deploying to Kaggle, you get **FREE GPU ACCESS**.
This means you can run the **REAL MedGemma AI** (not just the Mock mode) without paying for servers.

---

## 🏗️ The Architecture
1.  **Backend (Python)**: Runs inside a **Kaggle Notebook**. It uses the Kaggle GPU to run MedGemma.
2.  **Tunnel (Ngrok)**: A magic tool that gives your Kaggle Notebook a public URL (e.g., `https://nice-mule-wow.ngrok-free.app`).
3.  **Frontend (Web App)**: Hosted on Vercel/Netlify, connected to that Ngrok URL.

---

## 🛠️ Step 1: Prepare Kaggle Notebook

1.  Log in to [Kaggle](https://www.kaggle.com).
2.  Click **Create** -> **New Notebook**.
3.  **IMPORTANT**: In the Notebook settings (right sidebar):
    *   **Accelerator**: Select **GPU T4 x2** (or P100).
    *   **Internet**: Toggle **On**.
4.  Paste the following code into the first cell and run it:

```python
# ROBUST KAGGLE SCRIPT
from huggingface_hub import login
from pyngrok import ngrok
import os
import shutil

# --- TOKENS (Replace with yours if needed, keeping defaults for easy copy-paste) ---
HF_TOKEN_VAL = "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"
NGROK_TOKEN_VAL = "38GuYbLmnQI3VxninGsCYBWESSG_6GewQPdxjA4i4m1PVyhC1"

# 1. CLEANUP OLD RUNS (Fixes 'Folder exists' errors)
if os.path.exists("FirstLine"):
    shutil.rmtree("FirstLine")

# 2. CLONE & INSTALL
!git clone https://github.com/djfuzzygh/FirstLine.git
%cd FirstLine/backend
!pip install -r requirements.txt
!pip install pyngrok uvicorn

# 3. LOGIN
login(HF_TOKEN_VAL)
ngrok.set_auth_token(NGROK_TOKEN_VAL)

# 4. START TUNNEL
try:
    public_url = ngrok.connect(8000).public_url
    print(f"\n🚀 SUCCESS! BACKEND URL: {public_url}\n")
except:
    print("\n⚠️ Tunnel already active. Check previous output.\n")

# 5. START SERVER
# Important: We print the logs to see WHY it crashes if it does
os.environ["FIRSTLINE_MODE"] = "actual"
os.environ["HF_TOKEN"] = HF_TOKEN_VAL

print("⏳ STARTING SERVER... WATCH BELOW FOR ERRORS 👇")
!uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🔗 Step 2: Connect Frontend

1.  Run the notebook cell.
2.  Wait for the line: `🚀 SUCCESS! BACKEND URL: https://xyz...ngrok-free.app`
3.  Copy that URL.
4.  Open your local **FirstLine code**:
    *   Go to `web_app/main.js` (Lines 1-5)
    *   Go to `web_app/voice-call.js` (Lines 1-5)
    *   Go to `web_app/ussd.js` (Lines 1-5)
5.  Update the `API_BASE` variable:
    ```javascript
    // OLD: const API_BASE = 'http://localhost:8000';
    const API_BASE = 'https://YOUR-URL.ngrok-free.app'; // <--- PASTE HERE
    ```
6.  **Deploy your Frontend** to Vercel (as explained in `DEPLOYMENT_GUIDE.md`) OR just run it locally on your laptop for the demo video.

---

## 🎬 Step 3: Record Your Demo
Now you have a system running **Google's Real AI** on a **Kaggle GPU**:

1.  Open your Web App.
2.  Voice/Type a symptom.
3.  The request goes -> Vercel -> Ngrok -> Kaggle GPU -> MedGemma -> Back to you.
4.  It will process with real medical reasoning!

**Note**: Kaggle Notebooks time out after a few hours. This is perfect for recording your demo video or live presentation, but it's not a permanent 24/7 website.
