/**
 * FirstLine - Enhanced Main Application Logic
 * Streamlined version with improved UX, error handling, and data collection
 */

import { CLINICAL_KNOWLEDGE_BASE } from './clinical_knowledge_medgemma.js';
import ClinicalReasoningEngine from './reasoning_engine/index.js';

// ========== Configuration ==========
const CONFIG = {
    API_BASE: window.MEDGEMMA_API || 'https://heliolatrous-unstooping-rosy.ngrok-free.dev',
    OFFLINE_MODE: true,
    AUTO_SAVE: true,
    SAVE_INTERVAL: 30000, // 30 seconds
};

// ========== State Management ==========
const state = {
    currentStep: 1,
    totalSteps: 6,
    role: null,
    intakeData: {
        // Required
        age: null,
        sex: null,
        symptoms: [],
        symptomText: '',
        duration_days: null,

        // Vital signs (optional)
        vitals: {
            temp_c: null,
            rr: null,
            hr: null,
            bp_systolic: null,
            bp_diastolic: null,
        },

        // Context (optional)
        pregnancy_status: false,
        chronic_conditions: [],
        medications: [],
        allergies: [],

        // Metadata
        timestamp: null,
        mode: 'offline',
    },
    triageResult: null,
    errors: [],
    analysisMode: 'hybrid', // 'hybrid' (Cloud+Edge) or 'offline' (Edge Only)
    isOnline: navigator.onLine,
};

// ========== Reasoning Engine ==========
let reasoningEngine = null;

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 FirstLine Enhanced - Initializing...');

    try {
        // Initialize reasoning engine
        await initializeReasoningEngine();

        // Setup event listeners
        setupEventListeners();

        // Check connection status
        checkConnectionStatus();

        // Load saved session if exists
        loadSavedSession();

        console.log('✅ Initialization complete');
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        showError('Failed to initialize application. Please refresh the page.');
    }
});

// ========== Reasoning Engine Initialization ==========
async function initializeReasoningEngine() {
    try {
        console.log('🧠 Initializing Clinical Reasoning Engine...');
        reasoningEngine = new ClinicalReasoningEngine();
        await reasoningEngine.initialize();
        console.log('✅ Reasoning engine ready');
        state.intakeData.mode = 'offline'; // Default to offline
    } catch (error) {
        console.error('⚠️ Reasoning engine initialization failed:', error);
        // Continue with basic functionality
        state.intakeData.mode = 'basic';
    }
}

// ========== Event Listeners ==========
function setupEventListeners() {
    // Role selection
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.role = e.target.dataset.role;
            console.log(`Selected role: ${state.role}`);
        });
    });

    // Symptom chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            toggleSymptomChip(e.target);
        });
    });

    // Vital signs sliders
    setupVitalSignsListeners();

    // Form validation
    setupFormValidation();

    // Online/offline detection
    window.addEventListener('online', () => {
        state.isOnline = true;
        updateConnectionStatus();
    });

    window.addEventListener('offline', () => {
        state.isOnline = false;
        updateConnectionStatus();
    });

    // Auto-save
    if (CONFIG.AUTO_SAVE) {
        setInterval(saveSession, CONFIG.SAVE_INTERVAL);
    }
}

