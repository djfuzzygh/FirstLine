# Agentic Workflow: The FirstLine Pipeline

FirstLine does not use a "one-shot" approach to triage. It employs a multi-step agentic pipeline to maximize safety and grounding.

## Step 1: Intake Normalization
- **Action**: Clean symptoms text, extract entities (Age, Sex, Primary Complaint).
- **Goal**: Ensure the model starts with a structured representation of the patient.

## Step 2: Adaptive Follow-up Generation (MedGemma)
- **Action**: Based on the normalized intake, MedGemma generates 3–5 targeted questions.
- **Example**: If "Cough" is reported, the system automatically asks about "Fast breathing" and "Stiff neck".
- **Grounding**: Prompts are constrained to WHO IMCI and Clinical guidelines.

## Step 3: Red-Flag Detection (Rules + AI)
- **Action**: A high-priority audit layer scans for life-threatening keywords and vitals thresholds.
- **Override**: If a red flag is detected, subsequent AI reasoning can only *support* the RED triage; it cannot downgrade it.

## Step 4: Triage Reasoning (MedGemma)
- **Action**: MedGemma synthesizes the initial intake, follow-up answers, and vitals.
- **Output**: It generates a triage tier (Green/Yellow/Red) and a written justification.
- **Constraint**: The model must output an "Uncertainty Level".

## Step 5: Uncertainty Gating
- **Action**: If uncertainty is HIGH, any GREEN recommendation is automatically upgraded to YELLOW to ensure safety.

## Step 6: SOAP Referral Generation
- **Action**: MedGemma transforms the clinical data into a professional SOAP (Subjective, Objective, Assessment, Plan) note for the referral facility.

## Audit Trail
Every step of the workflow is logged locally. In the "Why" panel of the app, CHWs can see exactly which symptoms or follow-up responses triggered the specific triage tier.
