// FirstLine USSD Simulator - Enhanced Version
// Allows comprehensive symptom and medical information collection

import { CLINICAL_KNOWLEDGE_BASE } from './clinical_knowledge_medgemma.js';
import ClinicalReasoningEngine from './reasoning_engine/index.js';

const API_BASE = window.MEDGEMMA_API || 'https://heliolatrous-unstooping-rosy.ngrok-free.dev';

// Initialize reasoning engine
let reasoningEngine = null;

async function initReasoningEngine() {
    try {
        reasoningEngine = new ClinicalReasoningEngine();
        await reasoningEngine.initialize();
        console.log('✅ Offline reasoning engine ready');
    } catch (error) {
        console.warn('⚠️ Reasoning engine failed, will use API only');
    }
}

// Initialize on load
initReasoningEngine();

// USSD Session State
let sessionState = {
    stage: 'main_menu',
    patientData: {
        age: null,
        sex: null,
        symptoms: [],  // Array to collect multiple symptoms
        symptomDetails: '',  // Free text for additional details
        duration_days: null,
        temp_c: null,
        rr: null,
        hr: null,
        bp_systolic: null,
        bp_diastolic: null,
        pregnancy_status: false,
        chronic_conditions: [],
        medications: [],
        allergies: [],
        followup_responses: {}
    },
    currentSymptomIndex: 0,
    collectingMoreSymptoms: true,
    history: []
};