// ========== Wizard Navigation ==========
function nextStep(stepNumber) {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
        return;
    }

    // Hide current step
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show next step
    const nextStepEl = document.getElementById(`step-${getStepName(stepNumber)}`);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
        state.currentStep = stepNumber;
        updateProgress();

        // Show progress container if not on welcome
        if (stepNumber > 1) {
            document.getElementById('progress-container').style.display = 'block';
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function previousStep(stepNumber) {
    nextStep(stepNumber); // Same logic, just going backwards
}

function getStepName(stepNumber) {
    const stepNames = {
        1: 'welcome',
        2: 'basic-info',
        3: 'symptoms',
        4: 'vitals',
        5: 'analyzing',
        6: 'results'
    };
    return stepNames[stepNumber] || 'welcome';
}

function updateProgress() {
    // Update progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNum = index + 1;
        if (stepNum < state.currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNum === state.currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    // Update progress bar
    const progress = ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

// ========== Validation ==========
function validateCurrentStep() {
    state.errors = [];

    switch (state.currentStep) {
        case 1: // Welcome
            return true; // No validation needed

        case 2: // Basic Info
            return validateBasicInfo();

        case 3: // Symptoms
            return validateSymptoms();

        case 4: // Vitals
            return true; // Vitals are optional

        default:
            return true;
    }
}

function validateBasicInfo() {
    const age = parseInt(document.getElementById('input-age').value);
    const sex = document.querySelector('input[name="sex"]:checked');

    if (!age || age < 0 || age > 120) {
        state.errors.push({
            field: 'age',
            message: 'Please enter a valid age (0-120 years)'
        });
    }

    if (!sex) {
        state.errors.push({
            field: 'sex',
            message: 'Please select a sex'
        });
    }

    if (state.errors.length > 0) {
        showValidationErrors();
        return false;
    }

    // Save to state
    state.intakeData.age = age;
    state.intakeData.sex = sex.value;
    state.intakeData.pregnancy_status =
        document.querySelector('input[name="pregnancy"]:checked')?.value === 'yes';

    // Collect optional medical history
    const chronicConditions = document.getElementById('input-chronic-conditions')?.value.trim();
    const medications = document.getElementById('input-medications')?.value.trim();
    const allergies = document.getElementById('input-allergies')?.value.trim();

    if (chronicConditions) {
        state.intakeData.chronic_conditions = chronicConditions.split(',').map(c => c.trim()).filter(c => c);
    }
    if (medications) {
        state.intakeData.medications = medications.split(',').map(m => m.trim()).filter(m => m);
    }
    if (allergies) {
        state.intakeData.allergies = allergies.split(',').map(a => a.trim()).filter(a => a);
    }

    return true;
}

function validateSymptoms() {
    // Get selected chips
    const selectedChips = document.querySelectorAll('.chip.selected');
    state.intakeData.symptoms = Array.from(selectedChips).map(chip =>
        chip.dataset.symptom
    );

    // Get free text
    state.intakeData.symptomText = document.getElementById('input-symptoms').value.trim();

    // Get duration
    const duration = document.getElementById('input-duration').value;
    state.intakeData.duration_days = duration ? parseFloat(duration) : null;

    // Validate: must have at least one symptom (chip or text)
    if (state.intakeData.symptoms.length === 0 && state.intakeData.symptomText.length < 3) {
        state.errors.push({
            field: 'symptoms',
            message: 'Please select or describe at least one symptom'
        });
        showValidationErrors();
        return false;
    }

    return true;
}

function showValidationErrors() {
    // Create error message
    const errorMessages = state.errors.map(e => e.message).join('\n');

    // Show alert (could be replaced with a nicer modal)
    alert('Please fix the following errors:\n\n' + errorMessages);

    // Highlight error fields
    state.errors.forEach(error => {
        const field = document.getElementById(`input-${error.field}`);
        if (field) {
            field.classList.add('error');
            field.focus();
        }
    });
}

function setupFormValidation() {
    // Remove error class on input
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.classList.remove('error');
        });
    });
}

// ========== Symptom Chips ==========
function toggleSymptomChip(chip) {
    chip.classList.toggle('selected');

    // Update state
    const symptom = chip.dataset.symptom;
    if (chip.classList.contains('selected')) {
        if (!state.intakeData.symptoms.includes(symptom)) {
            state.intakeData.symptoms.push(symptom);
        }
    } else {
        state.intakeData.symptoms = state.intakeData.symptoms.filter(s => s !== symptom);
    }
}

// ========== Vital Signs ==========
function setupVitalSignsListeners() {
    // Temperature
    const tempInput = document.getElementById('input-temp');
    if (tempInput) {
        tempInput.addEventListener('input', (e) => {
            updateVitalDisplay('temp', e.target.value);
        });
    }

    // Respiratory Rate
    const rrInput = document.getElementById('input-rr');
    if (rrInput) {
        rrInput.addEventListener('input', (e) => {
            updateVitalDisplay('rr', e.target.value);
        });
    }

    // Heart Rate
    const hrInput = document.getElementById('input-hr');
    if (hrInput) {
        hrInput.addEventListener('input', (e) => {
            updateVitalDisplay('hr', e.target.value);
        });
    }
}

