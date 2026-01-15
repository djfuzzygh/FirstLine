const API_BASE = 'https://heliolatrous-unstooping-rosy.ngrok-free.dev';

// Demo Cases
const DEMO_CASES = [
    {
        name: "Severe Malaria Suspicion",
        data: { age: 3, sex: "Male", symptoms: "High fever, vomiting, lethargy", duration_days: 2, temp_c: 40.2, rr: 45 }
    },
    {
        name: "Mild Respiratory Infection",
        data: { age: 5, sex: "Female", symptoms: "Cough, runny nose", duration_days: 3, temp_c: 37.5, rr: 22 }
    },
    {
        name: "Severe Dehydration",
        data: { age: 1, sex: "Male", symptoms: "Diarrhea, sunken eyes, dry mouth", duration_days: 2, temp_c: 38.0, rr: 52 }
    },
    {
        name: "Pregnancy Complication",
        data: { age: 28, sex: "Female", symptoms: "Severe headache, blurred vision", duration_days: 1, pregnancy_status: true }
    }
];

// State Management
let caseData = {
    intake: null,
    followup_responses: {},
    triage: null,
    auditTrail: []
};

let selectedRole = null;
let uploadedPhoto = null;

// DOM Elements
const views = {
    welcome: document.getElementById('step-welcome'),
    intake: document.getElementById('step-intake'),
    followup: document.getElementById('step-followup'),
    triage: document.getElementById('step-triage'),
    referral: document.getElementById('step-referral')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDemoCases();
    checkSavedCase();
    checkConnection();
    setupEventListeners();
});

function showView(viewName) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[viewName].classList.remove('hidden');
    window.scrollTo(0, 0);
    addAuditEntry(`Navigated to ${viewName} screen`);
}

function addAuditEntry(action) {
    const timestamp = new Date().toLocaleTimeString();
    caseData.auditTrail.push({ timestamp, action });
}

// Demo Cases Loader
function loadDemoCases() {
    const select = document.getElementById('demo-case-select');
    DEMO_CASES.forEach((demo, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = demo.name;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        if (e.target.value === '') return;
        const demo = DEMO_CASES[e.target.value];
        loadDemoCase(demo.data);
    });
}

function loadDemoCase(data) {
    document.getElementById('input-age').value = data.age;
    document.getElementById('input-sex').value = data.sex;
    document.getElementById('input-symptoms').value = data.symptoms;
    document.getElementById('input-duration').value = data.duration_days;
    if (data.temp_c) document.getElementById('input-temp').value = data.temp_c;
    if (data.rr) document.getElementById('input-rr').value = data.rr;
    document.getElementById('input-consent').checked = true;
    validateIntake();
    showView('intake');
    addAuditEntry('Loaded demo case');
}

// Local Storage
function checkSavedCase() {
    const saved = localStorage.getItem('firstline_case');
    if (saved) {
        document.getElementById('btn-resume').style.display = 'block';
        document.getElementById('btn-resume').addEventListener('click', () => {
            caseData = JSON.parse(saved);
            showView('intake');
        });
    }
}

function saveCase() {
    localStorage.setItem('firstline_case', JSON.stringify(caseData));
}

// Connection Status
async function checkConnection() {
    try {
        await fetch(`${API_BASE}/`);
        updateConnectionStatus(true);
    } catch {
        updateConnectionStatus(false);
    }
}