// Enhanced USSD Screens
const screens = {
    main_menu: {
        title: 'FirstLine',
        content: `Welcome to FirstLine AI Triage

1. New Case
2. View Last Case
3. Training
4. Help

Enter choice:`,
        breadcrumb: '*920*55#'
    },

    language_select: {
        title: 'Select Language',
        content: `Choose your language:

1. English
2. Twi (Akan)
3. Ga
4. Ewe

Enter choice:`,
        breadcrumb: '*920*55# > New Case'
    },

    enter_age: {
        title: 'Patient Age',
        content: `Enter patient's age in years:

(0-120)`,
        breadcrumb: '*920*55# > New Case > Age'
    },

    select_sex: {
        title: 'Patient Sex',
        content: `Select patient's sex:

1. Male
2. Female
3. Other

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Sex'
    },

    pregnancy_check: {
        title: 'Pregnancy Status',
        content: `Is the patient pregnant?

1. Yes
2. No
3. Not sure

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Pregnancy'
    },

    // ENHANCED: Multiple symptom collection
    symptom_menu: {
        title: 'Symptoms',
        content: `Select main symptoms (you can add multiple):

1. Fever
2. Cough
3. Headache
4. Sore throat
5. Body aches
6. Nausea/Vomiting
7. Diarrhea
8. Chest pain
9. Difficulty breathing
10. Abdominal pain
11. Rash
12. Dizziness
0. Done selecting

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Symptoms'
    },

    // NEW: Allow free text symptom description
    symptom_details: {
        title: 'Additional Details',
        content: `Describe any other symptoms or provide more details:

(Type freely, be specific)

Or enter 0 to skip`,
        breadcrumb: '*920*55# > New Case > Details'
    },

    duration: {
        title: 'Duration',
        content: `How long have symptoms been present?

1. Less than 1 day
2. 1-2 days
3. 3-7 days
4. 1-2 weeks
5. More than 2 weeks

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Duration'
    },

    // ENHANCED: More vital signs
    vitals_menu: {
        title: 'Vital Signs',
        content: `Do you have vital signs to record?

1. Yes, I have measurements
2. No, skip this step

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Vitals'
    },

    enter_temperature: {
        title: 'Temperature',
        content: `Enter temperature in °C:

(35-42, or 0 to skip)

Example: 38.5`,
        breadcrumb: '*920*55# > New Case > Vitals > Temp'
    },

    enter_respiratory_rate: {
        title: 'Respiratory Rate',
        content: `Enter breaths per minute:

(10-60, or 0 to skip)

Example: 20`,
        breadcrumb: '*920*55# > New Case > Vitals > RR'
    },

    // NEW: Heart rate
    enter_heart_rate: {
        title: 'Heart Rate',
        content: `Enter heart rate (beats per minute):

(40-180, or 0 to skip)

Example: 75`,
        breadcrumb: '*920*55# > New Case > Vitals > HR'
    },

    // NEW: Blood pressure
    enter_blood_pressure: {
        title: 'Blood Pressure',
        content: `Enter blood pressure:

Format: systolic/diastolic
Example: 120/80

Or enter 0 to skip`,
        breadcrumb: '*920*55# > New Case > Vitals > BP'
    },

    // NEW: Medical history
    medical_history_menu: {
        title: 'Medical History',
        content: `Do you want to add medical history?
(This helps improve accuracy)

1. Yes, add history
2. No, skip this step

Enter choice:`,
        breadcrumb: '*920*55# > New Case > History'
    },

    chronic_conditions: {
        title: 'Chronic Conditions',
        content: `List any chronic conditions:
(e.g., diabetes, hypertension, asthma)

Type conditions separated by commas
Or enter 0 to skip

Example: diabetes, hypertension`,
        breadcrumb: '*920*55# > New Case > History > Conditions'
    },

    medications: {
        title: 'Current Medications',
        content: `List current medications:

Type medications separated by commas
Or enter 0 to skip

Example: metformin, lisinopril`,
        breadcrumb: '*920*55# > New Case > History > Medications'
    },

    allergies: {
        title: 'Known Allergies',
        content: `List any known allergies:

Type allergies separated by commas
Or enter 0 to skip

Example: penicillin, peanuts`,
        breadcrumb: '*920*55# > New Case > History > Allergies'
    },

    // Review before submission
    review_data: {
        title: 'Review Information',
        content: '', // Will be dynamically generated
        breadcrumb: '*920*55# > New Case > Review'
    },

    analyzing: {
        title: 'Analyzing',
        content: `Please wait...

Analyzing patient data with AI...

This may take a few seconds.`,
        breadcrumb: '*920*55# > New Case > Analysis'
    },

    triage_result: {
        title: 'Triage Result',
        content: '', // Will be dynamically generated
        breadcrumb: '*920*55# > New Case > Result'
    }
};

// Symptom mapping
const symptomMap = {
    '1': 'fever',
    '2': 'cough',
    '3': 'headache',
    '4': 'sore throat',
    '5': 'body aches',
    '6': 'nausea/vomiting',
    '7': 'diarrhea',
    '8': 'chest pain',
    '9': 'difficulty breathing',
    '10': 'abdominal pain',
    '11': 'rash',
    '12': 'dizziness'
};

// Duration mapping
const durationMap = {
    '1': 0.5,
    '2': 1.5,
    '3': 5,
    '4': 10,
    '5': 30
};

// DOM Elements
const ussdScreen = document.getElementById('ussd-screen');
const ussdTitle = document.getElementById('ussd-title');
const ussdContent = document.getElementById('ussd-content');
const ussdBreadcrumb = document.getElementById('ussd-breadcrumb');
const ussdInput = document.getElementById('ussd-input');
const btnSend = document.getElementById('btn-send');
const btnBack = document.getElementById('btn-back');
const btnHome = document.getElementById('btn-home');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderScreen('main_menu');
    setupEventListeners();
});

function setupEventListeners() {
    btnSend.addEventListener('click', handleInput);
    btnBack.addEventListener('click', goBack);
    btnHome.addEventListener('click', goHome);

    ussdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInput();
        }
    });
}

function renderScreen(screenName) {
    const screen = screens[screenName];
    if (!screen) return;

    sessionState.stage = screenName;

    // Special handling for dynamic screens
    if (screenName === 'review_data') {
        screen.content = generateReviewContent();
    } else if (screenName === 'triage_result') {
        screen.content = generateResultContent();
    }

    ussdTitle.textContent = screen.title;
    ussdContent.textContent = screen.content;
    ussdBreadcrumb.textContent = screen.breadcrumb;
    ussdInput.value = '';
    ussdInput.focus();

    sessionState.history.push(screenName);
}

async function handleInput() {
    const input = ussdInput.value.trim();
    if (!input) return;

    const stage = sessionState.stage;

    switch (stage) {
        case 'main_menu':
            if (input === '1') renderScreen('language_select');
            else if (input === '2') showLastCase();
            else if (input === '3') showTraining();
            else if (input === '4') showHelp();
            break;

        case 'language_select':
            // For now, proceed with English
            renderScreen('enter_age');
            break;

        case 'enter_age':
            const age = parseInt(input);
            if (age >= 0 && age <= 120) {
                sessionState.patientData.age = age;
                renderScreen('select_sex');
            } else {
                alert('Please enter a valid age (0-120)');
            }
            break;

        case 'select_sex':
            if (input === '1') sessionState.patientData.sex = 'M';
            else if (input === '2') sessionState.patientData.sex = 'F';
            else if (input === '3') sessionState.patientData.sex = 'O';

            if (sessionState.patientData.sex === 'F') {
                renderScreen('pregnancy_check');
            } else {
                renderScreen('symptom_menu');
            }
            break;

        case 'pregnancy_check':
            sessionState.patientData.pregnancy_status = input === '1';
            renderScreen('symptom_menu');
            break;

        case 'symptom_menu':
            if (input === '0') {
                // Done selecting symptoms
                if (sessionState.patientData.symptoms.length > 0) {
                    renderScreen('symptom_details');
                } else {
                    alert('Please select at least one symptom');
                }
            } else if (symptomMap[input]) {
                // Add symptom
                const symptom = symptomMap[input];
                if (!sessionState.patientData.symptoms.includes(symptom)) {
                    sessionState.patientData.symptoms.push(symptom);
                    alert(`Added: ${symptom}\nTotal symptoms: ${sessionState.patientData.symptoms.length}\n\nSelect more or press 0 when done`);
                }
                // Stay on same screen
                renderScreen('symptom_menu');
            }
            break;

        case 'symptom_details':
            if (input !== '0') {
                sessionState.patientData.symptomDetails = input;
            }
            renderScreen('duration');
            break;

        case 'duration':
            if (durationMap[input]) {
                sessionState.patientData.duration_days = durationMap[input];
                renderScreen('vitals_menu');
            }
            break;

        case 'vitals_menu':
            if (input === '1') {
                renderScreen('enter_temperature');
            } else {
                renderScreen('medical_history_menu');
            }
            break;

        case 'enter_temperature':
            const temp = parseFloat(input);
            if (temp === 0) {
                renderScreen('enter_respiratory_rate');
            } else if (temp >= 35 && temp <= 42) {
                sessionState.patientData.temp_c = temp;
                renderScreen('enter_respiratory_rate');
            } else {
                alert('Please enter a valid temperature (35-42°C) or 0 to skip');
            }
            break;

        case 'enter_respiratory_rate':
            const rr = parseInt(input);
            if (rr === 0) {
                renderScreen('enter_heart_rate');
            } else if (rr >= 10 && rr <= 60) {
                sessionState.patientData.rr = rr;
                renderScreen('enter_heart_rate');
            } else {
                alert('Please enter a valid respiratory rate (10-60) or 0 to skip');
            }
            break;

        case 'enter_heart_rate':
            const hr = parseInt(input);
            if (hr === 0) {
                renderScreen('enter_blood_pressure');
            } else if (hr >= 40 && hr <= 180) {
                sessionState.patientData.hr = hr;
                renderScreen('enter_blood_pressure');
            } else {
                alert('Please enter a valid heart rate (40-180) or 0 to skip');
            }
            break;

        case 'enter_blood_pressure':
            if (input === '0') {
                renderScreen('medical_history_menu');
            } else {
                const bpMatch = input.match(/(\d+)\/(\d+)/);
                if (bpMatch) {
                    sessionState.patientData.bp_systolic = parseInt(bpMatch[1]);
                    sessionState.patientData.bp_diastolic = parseInt(bpMatch[2]);
                    renderScreen('medical_history_menu');
                } else {
                    alert('Please enter in format: 120/80 or 0 to skip');
                }
            }
            break;

        case 'medical_history_menu':
            if (input === '1') {
                renderScreen('chronic_conditions');
            } else {
                renderScreen('review_data');
            }
            break;

        case 'chronic_conditions':
            if (input !== '0') {
                sessionState.patientData.chronic_conditions = input.split(',').map(c => c.trim());
            }
            renderScreen('medications');
            break;

        case 'medications':
            if (input !== '0') {
                sessionState.patientData.medications = input.split(',').map(m => m.trim());
            }
            renderScreen('allergies');
            break;

        case 'allergies':
            if (input !== '0') {
                sessionState.patientData.allergies = input.split(',').map(a => a.trim());
            }
            renderScreen('review_data');
            break;

        case 'review_data':
            if (input === '1') {
                // Confirm and analyze
                renderScreen('analyzing');
                await performTriage();
            } else if (input === '2') {
                // Start over
                resetSession();
                renderScreen('enter_age');
            }
            break;

        case 'triage_result':
            if (input === '1') {
                // New case
                resetSession();
                renderScreen('main_menu');
            } else if (input === '2') {
                // View details (could expand)
                alert('Detailed view coming soon');
            }
            break;
    }
}

function generateReviewContent() {
    const data = sessionState.patientData;
    let content = `Review patient information:\n\n`;

    content += `Age: ${data.age} years\n`;
    content += `Sex: ${data.sex}\n`;
    if (data.pregnancy_status) content += `Pregnant: Yes\n`;
    content += `\nSymptoms:\n`;
    data.symptoms.forEach(s => content += `- ${s}\n`);
    if (data.symptomDetails) content += `Details: ${data.symptomDetails}\n`;
    content += `\nDuration: ${data.duration_days} days\n`;

    if (data.temp_c) content += `\nTemperature: ${data.temp_c}°C\n`;
    if (data.rr) content += `Respiratory Rate: ${data.rr}/min\n`;
    if (data.hr) content += `Heart Rate: ${data.hr} bpm\n`;
    if (data.bp_systolic) content += `Blood Pressure: ${data.bp_systolic}/${data.bp_diastolic}\n`;

    if (data.chronic_conditions.length > 0) {
        content += `\nChronic Conditions: ${data.chronic_conditions.join(', ')}\n`;
    }
    if (data.medications.length > 0) {
        content += `Medications: ${data.medications.join(', ')}\n`;
    }
    if (data.allergies.length > 0) {
        content += `Allergies: ${data.allergies.join(', ')}\n`;
    }

    content += `\n1. Confirm and analyze\n2. Start over\n\nEnter choice:`;

    return content;
}

async function performTriage() {
    try {
        const data = sessionState.patientData;

        // Combine symptoms
        const allSymptoms = [
            ...data.symptoms,
            data.symptomDetails
        ].filter(s => s).join(', ');

        const input = {
            age: data.age,
            sex: data.sex,
            symptoms: allSymptoms,
            duration_days: data.duration_days,
            temp_c: data.temp_c,
            rr: data.rr,
            hr: data.hr,
            pregnancy_status: data.pregnancy_status
        };

        let result;

        // Try offline first
        if (reasoningEngine) {
            try {
                result = await reasoningEngine.analyze(input);
                result.source = 'offline';
            } catch (error) {
                console.warn('Offline analysis failed, trying API');
            }
        }

        // Try API if offline failed or unavailable
        if (!result && navigator.onLine) {
            try {
                const response = await fetch(`${API_BASE}/triage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ intake: data })
                });
                result = await response.json();
                result.source = 'online';
            } catch (error) {
                console.warn('API call failed');
            }
        }

        // Fallback to basic triage
        if (!result) {
            result = performBasicTriage(input);
            result.source = 'fallback';
        }

        sessionState.triageResult = result;
        renderScreen('triage_result');

    } catch (error) {
        console.error('Triage failed:', error);
        alert('Analysis failed. Please try again.');
        renderScreen('main_menu');
    }
}

