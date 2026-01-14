# Edge AI Plan: FirstLine in the Field

FirstLine is designed for rural primary healthcare where "The Edge" is not just a technical concept, but a daily reality.

## 1. On-Device Inference Strategy
To achieve true offline-first capability, we propose a two-tier inference model:

### Tier A: Lightweight Rule Engine (Always Active)
- **Tech**: Kotlin/Java logic.
- **Role**: Immediate detection of life-threatening red flags without any model latency. Runs on 100% of Android devices.

### Tier B: Quantized LLM (MedGemma)
- **Tech**: MediaPipe LLM Inference SDK + 4-bit Quantized MedGemma 2b (GGUF/TFLite).
- **Optimization**: Leveraging Mobile NPU (Neural Processing Unit) on modern Android chipsets (e.g., MediaPipe’s GPU/NPU acceleration).
- **Fallback**: On older devices, the app uses a "Store and Forward" approach—saving the case and syncing with a local "Village Server" or a District Health Center hub when connectivity is briefly available.

## 2. Audio & Vision at the Edge
- **MedASR**: Implementation via Whisper.cpp or specialized TFLite wrappers for MedASR, enabling offline medical voice-to-text.
- **MedSigLIP**: Using LiteRT to generate embeddings for clinical photos locally. These embeddings are compared against a small, on-device vector database (using ScaNN or similar) of validated clinical reference images.

## 3. Power & Battery Optimization
- **Trigger-Based Inference**: Models only run when the user clicks "Triage", not in the background.
- **Differential Sync**: Data is synced using minimal JSON payloads to conserve battery and bandwidth.

## 4. Hardware Target
- **Primary**: Android devices with 4GB+ RAM, Android 11+.
- **Secondary (Relay)**: Raspberry Pi as a "Community Health Center Server" running the full MedGemma 7b model to support multiple CHWs in a 1km radius via local Wi-Fi.
