# Competition Requirements Compliance

This document tracks compliance with the MedGemma Impact Challenge rules.

| Requirement | Compliance Status | Implementation Detail |
| :--- | :--- | :--- |
| **One Submission** | ✅ | This repository represents the single, unified submission for the team. |
| **No Competition Data** | ✅ | No competition-provided data is used. Demo cases are synthetic. |
| **External Data** | ✅ | Only public-domain medical guidelines (WHO/GHS) and public models (HF) are used. |
| **No Private Sharing** | ✅ | Code is developed within the team and will be shared openly upon submission. |
| **Reproducibility** | ✅ | Complete instructions provided in `REPRODUCIBILITY.md`. |
| **License Compatibility**| ✅ | All dependencies are OSI-compliant. Code ready for CC BY 4.0 release. |
| **MedGemma Terms** | ✅ | Usage complies with Hai-DEF and Google Health terms. |

## External Assets Used
- **MedGemma-2b-it**: Primary reasoning engine.
- **MedASR**: (Simulated/Planned via HAI-DEF) for medical speech transcription.
- **MedSigLIP**: (Embeddings) for image consistency checks.

## Synthetic Data Disclaimer
The cases in `/kaggle_submission_assets/DEMO_CASES.json` are entirely synthetic and generated for demonstration purposes. They do not represent real patients.
