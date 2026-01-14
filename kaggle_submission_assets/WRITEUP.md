# MedGemma Impact Challenge: FirstLine Write-up

## 1. Problem Statement
Community Health Workers (CHWs) in rural settings (e.g., Ghana's CHPS zones) are the first line of defense. However, they lack diagnostic tools and often struggle with identifying subtle red flags that necessitate urgent referral. Connectivity is sporadic, making cloud-only AI solutions unusable.

## 2. Our Solution: FirstLine
FirstLine is an AI-augmented "co-pilot" that works offline. It doesn't replace the nurse; it helps them ask the better questions and provides a second pair of eyes on vitals and symptoms using Google's MedGemma.

## 3. Technology & Model Integration
- **MedGemma-2b-it**: Used for its superior medical reasoning and instruction-following. It powers the adaptive questioning and triage reasoning.
- **HAI-DEF MedASR**: Enables documentation in busy clinical settings via voice.
- **HAI-DEF MedSigLIP**: Provides visual consistency checks for dermatological symptoms.
- **MediaPipe**: Our roadmap for on-device inference using TFLite.

## 4. The Agentic Workflow
We implemented a 7-step pipeline (Intake → Follow-up → Red-Flag Check → Triage → Uncertainty Gate → Referral → Log). This ensures that the AI is grounded in clinical guidelines and that safety triggers are never bypassed by model hallucinations.

## 5. Potential for Impact
- **Reduced Wait Times**: Speeding up the documentation process.
- **Improved Referral Quality**: Standardized SOAP notes ensure doctors at referral hospitals get accurate history.
- **Lives Saved**: Early detection of pneumonia and pre-eclampsia through deterministic red-flagging.

## 6. Sustainable Deployment
Our model uses a "Store and Forward" architecture, making it resilient to the reality of rural infrastructure. We prioritize low-compute requirements to ensure compatibility with affordable smartphone models used by NGOs and Ministries of Health.