function performBasicTriage(input) {
    const hasFever = input.temp_c && input.temp_c > 38.0;
    const hasHighRR = input.rr && input.rr > 25;
    const isYoung = input.age < 5;

    let tier = 'GREEN';
    let diagnosis = 'General illness';

    if ((hasFever && hasHighRR) || (isYoung && hasFever)) {
        tier = 'RED';
        diagnosis = 'Possible serious infection';
    } else if (hasFever || hasHighRR) {
        tier = 'YELLOW';
        diagnosis = 'Possible infection';
    }

    return {
        diagnosis,
        tier,
        confidence: 60,
        reasoning: `Based on symptoms: ${input.symptoms}`,
        actions: [
            tier === 'RED' ? 'Seek immediate medical attention' : 'Monitor symptoms',
            'Stay hydrated',
            'Rest'
        ]
    };
}

function generateResultContent() {
    const result = sessionState.triageResult;
    if (!result) return 'No result available';

    const tierEmoji = result.tier === 'RED' ? '🚨' :
        result.tier === 'YELLOW' ? '⚠️' : '✅';

    let content = `${tierEmoji} TRIAGE RESULT\n\n`;
    content += `Tier: ${result.tier}\n`;
    content += `Diagnosis: ${result.diagnosis}\n`;
    content += `Confidence: ${result.confidence}%\n\n`;
    content += `Reasoning:\n${result.reasoning.substring(0, 200)}...\n\n`;
    content += `Actions:\n`;
    result.actions.slice(0, 3).forEach((action, i) => {
        content += `${i + 1}. ${action}\n`;
    });
    content += `\nSource: ${result.source}\n\n`;
    content += `1. New case\n2. View details\n\nEnter choice:`;

    return content;
}

