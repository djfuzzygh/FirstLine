# FirstLine - Bug Fixes & Enhancements

## 🐛 Issues Identified

### 1. Follow-up Questions - Text Input Support
**Problem**: All follow-up questions render as buttons, but some questions are open-ended and need text inputs.

**Examples of Open-Ended Questions**:
- "Describe the rash"
- "How long has the fever lasted?"
- "When did symptoms start?"
- "What medications have been taken?"

**Solution**: Implement intelligent question type detection
```javascript
// Detect open-ended questions by:
1. No options array provided
2. Question contains keywords: "describe", "explain", "how long", "when", "what", "where"
3. Render <textarea> instead of buttons
4. Capture text input in followup_responses
```

**Status**: ✅ PATCH CREATED - `PATCH_followup_fix.js`

---

### 2. Referral Summary Not Working
**Problem**: Referral generation fails or returns empty/error responses.

**Possible Causes**:
1. Backend model not parsing JSON correctly
2. Prompt format issues
3. Network/CORS errors
4. Model response timeout

**Debug Steps**:
1. Check browser console for errors
2. Check backend terminal for raw AI responses
3. Verify API endpoint `/referral_summary` is reachable
4. Test with mock mode first

**Quick Fix**: Add better error logging
```javascript
// In handleReferralGeneration
console.log('Sending to API:', { intake: caseData.intake, triage: caseData.triage });

// After response
console.log('Received from API:', referral);
```

**Status**: 🔍 NEEDS DEBUGGING

---

### 3. General Feedback Issues
**Problem**: User doesn't see clear feedback during operations.

**Enhancements Needed**:
1. ✅ Loading spinners (DONE in Phase 3)
2. ✅ Toast notifications (DONE in Phase 3)
3. ❌ Progress indicators during model inference
4. ❌ Retry buttons on errors
5. ❌ Better error messages

---

## 🚀 Additional Features to Add

### High Priority

#### 1. **Smart Question Validation**
- Require all questions to be answered before proceeding
- Show "X of Y questions answered" counter
- Disable "Calculate Triage" until complete

#### 2. **Retry Mechanism**
- Add "Retry" button on API failures
- Store last request for easy retry
- Show connection status before retry

#### 3. **Case Summary Preview**
- Show mini-summary before generating referral
- "Patient: 5yo Male, Fever 3 days, RED tier"
- Confirm before generating

#### 4. **Export Options**
- Download SOAP note as .txt file
- Print-friendly version
- Email/SMS integration (simulated)

#### 5. **Recent Cases**
- Show last 5 cases in localStorage
- Quick access to review past decisions
- "Load Previous Case" option

### Medium Priority

#### 6. **Vital Signs Graphs**
- Visual chart for temperature trend
- Respiratory rate visualization
- Color-coded zones

#### 7. **Multi-Language Support**
- English + Local languages (Twi, Ga, Ewe)
- Language selector in header
- Translated UI strings

#### 8. **Offline Queue**
- Show pending cases when offline
- Auto-sync when connection restored
- Sync status indicator

#### 9. **Photo Analysis Feedback**
- Simulated MedSigLIP analysis
- "Analyzing image..." spinner
- "Detected: Rash, possible measles" feedback

#### 10. **Voice Playback**
- Play back recorded audio (simulated)
- Edit transcription
- Re-record option

### Low Priority

#### 11. **Dark Mode**
- Auto-detect system preference
- Manual toggle
- Saves preference

#### 12. **Analytics Dashboard**
- Cases per day
- Triage tier distribution
- Most common symptoms

#### 13. **Supervisor Dashboard**
- Review all cases
- Override history
- Performance metrics

---

## 🔧 Implementation Plan

### Immediate Fixes (Next 30 min)

1. **Fix Follow-up Questions**
   - Apply PATCH_followup_fix.js
   - Test with demo cases
   - Verify text inputs work

2. **Debug Referral Summary**
   - Add console.log statements
   - Check backend logs
   - Test API endpoint directly
   - Fix JSON parsing if needed

3. **Add Question Validation**
   - Count answered questions
   - Disable button until complete
   - Show progress

### Quick Wins (Next 1 hour)

4. **Add Retry Buttons**
   - On all API failures
   - Store last request
   - Show error details

5. **Case Summary Preview**
   - Before referral generation
   - Confirmation dialog
   - Edit option

6. **Export SOAP Note**
   - Download as .txt
   - Copy button (already done)
   - Print button

### Nice-to-Haves (If time permits)

7. **Recent Cases List**
8. **Vital Signs Graphs**
9. **Photo Analysis Feedback**
10. **Voice Playback**

---

## 📝 Testing Checklist

### Follow-up Questions
- [ ] Load demo case
- [ ] Verify text inputs appear for open-ended questions
- [ ] Verify buttons appear for multiple choice
- [ ] Test typing in text inputs
- [ ] Verify responses are captured
- [ ] Check progress counter updates

### Referral Summary
- [ ] Complete full workflow
- [ ] Check browser console for errors
- [ ] Check backend terminal for logs
- [ ] Verify SOAP note appears
- [ ] Test copy button
- [ ] Test QR code generation

### Error Handling
- [ ] Stop backend, test offline behavior
- [ ] Verify error messages appear
- [ ] Test retry functionality
- [ ] Check toast notifications

---

## 🎯 Priority Order

1. **CRITICAL**: Fix follow-up text inputs
2. **CRITICAL**: Fix referral summary generation
3. **HIGH**: Add question validation
4. **HIGH**: Add retry buttons
5. **MEDIUM**: Case summary preview
6. **MEDIUM**: Export options
7. **LOW**: Recent cases
8. **LOW**: Graphs and analytics

---

## 💡 Quick Implementation Guide

### Fix 1: Follow-up Text Inputs

```javascript
// In main.js, find renderFollowUp and replace with:
function renderFollowUp(questions) {
    // ... existing code ...
    
    // Check if open-ended
    const isOpenEnded = !q.options || q.options.length === 0;
    
    if (isOpenEnded) {
        // Render textarea
        const textarea = document.createElement('textarea');
        // ... setup ...
    } else {
        // Render buttons (existing code)
    }
}
```

### Fix 2: Debug Referral

```javascript
// Add to handleReferralGeneration
try {
    console.log('REQUEST:', { intake: caseData.intake, triage: caseData.triage });
    const response = await fetch(`${API_BASE}/referral_summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            intake: caseData.intake,
            triage: caseData.triage
        })
    });
    
    const referral = await response.json();
    console.log('RESPONSE:', referral);
    
    if (!referral.soap_note) {
        throw new Error('No SOAP note in response');
    }
    
    // ... rest of code ...
} catch (error) {
    console.error('FULL ERROR:', error);
    alert(`Referral failed: ${error.message}`);
}
```

### Fix 3: Question Validation

```javascript
// Add before "Calculate Triage" button
const answeredCount = Object.keys(caseData.followup_responses).length;
const totalQuestions = questions.length;
const allAnswered = answeredCount === totalQuestions;

document.getElementById('btn-to-triage').disabled = !allAnswered;
document.getElementById('progress-text').textContent = 
    `${answeredCount} of ${totalQuestions} questions answered`;
```

---

## 🚀 Ready to Implement?

Let me know which fixes you want me to apply first!

**Recommended Order**:
1. Fix follow-up text inputs (5 min)
2. Debug referral summary (10 min)
3. Add question validation (5 min)
4. Add retry buttons (10 min)

Total: ~30 minutes to fix all critical issues.