function updateVitalDisplay(type, value) {
    const output = document.getElementById(`output-${type}`);
    const indicator = document.getElementById(`indicator-${type}`);

    if (!output || !indicator) return;

    let displayValue, status, statusClass;

    switch (type) {
        case 'temp':
            displayValue = `${parseFloat(value).toFixed(1)}°C`;
            if (value < 36.0) {
                status = 'Low';
                statusClass = 'critical';
            } else if (value > 38.0) {
                status = 'High';
                statusClass = value > 39.0 ? 'critical' : 'high';
            } else {
                status = 'Normal';
                statusClass = 'normal';
            }
            state.intakeData.vitals.temp_c = parseFloat(value);
            break;

        case 'rr':
            displayValue = `${value}/min`;
            if (value < 12 || value > 25) {
                status = 'Abnormal';
                statusClass = value < 10 || value > 30 ? 'critical' : 'high';
            } else {
                status = 'Normal';
                statusClass = 'normal';
            }
            state.intakeData.vitals.rr = parseInt(value);
            break;

        case 'hr':
            displayValue = `${value} bpm`;
            if (value < 60 || value > 100) {
                status = 'Abnormal';
                statusClass = value < 50 || value > 120 ? 'critical' : 'high';
            } else {
                status = 'Normal';
                statusClass = 'normal';
            }
            state.intakeData.vitals.hr = parseInt(value);
            break;
    }

    output.textContent = displayValue;
    indicator.textContent = status;
    indicator.className = `vital-indicator ${statusClass}`;
}

// ========== Analysis ==========
async function analyzePatient() {
    // Collect blood pressure if provided
    const bpSys = document.getElementById('input-bp-sys')?.value;
    const bpDia = document.getElementById('input-bp-dia')?.value;
    if (bpSys && bpDia) {
        state.intakeData.vitals.bp_systolic = parseInt(bpSys);
        state.intakeData.vitals.bp_diastolic = parseInt(bpDia);
    }

    // Add timestamp
    state.intakeData.timestamp = new Date().toISOString();

    // Move to analyzing step
    nextStep(5);

    // Start analysis
    try {
        await performAnalysis();
    } catch (error) {
        console.error('Analysis failed:', error);
        showError('Analysis failed. Please try again.');
    }
}