function updateConnectionStatus(isOnline) {
    const badge = document.getElementById('connection-status');
    const dot = badge.querySelector('.status-dot');
    const text = document.getElementById('status-text');

    if (isOnline) {
        badge.classList.remove('offline');
        dot.classList.remove('offline');
        text.textContent = 'Online';
    } else {
        badge.classList.add('offline');
        dot.classList.add('offline');
        text.textContent = 'Offline Mode';
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Role Selection
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedRole = e.target.dataset.role;
            addAuditEntry(`Role selected: ${selectedRole}`);
        });
    });

    // Welcome -> Intake
    document.getElementById('btn-start').addEventListener('click', () => {
        showView('intake');
    });

    // Voice Input
    document.getElementById('btn-voice').addEventListener('click', handleVoiceInput);

    // Photo Upload
    document.getElementById('photo-upload').addEventListener('click', () => {
        document.getElementById('input-photo').click();
    });

    document.getElementById('input-photo').addEventListener('change', handlePhotoUpload);

    // Vital Signs Monitoring
    document.getElementById('input-temp').addEventListener('input', updateTempIndicator);
    document.getElementById('input-rr').addEventListener('input', updateRRIndicator);

    // Intake Validation
    const intakeInputs = ['input-age', 'input-symptoms', 'input-consent'];
    intakeInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', validateIntake);
    });

    // Intake -> Follow-up
    document.getElementById('btn-to-followup').addEventListener('click', handleIntakeSubmit);

    // Follow-up -> Triage
    document.getElementById('btn-to-triage').addEventListener('click', handleTriageCalculation);

    // Reasoning Toggle
    document.getElementById('reasoning-toggle').addEventListener('click', toggleReasoning);

    // Override Triage
    document.getElementById('btn-override').addEventListener('click', handleOverride);

    // Triage -> Referral
    document.getElementById('btn-to-referral').addEventListener('click', handleReferralGeneration);

    // Referral Actions
    document.getElementById('btn-copy').addEventListener('click', copyToClipboard);
    document.getElementById('btn-share').addEventListener('click', shareViaWhatsApp);
    document.getElementById('btn-reset').addEventListener('click', resetCase);
}

// Voice Input (Simulated)
function handleVoiceInput() {
    const btn = document.getElementById('btn-voice');
    const indicator = document.getElementById('voice-indicator');
    const textarea = document.getElementById('input-symptoms');

    if (btn.classList.contains('recording')) {
        // Stop recording
        btn.classList.remove('recording');
        btn.textContent = '🎤 Voice Input';
        indicator.classList.add('hidden');
        addAuditEntry('Voice recording stopped');
    } else {
        // Start recording
        btn.classList.add('recording');
        btn.textContent = '⏹ Stop';
        indicator.classList.remove('hidden');
        addAuditEntry('Voice recording started');

        // Simulate transcription after 3 seconds
        setTimeout(() => {
            const samples = [
                "Patient presents with high fever and chills",
                "Child has been coughing for 3 days with difficulty breathing",
                "Severe diarrhea with signs of dehydration"
            ];
            textarea.value = samples[Math.floor(Math.random() * samples.length)];
            btn.classList.remove('recording');
            btn.textContent = '🎤 Voice Input';
            indicator.classList.add('hidden');
            validateIntake();
            addAuditEntry('Voice transcription completed');
        }, 3000);
    }
}

// Photo Upload
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        uploadedPhoto = event.target.result;
        const preview = document.getElementById('photo-preview');
        const placeholder = document.querySelector('.upload-placeholder');

        placeholder.classList.add('hidden');
        preview.classList.remove('hidden');
        preview.innerHTML = `
            <img src="${uploadedPhoto}" alt="Clinical photo">
            <button onclick="removePhoto()">×</button>
        `;
        addAuditEntry('Clinical photo uploaded');
    };
    reader.readAsDataURL(file);
}

function removePhoto() {
    uploadedPhoto = null;
    document.getElementById('photo-preview').classList.add('hidden');
    document.querySelector('.upload-placeholder').classList.remove('hidden');
    document.getElementById('input-photo').value = '';
}

// Vital Signs Indicators
function updateTempIndicator() {
    const temp = parseFloat(document.getElementById('input-temp').value);
    const indicator = document.getElementById('temp-indicator');

    if (!temp) {
        indicator.className = 'vital-indicator';
        return;
    }

    if (temp < 37.5) {
        indicator.className = 'vital-indicator vital-normal';
    } else if (temp < 39.5) {
        indicator.className = 'vital-indicator vital-warning';
    } else {
        indicator.className = 'vital-indicator vital-danger';
    }
}

function updateRRIndicator() {
    const rr = parseInt(document.getElementById('input-rr').value);
    const indicator = document.getElementById('rr-indicator');

    if (!rr) {
        indicator.className = 'vital-indicator';
        return;
    }

    if (rr < 30) {
        indicator.className = 'vital-indicator vital-normal';
    } else if (rr < 50) {
        indicator.className = 'vital-indicator vital-warning';
    } else {
        indicator.className = 'vital-indicator vital-danger';
    }
}

