# 🔧 How to Access Backend & Apply Fixes

## 📍 Backend Access

### Option 1: Swagger UI (Recommended)
**URL**: http://localhost:8000/docs

This gives you an interactive API documentation where you can:
- See all available endpoints
- Test API calls directly
- View request/response schemas
- Try out different inputs

**How to use**:
1. Open http://localhost:8000/docs in your browser
2. Click on any endpoint (e.g., `/triage`)
3. Click "Try it out"
4. Enter test data
5. Click "Execute"
6. See the response

### Option 2: Terminal Logs
The backend is currently running in your terminal. To see logs:

**Current Command**:
```bash
cd /Users/isaacfuseini/Documents/Applications/FirstLine/backend
python3 main.py
```

**What you'll see**:
- `📦 Loading google/medgemma-1.5-4b-it...` - Model loading
- `✅ Model loaded successfully.` - Ready to use
- `INFO: Uvicorn running on http://0.0.0.0:8000` - Server running
- `🤖 RAW AI RESPONSE:` - Model outputs (when in actual mode)
- `❌ Triage Parsing Error:` - If JSON parsing fails

### Option 3: Direct API Testing
Use `curl` to test endpoints:

```bash
# Test if backend is running
curl http://localhost:8000/

# Test follow-up questions
curl -X POST http://localhost:8000/followup_questions \
  -H "Content-Type: application/json" \
  -d '{
    "age": 5,
    "sex": "Male",
    "symptoms": "Fever and cough",
    "duration_days": 3,
    "has_consent": true
  }'

# Test triage
curl -X POST http://localhost:8000/triage \
  -H "Content-Type: application/json" \
  -d '{
    "intake": {
      "age": 5,
      "sex": "Male",
      "symptoms": "Fever and cough",
      "duration_days": 3,
      "has_consent": true
    },
    "followup_responses": {
      "Has the patient had a stiff neck?": "No",
      "Is there a rash?": "No"
    }
  }'
```

---

## 🔧 Applying the Fixes

### Fix 1: Follow-up Text Inputs

**Method A: Manual Copy-Paste (Easiest)**

1. Open `web_app/main.js` in your editor
2. Find the `renderFollowUp` function (around line 347)
3. Select the entire function (from `function renderFollowUp(questions) {` to the closing `}`)
4. Delete it
5. Copy the fixed version from `/tmp/fix_followup.js`
6. Paste it in the same location
7. Save the file
8. Refresh your browser (http://localhost:5173/)

**Method B: Using sed (Command Line)**

```bash
cd /Users/isaacfuseini/Documents/Applications/FirstLine

# Backup first
cp web_app/main.js web_app/main.js.backup

# Apply the fix (this replaces lines 347-396)
sed -i '' '347,396d' web_app/main.js
sed -i '' '346r /tmp/fix_followup.js' web_app/main.js

echo "✅ Fix applied! Refresh your browser."
```

**Method C: I'll create a new fixed file**

Let me know and I'll generate a complete new `main.js` with all fixes.

---

### Fix 2: Debug Referral Summary

**Add logging to see what's happening**:

1. Open `web_app/main.js`
2. Find the `handleReferralGeneration` function (around line 470)
3. Add these console.log statements:

```javascript
async function handleReferralGeneration() {
    const btn = document.getElementById('btn-to-referral');
    btn.textContent = 'Generating...';
    btn.disabled = true;

    // ADD THIS
    console.log('📤 Sending to API:', {
        intake: caseData.intake,
        triage: caseData.triage
    });

    try {
        const response = await fetch(`${API_BASE}/referral_summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intake: caseData.intake,
                triage: caseData.triage
            })
        });
        
        // ADD THIS
        console.log('📥 Response status:', response.status);
        
        const referral = await response.json();
        
        // ADD THIS
        console.log('📥 Received from API:', referral);
        
        if (!referral.soap_note) {
            throw new Error('No SOAP note in response');
        }
        
        document.getElementById('referral-soap').textContent = referral.soap_note;
        
        // Generate QR Code
        generateQRCode();
        
        // Render Audit Trail
        renderAuditTrail();
        
        showView('referral');
        addAuditEntry('Referral summary generated');
    } catch (error) {
        // ADD THIS
        console.error('❌ FULL ERROR:', error);
        console.error('Error details:', error.message, error.stack);
        
        alert(`Referral generation failed: ${error.message}`);
    } finally {
        btn.textContent = 'GENERATE REFERRAL NOTE';
        btn.disabled = false;
    }
}
```

4. Save and refresh
5. Try generating a referral
6. Open browser console (F12) and check the logs

---

## 🧪 Testing the Fixes

### Test Follow-up Text Inputs

1. Open http://localhost:5173/
2. Load "Severe Malaria Suspicion" demo case
3. Click "CONTINUE TO FOLLOW-UP"
4. **Expected**: You should see:
   - Some questions with buttons (Yes/No/Unsure)
   - Some questions with text boxes (for open-ended questions)
5. Try typing in a text box
6. Verify the progress counter updates

### Test Referral Summary

1. Complete a full workflow (intake → follow-up → triage)
2. Click "GENERATE REFERRAL NOTE"
3. Open browser console (F12 → Console tab)
4. Look for:
   - `📤 Sending to API:` - What we're sending
   - `📥 Response status:` - HTTP status code
   - `📥 Received from API:` - What we got back
   - `❌ FULL ERROR:` - If something failed

5. Check backend terminal for:
   - `🤖 RAW AI RESPONSE:` - What the model generated
   - `❌ Referral Parsing Error:` - If JSON parsing failed

---

## 🚨 Common Issues & Solutions

### Issue: "Could not connect to backend"
**Solution**:
```bash
# Check if backend is running
curl http://localhost:8000/

