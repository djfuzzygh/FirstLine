# Kaggle Notebook Submission Template: FirstLine

*Copy the contents below into your Kaggle Notebook submission.*

---

# [MedGemma Challenge] FirstLine: Offline-First Clinical Co-Pilot
**Team**: [Your Team Name]
**Project**: FirstLine

## 📌 Executive Summary
FirstLine is an offline-first clinical decision support tool for Community Health Workers (CHWs). It uses MedGemma and HAI-DEF models to bridge the gap between rural community care and professional hospital referrals.

## 🛠 Project Architecture
FirstLine consists of:
1.  **Android App**: Jetpack Compose frontend with local Room storage.
2.  **FastAPI Backend**: Orchestrating MedGemma 2b/7b reasoning.
3.  **Agentic Workflow**: A multi-step safety-first pipeline.

## 🎬 Video Demo / Narrative
*Link your demo video here.*
Our demo covers:
1.  CHW intake of a child with high fever.
2.  AI-generated follow-up questions to rule out meningitis.
3.  Safety-driven RED triage triggered by tachypnea.
4.  Automated SOAP referral note generation.

## 📂 Codebase & Reproducibility
The full source code and documentation are available at:
[Link to your GitHub Repository]

### Local Reproduction (Kaggle Environment)
```python
# Clone the repository
!git clone https://github.com/[your-username]/firstline-submission.git
%cd firstline-submission/backend

# Install lite dependencies
!pip install -q fastapi uvicorn pydantic

# Run the Demo Runner showing synthetic case evaluation
!python demo_runner.py
```

## ⚖️ Safety & Responsible AI
FirstLine implements:
- **Non-diagnostic language**: Probabilistic triage only.
- **Red-flag overrides**: Deterministic rules for emergencies.
- **Human-in-the-loop**: Mandatory clinician decision logging.
- **Uncertainty Gating**: Sensitivity to model confidence.

---
*End of Notebook Content*
