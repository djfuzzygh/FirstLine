# MedGemma Enhancement - Quick Start Guide

## 🎯 Overview
This script enhances your clinical knowledge base using MedGemma AI with 2 passes:
- **Pass 1:** Enhance symptoms + clinical reasoning
- **Pass 2:** Improve treatment recommendations

## 🔧 Setup

### Option 1: Using Kaggle Endpoint
```bash
# Set your Kaggle MedGemma endpoint
export MEDGEMMA_API="https://your-kaggle-notebook.kaggle.net"

# Run enhancement
cd scraper_tool
python3 enhance_with_medgemma.py
```

### Option 2: Using Local Backend
```bash
# Start your FastAPI backend first
cd backend
python main.py

# In another terminal, run enhancement
cd scraper_tool
python3 enhance_with_medgemma.py
```

## 📊 What It Does

### Input
- 424 cleaned conditions from `clinical_knowledge_cleaned.js`

### Processing
- **Pass 1:** MedGemma enhances symptoms and reasoning
- **Pass 2:** MedGemma improves treatment plans
- **Checkpoint:** Saves progress every 10 conditions

### Output
- `clinical_knowledge_medgemma.js` - Enhanced knowledge base
- `enhancement_checkpoint.json` - Progress checkpoint (for resume)

## ⏱️ Time Estimate

- **424 conditions × 2 passes** = 848 API calls
- **~2 seconds per call** = ~28 minutes total
- **With 0.5s delay** = ~35 minutes total

## 🔄 Resume Support

If the script stops, just run it again! It will:
- ✅ Load the checkpoint file
- ✅ Skip already processed conditions
- ✅ Continue from where it left off

## 📝 Example Enhancement

### Before:
```json
{
  "diagnosis": "Meningitis",
  "symptoms": ["fever", "headache", "stiff neck"],
  "reasoning": "Meningitis is a medical emergency...",
  "treatment": ["antibiotics", "fluids"]
}
```

### After (MedGemma-Enhanced):
```json
{
  "diagnosis": "Meningitis",
  "symptoms": [
    "fever",
    "severe headache",
    "nuchal rigidity (stiff neck)",
    "photophobia",
    "altered mental status",
    "nausea and vomiting",
    "petechial rash",
    "Kernig's sign",
    "Brudzinski's sign"
  ],
  "reasoning": "Bacterial meningitis involves inflammation of the meninges caused by bacterial infection, most commonly Streptococcus pneumoniae or Neisseria meningitidis. The classic triad of fever, neck stiffness, and altered mental status occurs in only 44% of cases. Rapid progression can lead to septic shock, seizures, and death within hours if untreated. Immediate empiric antibiotics and supportive care are critical.",
  "treatment": [
    "Call 999 immediately - this is a medical emergency",
    "Administer empiric IV antibiotics (ceftriaxone + vancomycin) within 1 hour",
    "Perform lumbar puncture if no contraindications",
    "IV dexamethasone to reduce inflammation",
    "Supportive care: IV fluids, oxygen, seizure prophylaxis",
    "Isolate patient (droplet precautions)",
    "Notify public health authorities",
    "Close contacts need prophylactic antibiotics"
  ],
  "enhanced_by": "MedGemma",
  "enhanced_date": "2026-01-16"
}
```

## 🚨 Important Notes

1. **API Endpoint:** Make sure `MEDGEMMA_API` is set correctly
2. **Rate Limiting:** Script has 0.5s delay between calls
3. **Checkpoints:** Don't delete `enhancement_checkpoint.json` until complete
4. **Errors:** If a condition fails, it keeps the original data
5. **Review:** Always review enhanced data before deploying

## 📈 Expected Improvements

- **Symptoms:** 3-5 → 8-12 per condition
- **Reasoning:** Generic → Evidence-based pathophysiology
- **Treatment:** Basic → Prioritized, actionable steps
- **Confidence:** Better matching due to richer data

## 🎯 Next Steps After Enhancement

1. Review `clinical_knowledge_medgemma.js`
2. Update `reasoning_engine/index.js` to import new file
3. Test with `node test_reasoning_engine.js`
4. Deploy to production

## 🆘 Troubleshooting

### "Cannot connect to MedGemma API"
- Check if your Kaggle notebook is running
- Verify the endpoint URL is correct
- Test with: `curl $MEDGEMMA_API`

### "Script is slow"
- Normal! 424 conditions × 2 passes takes ~35 minutes
- Check progress in terminal
- Checkpoint saves every 10 conditions

### "Want to start over"
- Delete `enhancement_checkpoint.json`
- Run script again

## 💡 Pro Tips

1. **Run in background:**
   ```bash
   nohup python3 enhance_with_medgemma.py > enhancement.log 2>&1 &
   tail -f enhancement.log
   ```

2. **Test with subset first:**
   Edit script to process only first 10 conditions

3. **Monitor progress:**
   Watch the checkpoint file grow:
   ```bash
   watch -n 5 'wc -l enhancement_checkpoint.json'
   ```

---

**Ready to enhance? Let's make medical AI history! 🚀**