// Intake Validation
function validateIntake() {
    const age = document.getElementById('input-age').value;
    const symptoms = document.getElementById('input-symptoms').value;
    const consent = document.getElementById('input-consent').checked;
    const btn = document.getElementById('btn-to-followup');
    btn.disabled = !(age && symptoms && consent);
}

// Intake Submit
async function handleIntakeSubmit() {
    const btn = document.getElementById('btn-to-followup');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    caseData.intake = {
        age: parseInt(document.getElementById('input-age').value),
        sex: document.getElementById('input-sex').value,
        symptoms: document.getElementById('input-symptoms').value,
        duration_days: parseInt(document.getElementById('input-duration').value),
        has_consent: document.getElementById('input-consent').checked
    };

    const temp = document.getElementById('input-temp').value;
    const rr = document.getElementById('input-rr').value;
    if (temp) caseData.intake.temp_c = parseFloat(temp);
    if (rr) caseData.intake.rr = parseInt(rr);

    saveCase();
    addAuditEntry('Intake form submitted');

    try {
        const response = await fetch(`${API_BASE}/followup_questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(caseData.intake)
        });

        const questions = await response.json();
        renderFollowUp(questions);
        showView('followup');
    } catch (error) {
        console.error('API Error:', error);
        alert('Could not connect to backend. Ensure FastAPI is running.');
        updateConnectionStatus(false);
    } finally {
        btn.textContent = 'CONTINUE TO FOLLOW-UP';
        btn.disabled = false;
    }
}

// Follow-up Rendering with Text Input Support
function renderFollowUp(questions) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'form-group';
        qDiv.style.animation = `slideUp 0.4s ease-out ${idx * 0.1}s both`;

        // Detect if question is open-ended
        const questionLower = (q.question || '').toLowerCase();
        const hasOptions = q.options && q.options.length > 0;
        const isOpenEnded = !hasOptions ||
            questionLower.includes('describe') ||
            questionLower.includes('explain') ||
            questionLower.includes('how long') ||
            questionLower.includes('when') ||
            questionLower.includes('what') ||
            questionLower.includes('where');

        // Create label
        const label = document.createElement('label');
        label.style.marginTop = '20px';
        label.textContent = `Q${idx + 1}: ${q.question}`;
        qDiv.appendChild(label);

        if (isOpenEnded && !hasOptions) {
            // Text input for open-ended questions
            const textarea = document.createElement('textarea');
            textarea.className = 'followup-text-input';
            textarea.setAttribute('data-q', q.question);
            textarea.placeholder = 'Enter your response...';
            textarea.rows = 3;
            textarea.style.cssText = 'width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; resize: vertical; margin-top: 8px; font-family: inherit;';

            textarea.addEventListener('input', (e) => {
                const q = e.target.getAttribute('data-q');
                const val = e.target.value;

                if (val.trim()) {
                    caseData.followup_responses[q] = val;
                    updateQuestionProgress(questions.length);
                    const preview = val.length > 50 ? val.substring(0, 50) + '...' : val;
                    addAuditEntry(`Answered: ${q} = ${preview}`);
                }
            });

            qDiv.appendChild(textarea);
        } else {
            // Button grid for multiple choice
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';

            const options = q.options || ['Yes', 'No', 'Unsure'];
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'btn q-opt';
                btn.setAttribute('data-q', q.question);
                btn.setAttribute('data-val', opt);
                btn.style.cssText = 'background: white; border: 1px solid #e2e8f0; font-size: 14px; padding: 10px;';
                btn.textContent = opt;

                btn.addEventListener('click', (e) => {
                    const q = e.target.getAttribute('data-q');
                    const val = e.target.getAttribute('data-val');

                    // Reset all buttons
                    optionsGrid.querySelectorAll('.q-opt').forEach(b => {
                        b.style.borderColor = '#e2e8f0';
                        b.style.background = 'white';
                        b.style.color = '#0f172a';
                    });

                    // Highlight selected
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                    e.target.style.color = 'var(--primary-dark)';

                    caseData.followup_responses[q] = val;
                    updateQuestionProgress(questions.length);
                    addAuditEntry(`Answered: ${q} = ${val}`);
                });

                optionsGrid.appendChild(btn);
            });

            qDiv.appendChild(optionsGrid);
        }

        container.appendChild(qDiv);
    });
}

function updateQuestionProgress(total) {
    const answered = Object.keys(caseData.followup_responses).length;
    const progress = (answered / total) * 100;
    document.getElementById('question-progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${answered} of ${total}`;
}

// Triage Calculation
async function handleTriageCalculation() {
    const btn = document.getElementById('btn-to-triage');
    btn.textContent = 'Analysing...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/triage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intake: caseData.intake,
                followup_responses: caseData.followup_responses
            })
        });

        caseData.triage = await response.json();
        renderTriage(caseData.triage);
        showView('triage');
        addAuditEntry(`Triage calculated: ${caseData.triage.risk_tier}`);
    } catch (error) {
        console.error('API Error:', error);
        alert('Triage analysis failed.');
        updateConnectionStatus(false);
    } finally {
        btn.textContent = 'CALCULATE TRIAGE';
        btn.disabled = false;
    }
}

