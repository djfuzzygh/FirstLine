# Reproducibility Guide

Follow these steps to reproduce the FirstLine backend and demo runner.

## 1. Environment Setup
- **OS**: Linux or macOS (Windows with WSL2).
- **Python**: 3.10+
- **Hardware**: 
  - *Minimum*: 8GB RAM (CPU-only mode with 4-bit quantization).
  - *Recommended*: 16GB RAM + 8GB VRAM (CUDA-enabled).

## 2. Installation
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 3. Model Downloads
You must have a Hugging Face token with access to MedGemma.
```bash
export HF_TOKEN="your_token_here"
python download_models.py
```

## 4. Running the Backend
```bash
# Start the FastAPI server
python main.py
```
Default URL: `http://localhost:8000`

## 5. Running the Evaluation / Demo
This script runs the synthetic cases through the agentic pipeline and validates safety triggers.
```bash
python demo_runner.py
```

## 6. Android App Compilation
- Requirement: Android Studio Ladybug or newer.
- Build the APK using `./gradlew assembleDebug`.
- Note: For the hackathon demo, the app is configured to point to `http://10.0.2.2:8000` (Android Emulator loopback to host).
