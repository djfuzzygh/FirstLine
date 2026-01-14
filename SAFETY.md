# Safety and Compliance: FirstLine

FirstLine is built with a **Safety-First** architecture. It is NOT a diagnostic tool; it is a clinical decision support tool for trained health workers.

## 1. Non-Diagnostic Policy
- FirstLine **never** outputs a definitive diagnosis (e.g., "You have Malaria").
- Instead, it uses probabilistic language: "Symptoms are consistent with...", "Consider checking for...", "Risk indicators suggest...".
- **Mandatory Disclaimer**: Every screen in the app and every generated report contains the disclaimer: *"Clinical decision support only. Not for diagnosis. Confirm all results clinically."*

## 2. Red-Flag Overrides (Hard-Coded)
The system contains a deterministic "Red-Flag" layer that bypasses AI reasoning to force an immediate **RED (Urgent Referral)** triage status if any of the following are detected:
- Unconsciousness or seizures.
- Severe bleeding.
- Inability to drink or persistent vomiting.
- Severe respiratory distress (fast breathing, blue lips/fingernails).
- High fever (>39°C) in infants under 2 months.
- Pregnancy danger signs: Heavy bleeding, severe headache with blurred vision, sudden swelling of face/hands.

## 3. Human-in-the-Loop
- The AI's triage recommendation is just that—a recommendation.
- The health worker **must** manually record their final decision: "Treat locally", "Refer", or "Monitor".
- An "Override" button is permanently available to escalate any case.

## 4. Uncertainty Gating
- MedGemma outputs an "Uncertainty Score" (Low/Medium/High) along with its reasoning.
- If uncertainty is **HIGH**, the system automatically upgrades the triage tier to at least **YELLOW** and recommends consultation with a supervisor.

## 5. Photo Safety & Privacy
- **Quality Gate**: Images are checked for blur, lighting, and distance. Poor quality images are rejected from AI analysis.
- **Privacy**: No faces are stored in the standard triage flow. Images are encrypted locally and deleted after the referral is completed.
- **Anonymization**: By default, no patient names are stored; cases are identified by a local ID.

## 6. Data Minimization
- Minimal data collection: Age, Sex, Symptoms, Vitals.
- No GPS tracking by default.
- Local encryption (AES-256) for all stored cases on-device.

## 7. Model usage constraints
- Only publicly available models (MedGemma, HAI-DEF) are used.
- No private datasets were used for training or fine-tuning.