async function performAnalysis() {
    // Update progress
    updateAnalysisProgress(10, 'Preparing data...');

    await sleep(300);

    // Combine symptoms
    const allSymptoms = [
        ...state.intakeData.symptoms,
        state.intakeData.symptomText
    ].filter(s => s).join(', ');

    // Prepare input for reasoning engine
    const input = {
        age: state.intakeData.age,
        sex: state.intakeData.sex,
        symptoms: allSymptoms,
        duration_days: state.intakeData.duration_days,
        temp_c: state.intakeData.vitals.temp_c,
        rr: state.intakeData.vitals.rr,
        hr: state.intakeData.vitals.hr,
        pregnancy_status: state.intakeData.pregnancy_status,
        chronic_conditions: state.intakeData.chronic_conditions,
        medications: state.intakeData.medications,
        allergies: state.intakeData.allergies
    };

    let result = null;

    // --- PHASE 1: Try Cloud AI (If in Hybrid mode) ---
    if (state.analysisMode === 'hybrid' && state.isOnline) {
        updateAnalysisProgress(30, 'Connecting to Cloud AI...');
        try {
            const response = await fetch(`${CONFIG.API_BASE}/triage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ intake: input }),
                signal: AbortSignal.timeout(10000) // 10s timeout
            });

            if (response.ok) {
                result = await response.json();
                result.source = 'cloud';
                updateAnalysisProgress(70, 'Received Cloud AI assessment...');
            }
        } catch (error) {
            console.warn('Cloud AI failed, falling back to Local Edge...', error);
        }
    }

    // --- PHASE 2: Local Edge Analysis (If Cloud failed or in Offline mode) ---
    if (!result) {
        updateAnalysisProgress(50, 'Running Local Edge reasoning...');
        try {
            if (reasoningEngine) {
                result = await reasoningEngine.analyze(input);
                result.source = 'edge';
            } else {
                result = performBasicTriage(input);
                result.source = 'basic';
            }
        } catch (error) {
            console.error('Local analysis failed:', error);
            result = performBasicTriage(input);
        }
    }

    // Finalize
    state.triageResult = result;
    updateAnalysisProgress(100, 'Analysis complete!');
    await sleep(400);

    // Show results
    displayResults();
    nextStep(6);
}

function toggleAnalysisMode() {
    const hybridBtn = document.getElementById('mode-hybrid');
    const offlineBtn = document.getElementById('mode-offline');

    if (state.analysisMode === 'hybrid') {
        state.analysisMode = 'offline';
        hybridBtn?.classList.remove('active');
        offlineBtn?.classList.add('active');
        console.log('Mode switched to: Edge Only (Offline)');
    } else {
        state.analysisMode = 'hybrid';
        hybridBtn?.classList.add('active');
        offlineBtn?.classList.remove('active');
        console.log('Mode switched to: Cloud AI (Hybrid)');
    }
}

function updateAnalysisProgress(percent, status) {
    const progressBar = document.getElementById('analysis-progress');
    const statusText = document.getElementById('analysis-status');

    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }

    if (statusText) {
        statusText.textContent = status;
    }
}

function performBasicTriage(input) {
    // Very basic fallback triage
    const hasFever = input.temp_c && input.temp_c > 38.0;
    const hasHighRR = input.rr && input.rr > 25;
    const isYoung = input.age < 5;

    let tier = 'GREEN';
    let diagnosis = 'General illness';
    let confidence = 50;

    if ((hasFever && hasHighRR) || (isYoung && hasFever)) {
        tier = 'RED';
        diagnosis = 'Possible serious infection';
        confidence = 70;
    } else if (hasFever || hasHighRR) {
        tier = 'YELLOW';
        diagnosis = 'Possible infection';
        confidence = 60;
    }

    return {
        diagnosis,
        tier,
        confidence,
        reasoning: `Based on age ${input.age}, symptoms: ${input.symptoms}`,
        actions: [
            tier === 'RED' ? '🚨 Seek immediate medical attention' : 'Monitor symptoms',
            'Stay hydrated',
            'Rest'
        ],
        dangerSigns: tier === 'RED' ? 1 : 0
    };
}

// ========== Results Display ==========
function displayResults() {
    const container = document.getElementById('results-container');
    if (!container || !state.triageResult) return;

    const result = state.triageResult;

    // Determine tier class and icon
    const tierClass = `tier-${result.tier.toLowerCase()}`;
    const tierIcon = result.tier === 'RED' ? '🚨' :
        result.tier === 'YELLOW' ? '⚠️' : '✅';

    // Build HTML
    container.innerHTML = `
        <div class="result-card">
            <!-- Tier Header -->
            <div class="tier-header">
                <div class="tier-badge ${tierClass}">
                    <span class="tier-icon">${tierIcon}</span>
                    <span class="tier-text">${result.tier} - ${getTierLabel(result.tier)}</span>
                </div>
                <div class="source-badge">
                    ${result.source === 'cloud' ? '✨ Cloud AI' : '📡 Local Edge'}
                </div>
            </div>
            
            <!-- Diagnosis -->
            <div class="diagnosis">
                <h2>${result.diagnosis}</h2>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${result.confidence}%">
                        ${result.confidence}% confidence
                    </div>
                </div>
            </div>
            
            <!-- Matched Symptoms -->
            ${result.matchedSymptoms ? `
                <div class="symptoms-section">
                    <h3>Your symptoms match:</h3>
                    <ul class="symptom-list">
                        ${result.matchedSymptoms.map(s => `<li class="matched">${s}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <!-- Danger Signs -->
            ${result.dangerSigns > 0 ? `
                <div class="danger-alert">
                    <h3>⚠️ Warning Signs Detected</h3>
                    <p>This patient shows ${result.dangerSigns} danger sign(s) requiring immediate attention.</p>
                </div>
            ` : ''}
            
            <!-- Reasoning -->
            <div class="symptoms-section">
                <h3>Clinical Reasoning</h3>
                <p>${result.reasoning}</p>
            </div>
            
            <!-- Actions -->
            <div class="actions-section">
                <h3>Recommended Actions</h3>
                ${result.actions.map((action, index) => {
        const priority = index === 0 ? 'urgent' : index < 3 ? 'high' : 'medium';
        const icon = priority === 'urgent' ? '🚨' :
            priority === 'high' ? '💊' : '📋';
        return `
                        <div class="action ${priority}">
                            <span class="action-icon">${icon}</span>
                            <span class="action-text">${action}</span>
                        </div>
                    `;
    }).join('')}
            </div>
            
            <!-- Next Steps -->
            <div class="wizard-nav" style="margin-top: 2rem;">
                <button class="btn btn-secondary" onclick="window.print()">
                    🖨️ Print Results
                </button>
                <button class="btn btn-primary" onclick="startNewAssessment()">
                    Start New Assessment
                </button>
            </div>
        </div>
    `;
}

function getTierLabel(tier) {
    const labels = {
        'RED': 'EMERGENCY',
        'YELLOW': 'URGENT',
        'GREEN': 'ROUTINE'
    };
    return labels[tier] || tier;
}

// ========== Utility Functions ==========
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkConnectionStatus() {
    updateConnectionStatus();
}

function updateConnectionStatus() {
    const statusBadge = document.getElementById('connection-status');
    const statusText = document.getElementById('status-text');
    const statusDot = statusBadge?.querySelector('.status-dot');

    if (state.isOnline) {
        statusText.textContent = 'Online';
        statusDot?.classList.add('online');
        statusDot?.classList.remove('offline');
    } else {
        statusText.textContent = 'Offline';
        statusDot?.classList.add('offline');
        statusDot?.classList.remove('online');
    }
}

function showError(message) {
    alert(message); // Could be replaced with a nicer modal
}

function saveSession() {
    try {
        localStorage.setItem('firstline_session', JSON.stringify({
            step: state.currentStep,
            intakeData: state.intakeData,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Failed to save session:', error);
    }
}

function loadSavedSession() {
    try {
        const saved = localStorage.getItem('firstline_session');
        if (saved) {
            const session = JSON.parse(saved);
            // Check if session is recent (within 24 hours)
            const age = Date.now() - new Date(session.timestamp).getTime();
            if (age < 24 * 60 * 60 * 1000) {
                // Offer to resume
                if (confirm('Resume previous session?')) {
                    state.intakeData = session.intakeData;
                    nextStep(session.step);
                }
            }
        }
    } catch (error) {
        console.error('Failed to load session:', error);
    }
}

function startNewAssessment() {
    // Clear state
    state.currentStep = 1;
    state.intakeData = {
        age: null,
        sex: null,
        symptoms: [],
        symptomText: '',
        duration_days: null,
        vitals: {
            temp_c: null,
            rr: null,
            hr: null,
            bp_systolic: null,
            bp_diastolic: null,
        },
        pregnancy_status: false,
        chronic_conditions: [],
        medications: [],
        allergies: [],
        timestamp: null,
        mode: 'offline',
    };
    state.triageResult = null;
    state.errors = [];

    // Clear form
    document.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.type === 'checkbox' || el.type === 'radio') {
            el.checked = false;
        } else {
            el.value = '';
        }
    });

    // Clear selected chips
    document.querySelectorAll('.chip.selected').forEach(chip => {
        chip.classList.remove('selected');
    });

    // Go to welcome
    nextStep(1);

    // Clear saved session
    localStorage.removeItem('firstline_session');
}

// ========== Global Functions (for onclick handlers) ==========
window.nextStep = nextStep;
window.previousStep = previousStep;
window.analyzePatient = analyzePatient;
window.updateVitalDisplay = updateVitalDisplay;
window.startNewAssessment = startNewAssessment;
window.toggleAnalysisMode = toggleAnalysisMode;

// ========== Export for testing ==========
export {
    state,
    validateBasicInfo,
    validateSymptoms,
    performBasicTriage,
    displayResults
};