function resetSession() {
    sessionState = {
        stage: 'main_menu',
        patientData: {
            age: null,
            sex: null,
            symptoms: [],
            symptomDetails: '',
            duration_days: null,
            temp_c: null,
            rr: null,
            hr: null,
            bp_systolic: null,
            bp_diastolic: null,
            pregnancy_status: false,
            chronic_conditions: [],
            medications: [],
            allergies: [],
            followup_responses: {}
        },
        currentSymptomIndex: 0,
        collectingMoreSymptoms: true,
        history: []
    };
}

function goBack() {
    if (sessionState.history.length > 1) {
        sessionState.history.pop(); // Remove current
        const previous = sessionState.history.pop(); // Get previous
        renderScreen(previous);
    }
}

function goHome() {
    resetSession();
    renderScreen('main_menu');
}

function showLastCase() {
    alert('Last case feature coming soon');
}

function showTraining() {
    alert('Training module coming soon');
}

function showHelp() {
    alert('Help: FirstLine AI Triage System\n\nFor assistance, contact support.');
}

// Export for testing
export { sessionState, performTriage, resetSession };

// ========== Keypad UI Functions ==========

function appendDigit(digit) {
    const input = document.getElementById('ussd-input');
    if (input.value.length < 10) {
        input.value += digit;
    }
}

function clearInput() {
    const input = document.getElementById('ussd-input');
    input.value = input.value.slice(0, -1);
}

function sendInput() {
    handleInput();
}

function cancelSession() {
    if (confirm('End USSD session?')) {
        goHome();
    }
}

// Expose to window for HTML onclicks
window.appendDigit = appendDigit;
window.clearInput = clearInput;
window.sendInput = sendInput;
window.cancelSession = cancelSession;
window.handleInput = handleInput; // Also needed