# If not, restart it
cd /Users/isaacfuseini/Documents/Applications/FirstLine/backend
python3 main.py
```

### Issue: "Referral summary is empty"
**Causes**:
1. Model is in mock mode → Check `.env` file
2. JSON parsing error → Check backend logs for "Parsing Error"
3. Model timeout → Increase `max_new_tokens` in agent.py

**Solution**:
```bash
# Check current mode
cat backend/.env | grep FIRSTLINE_MODE

# If it says "mock", the model isn't being used
# If it says "actual", check backend logs for errors
```

### Issue: "Follow-up questions still show buttons"
**Solution**:
- The fix wasn't applied correctly
- Make sure you replaced the entire `renderFollowUp` function
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📝 Quick Command Reference

```bash
# Navigate to project
cd /Users/isaacfuseini/Documents/Applications/FirstLine

# Start backend
cd backend && python3 main.py

# Start frontend (in new terminal)
cd web_app && npm run dev

# View backend logs
# (Just look at the terminal where you ran python3 main.py)

# Test backend API
curl http://localhost:8000/docs

# Apply follow-up fix
cp web_app/main.js web_app/main.js.backup
# Then manually edit or use sed command above

# Check what's running
lsof -ti :8000  # Backend
lsof -ti :5173  # Frontend
```

---

## ✅ Verification Checklist

After applying fixes:

- [ ] Backend is running (http://localhost:8000/docs loads)
- [ ] Frontend is running (http://localhost:5173/ loads)
- [ ] Demo cases load correctly
- [ ] Follow-up questions show text inputs for open-ended questions
- [ ] Follow-up questions show buttons for multiple choice
- [ ] Progress counter updates when answering
- [ ] Triage calculation works
- [ ] Referral generation works (or shows clear error in console)
- [ ] Browser console shows detailed logs
- [ ] Backend terminal shows AI responses

---

## 🆘 Need Help?

If you're stuck:
1. Share the browser console errors
2. Share the backend terminal output
3. Tell me which step failed
4. I'll help debug!

**Backend URL**: http://localhost:8000/docs
**Frontend URL**: http://localhost:5173/
**Logs**: Check the terminal where you ran `python3 main.py`
