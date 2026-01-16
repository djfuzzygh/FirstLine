# 🗳️ Submission Manifest - FirstLine

This detailed manifest outlines the components of the **FirstLine** submission for the **Kaggle AI for Good - Healthcare Track**.

## 📁 Key File Locations

### 1. Documentation
- **[README.md](README.md)**: Main entry point and setup guide.
- **[FINAL_COMPLETE_SYSTEM.md](FINAL_COMPLETE_SYSTEM.md)**: Comprehensive system overview and feature list.
- **[CODEBASE_AUDIT_REPORT.md](CODEBASE_AUDIT_REPORT.md)**: Technical audit of the code quality and safety.
- **[VOICE_SYSTEM_PRODUCTION_PLAN.md](VOICE_SYSTEM_PRODUCTION_PLAN.md)**: Deployment plan for the voice telephony system.

### 2. Application Logic
- **Backend (Python)**: `backend/`
  - `main.py`: API Server.
  - `app/services/agent.py`: MedGemma AI integration.
  - `app/services/question_bank.py`: WHO IMCI clinical rules.
- **Frontend (Web)**: `web_app/`
  - `index.html`: Unified landing page (entry point).
  - `app.html`: Main Clinical Triage App (Web Interface).
  - `main.js`: Core logic for the web app.
  - `voice-call.js`: Logic for the voice simulator.
  - `ussd.js`: Logic for the USSD simulator.

## 🧪 Deployment & Testing
We have provided `start_firstline.sh` for one-click deployment.

### How to Verify Features for Judges:

| Feature | Action to Take | Expected Outcome |
|---------|----------------|------------------|
| **1. Web Triage** | Go to `Web App`, click "Start New Case", speak symptoms. | AI transcribes voice, asks relevant questions, gives Triage result. |
| **2. Voice Call** | Go to `Voice Call`, click Green Button, speak. | System speaks back, holds conversation, gives audio triage. |
| **3. USSD** | Go to `USSD`, dial `*920*55#`, use keypad. | Menu appears, allows navigation via numbers. |
| **4. Safety** | Enter "convulsions" or "vomiting everything" as symptom. | System flags **RED** (Emergency) immediately (Rule-based check). |
| **5. Analytics** | Go to `Analytics`, view charts. | Real-time mock data visualization of outbreaks. |

## 📦 Dependencies
- **Python**: `fastapi`, `transformers`, `torch`, `uvicorn`
- **Frontend**: Vanilla JS (bundled via Vite for dev, but runs natively)
- **External**: None required for Mock mode.

## 🤝 Acknowledgements
- **Google DeepMind** for MedGemma 1.5.
- **WHO** for IMCI guidelines.
- **Ghana Health Service** for inspiration.

### **Special Award Nomination: The Edge AI Prize**
**Justification**: We are bringing the power of **MedGemma** (a high-end cloud model) to the "Edge" of connectivity—the **Feature Phone** ($10 device). By using USSD/Voice gateways, we effectively run advanced AI on the most basic hardware available, allowing AI access in zero-internet zones.

### **Special Award Nomination: Agentic Workflow Prize**
**Justification**: FirstLine acts as a clinical agent:
1.  **Observes**: Takes initial vague symptoms.
2.  **Reasons**: Decides what information is missing.
3.  **Acts**: Generates specific follow-up questions (not static trees).
4.  **Decides**: Assigns a risk tier and generates a referral note.
5.  **Notifies**: Updates the central dashboard.