// Triage Rendering
function renderTriage(result) {
    const hero = document.getElementById('triage-hero');
    const label = document.getElementById('triage-risk-tier');
    const uncertaintyFill = document.getElementById('uncertainty-fill');
    const uncertaintyText = document.getElementById('triage-uncertainty');
    const reasoning = document.getElementById('triage-reasoning');
    const dangerBox = document.getElementById('danger-signs-box');
    const dangerList = document.getElementById('danger-signs-list');
    const actionsDiv = document.getElementById('recommended-actions');

    // Reset classes
    hero.className = 'triage-hero';
    if (result.risk_tier === 'RED') hero.classList.add('triage-red');
    else if (result.risk_tier === 'YELLOW') hero.classList.add('triage-yellow');
    else hero.classList.add('triage-green');

    label.textContent = result.risk_tier;

    // Uncertainty meter
    const uncertaintyMap = { 'LOW': 90, 'MEDIUM': 60, 'HIGH': 30 };
    const confidence = uncertaintyMap[result.uncertainty] || 50;
    uncertaintyFill.style.width = `${confidence}%`;
    uncertaintyText.textContent = result.uncertainty;

    reasoning.textContent = result.reasoning;

    // Danger signs
    if (result.danger_signs && result.danger_signs.length > 0) {
        dangerBox.classList.remove('hidden');
        dangerList.innerHTML = result.danger_signs.map(s => `<div class="danger-sign-item">⚠️ ${s}</div>`).join('');
    } else {
        dangerBox.classList.add('hidden');
    }

    // Recommended actions
    if (result.recommended_actions && result.recommended_actions.length > 0) {
        actionsDiv.innerHTML = '<strong style="display: block; margin-bottom: 8px;">Recommended Actions:</strong>' +
            result.recommended_actions.map(a => `<div class="action-item">✓ ${a}</div>`).join('');
    }
}

// Reasoning Toggle
function toggleReasoning() {
    const toggle = document.getElementById('reasoning-toggle');
    const content = document.getElementById('reasoning-content');

    toggle.classList.toggle('active');
    content.classList.toggle('hidden');
}

// Override Triage
function handleOverride() {
    const pin = prompt('Enter supervisor PIN to override:');
    if (pin === '1234') {
        const newTier = prompt('Override triage tier (RED/YELLOW/GREEN):');
        if (['RED', 'YELLOW', 'GREEN'].includes(newTier)) {
            caseData.triage.risk_tier = newTier;
            renderTriage(caseData.triage);
            addAuditEntry(`⚠️ OVERRIDE: Triage changed to ${newTier} by supervisor`);
            alert('Triage overridden successfully');
        }
    } else {
        alert('Invalid PIN');
    }
}

// Referral Generation
async function handleReferralGeneration() {
    const btn = document.getElementById('btn-to-referral');
    btn.textContent = 'Generating...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/referral_summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intake: caseData.intake,
                triage: caseData.triage
            })
        });

        const referral = await response.json();
        document.getElementById('referral-soap').textContent = referral.soap_note;

        // Generate QR Code
        generateQRCode();

        // Render Audit Trail
        renderAuditTrail();

        showView('referral');
        addAuditEntry('Referral summary generated');
    } catch (error) {
        console.error('API Error:', error);
        alert('Referral generation failed.');
    } finally {
        btn.textContent = 'GENERATE REFERRAL NOTE';
        btn.disabled = false;
    }
}

