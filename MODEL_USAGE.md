# Model Usage Documentation

FirstLine leverages the Google Health AI Developer Foundations (HAI-DEF) and MedGemma model families to provide clinical decision support.

## 1. Selected Models

### A. MedGemma (Reasoning & Triage)
- **Model**: `google/med-gemma-2b-it` (or `7b` if compute allows)
- **Role**: Analyzes intake text, generates follow-up questions, and provides triage reasoning.
- **Why**: Specifically tuned for medical reasoning with higher safety alignment than general-purpose LLMs.
- **Source**: [Hugging Face MedGemma Collection](https://huggingface.co/collections/google/medgemma-release)

### B. MedASR (Voice Intake)
- **Model**: HAI-DEF MedASR
- **Role**: Converts spoken clinical notes from CHWs into structured text.
- **Why**: Handles medical terminology and diverse accents better than generic ASR.
- **Source**: [HAI-DEF Collection](https://huggingface.co/collections/google/health-ai-developer-foundations-hai-def)

### C. MedSigLIP (Image Embeddings)
- **Model**: HAI-DEF MedSigLIP
- **Role**: Calculates embeddings for images of visible conditions (rashes, wounds). Used for similarity retrieval against a local knowledge base (atlas) to support human decision-making.
- **Why**: State-of-the-art medical vision-language representation.

## 2. Model Integration Strategy

### Agentic Pipeline
We use an agentic workflow to ensure the model doesn't "hallucinate" a diagnosis immediately.
1.  **Intake Agent**: Normalizes text and identifies missing data points.
2.  **Follow-up Agent**: Asks 3-5 clarifying questions based on WHO IMCI (Integrated Management of Childhood Illness) guidelines.
3.  **Safety Gate**: Hard-coded rule check for life-threatening red flags.
4.  **Triage Agent**: Synthesizes all data into a color-coded recommendation (Green/Yellow/Red).

### Offline Consideration
For the hackathon submission, the backend serves these models via FastAPI. In a production edge deployment, we advocate for using:
- **MediaPipe LLM Inference SDK**: To run MedGemma 2b on-device (Qualcomm/Tensor NPU).
- **LiteRT (formerly TFLite)**: For MedSigLIP image embedding on-device.

## 3. How to obtain weights
Weight files are NOT included in this repository due to size and licensing.
1.  Accept the terms on Hugging Face for the Google MedGemma and HAI-DEF models.
2.  Use the provided `download_models.py` script (in `/backend`) to fetch the quantized GGUF or Safetensors versions.