// QR Code Generation
function generateQRCode() {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = '';

    const caseId = `FL-${Date.now()}`;
    const qrData = JSON.stringify({
        caseId,
        tier: caseData.triage.risk_tier,
        timestamp: new Date().toISOString()
    });

    new QRCode(qrContainer, {
        text: qrData,
        width: 150,
        height: 150
    });
}

// Audit Trail
function renderAuditTrail() {
    const auditLog = document.getElementById('audit-log');
    auditLog.innerHTML = caseData.auditTrail.map(entry => `
        <div class="audit-entry">
            <div class="audit-timestamp">${entry.timestamp}</div>
            <div>${entry.action}</div>
        </div>
    `).join('');
}

// Copy to Clipboard
function copyToClipboard() {
    const text = document.getElementById('referral-soap').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy');
        const oldHtml = btn.innerHTML;
        btn.textContent = '✓ COPIED!';
        setTimeout(() => btn.innerHTML = oldHtml, 2000);
        addAuditEntry('SOAP note copied to clipboard');
    });
}

// Share via WhatsApp (Simulated)
function shareViaWhatsApp() {
    const text = document.getElementById('referral-soap').textContent;
    const message = encodeURIComponent(`FirstLine Referral:\n\n${text}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
    addAuditEntry('Shared via WhatsApp');
}

// Reset Case
function resetCase() {
    if (confirm('Start a new case? Current data will be cleared.')) {
        localStorage.removeItem('firstline_case');
        location.reload();
    }
}

// ========== PHASE 3: VISUAL POLISH ==========

// Accessibility Features
let highContrastMode = false;
let largeFontMode = false;
let currentTourStep = 0;

// Initialize Phase 3 Features
document.addEventListener('DOMContentLoaded', () => {
    setupAccessibilityControls();
    setupKeyboardShortcuts();
    checkFirstVisit();
});

// Accessibility Controls
function setupAccessibilityControls() {
    // High Contrast Toggle
    document.getElementById('btn-high-contrast').addEventListener('click', () => {
        highContrastMode = !highContrastMode;
        document.body.classList.toggle('high-contrast', highContrastMode);
        document.getElementById('btn-high-contrast').classList.toggle('active', highContrastMode);
        showToast(highContrastMode ? 'High contrast enabled' : 'High contrast disabled');
        addAuditEntry(`High contrast mode: ${highContrastMode ? 'ON' : 'OFF'}`);
    });

    // Large Font Toggle
    document.getElementById('btn-font-size').addEventListener('click', () => {
        largeFontMode = !largeFontMode;
        document.body.classList.toggle('large-font', largeFontMode);
        document.getElementById('btn-font-size').classList.toggle('active', largeFontMode);
        showToast(largeFontMode ? 'Large font enabled' : 'Large font disabled');
        addAuditEntry(`Large font mode: ${largeFontMode ? 'ON' : 'OFF'}`);
    });

    // Guided Tour Button
    document.getElementById('btn-tour').addEventListener('click', startTour);
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+K: Show shortcuts
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('shortcuts-modal').classList.remove('hidden');
        }

        // Ctrl+H: Toggle high contrast
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            document.getElementById('btn-high-contrast').click();
        }

        // Escape: Close modals
        if (e.key === 'Escape') {
            document.getElementById('shortcuts-modal').classList.add('hidden');
            document.getElementById('tour-overlay').classList.add('hidden');
        }

        // Enter: Submit current form
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'TEXTAREA') {
                const visibleView = Object.keys(views).find(key => !views[key].classList.contains('hidden'));
                if (visibleView === 'intake' && !document.getElementById('btn-to-followup').disabled) {
                    document.getElementById('btn-to-followup').click();
                } else if (visibleView === 'followup') {
                    document.getElementById('btn-to-triage').click();
                } else if (visibleView === 'triage') {
                    document.getElementById('btn-to-referral').click();
                }
            }
        }
    });

    // Close modals on click outside
    document.getElementById('shortcuts-modal').addEventListener('click', (e) => {
        if (e.target.id === 'shortcuts-modal') {
            e.target.classList.add('hidden');
        }
    });

    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('shortcuts-modal').classList.add('hidden');
    });
}

// Guided Tour
const tourSteps = [
    {
        title: "Welcome to FirstLine",
        text: "FirstLine is an AI-powered clinical decision support system for Community Health Workers. Let's explore the key features!",
        target: null
    },
    {
        title: "Demo Cases",
        text: "Start by loading a pre-configured demo case to see the system in action. Try 'Severe Malaria Suspicion' for a complete workflow.",
        target: "#demo-case-select"
    },
    {
        title: "Voice Input",
        text: "Use the voice input button to simulate speech-to-text transcription powered by MedASR.",
        target: "#btn-voice"
    },
    {
        title: "AI-Powered Triage",
        text: "MedGemma analyzes patient data and generates follow-up questions, then calculates a risk tier (RED/YELLOW/GREEN).",
        target: null
    },
    {
        title: "Accessibility Features",
        text: "Use the accessibility controls in the top-right to enable high contrast mode, increase font size, or restart this tour anytime.",
        target: ".accessibility-bar"
    }
];

function checkFirstVisit() {
    const hasVisited = localStorage.getItem('firstline_visited');
    if (!hasVisited) {
        setTimeout(() => {
            startTour();
            localStorage.setItem('firstline_visited', 'true');
        }, 1000);
    }
}

function startTour() {
    currentTourStep = 0;
    document.getElementById('tour-overlay').classList.remove('hidden');
    showTourStep();
}

function showTourStep() {
    const step = tourSteps[currentTourStep];
    document.getElementById('tour-title').textContent = step.title;
    document.getElementById('tour-text').textContent = step.text;
    document.getElementById('tour-step').textContent = `Step ${currentTourStep + 1} of ${tourSteps.length}`;

    // Update button text
    const nextBtn = document.getElementById('tour-next');
    nextBtn.textContent = currentTourStep === tourSteps.length - 1 ? 'Finish' : 'Next';
}

document.getElementById('tour-next').addEventListener('click', () => {
    if (currentTourStep < tourSteps.length - 1) {
        currentTourStep++;
        showTourStep();
    } else {
        document.getElementById('tour-overlay').classList.add('hidden');
        showToast('Tour completed! Explore the app.');
    }
});

document.getElementById('tour-skip').addEventListener('click', () => {
    document.getElementById('tour-overlay').classList.add('hidden');
});

document.getElementById('tour-close').addEventListener('click', () => {
    document.getElementById('tour-overlay').classList.add('hidden');
});

// Loading Spinner
function showLoading(message = 'Processing...') {
    document.getElementById('loading-text').textContent = message;
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-spinner').classList.add('hidden');
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Enhanced API Calls with Loading States
const originalHandleIntakeSubmit = handleIntakeSubmit;
handleIntakeSubmit = async function () {
    showLoading('Generating follow-up questions...');
    try {
        await originalHandleIntakeSubmit.call(this);
        showToast('Follow-up questions generated!');
    } catch (error) {
        showToast('Connection error. Please try again.', 'error');
    } finally {
        hideLoading();
    }
};

const originalHandleTriageCalculation = handleTriageCalculation;
handleTriageCalculation = async function () {
    showLoading('Analyzing case with MedGemma...');
    try {
        await originalHandleTriageCalculation.call(this);
        showToast('Triage analysis complete!');
    } catch (error) {
        showToast('Analysis failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
};

const originalHandleReferralGeneration = handleReferralGeneration;
handleReferralGeneration = async function () {
    showLoading('Generating referral summary...');
    try {
        await originalHandleReferralGeneration.call(this);
        showToast('Referral summary ready!');
    } catch (error) {
        showToast('Generation failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
};

// Enhanced Copy with Toast
const originalCopyToClipboard = copyToClipboard;
copyToClipboard = function () {
    originalCopyToClipboard.call(this);
    showToast('SOAP note copied to clipboard!');
};

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Add ARIA announcements to key actions
const originalShowView = showView;
showView = function (viewName) {
    originalShowView.call(this, viewName);
    const viewTitles = {
        welcome: 'Welcome screen',
        intake: 'Patient intake form',
        followup: 'Follow-up questions',
        triage: 'Triage results',
        referral: 'Referral summary'
    };
    announceToScreenReader(`Navigated to ${viewTitles[viewName]}`);
};

console.log('✅ Phase 3 features loaded: Accessibility, Guided Tour, Loading States, Toast Notifications');
