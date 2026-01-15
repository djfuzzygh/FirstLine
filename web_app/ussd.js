// FirstLine USSD Simulator
// Demonstrates menu-driven triage on feature phones

const API_BASE = 'https://heliolatrous-unstooping-rosy.ngrok-free.dev';

// USSD Session State
let sessionState = {
    stage: 'main_menu',
    patientData: {
        age: null,
        sex: null,
        symptoms: null,
        duration_days: null,
        followup_responses: {}
    },
    currentQuestions: [],
    currentQuestionIndex: 0,
    history: []
};

// USSD Screens
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
        content: `Enter patient age in years:

Example: 3

(0 for infant <1 year)`,
        breadcrumb: '*920*55# > New Case > Age'
    },

    select_sex: {
        title: 'Patient Sex',
        content: `Select patient sex:

1. Male
2. Female

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Sex'
    },

    select_symptoms: {
        title: 'Main Symptom',
        content: `Select main symptom:

1. Fever
2. Diarrhea
3. Cough/Breathing
4. Vomiting
5. Rash
6. Other

Enter choice:`,
        breadcrumb: '*920*55# > New Case > Symptoms'
    },

    enter_duration: {
        title: 'Duration',
        content: `How many days has patient had symptoms?

Enter number of days:

Example: 2`,
        breadcrumb: '*920*55# > New Case > Duration'
    },

    processing: {
        title: 'Processing',
        content: `Please wait...

Analyzing case with AI...

This may take a few seconds.`,
        breadcrumb: '*920*55# > Processing'
    }
};

// Initialize
function init() {
    showScreen('main_menu');
}

// Show Screen
function showScreen(screenName) {
    const screen = screens[screenName];
    if (!screen) return;

    sessionState.stage = screenName;
    document.getElementById('ussd-content').innerHTML = screen.content.replace(/\n/g, '<br>');
    document.getElementById('breadcrumb').textContent = screen.breadcrumb;
    document.getElementById('ussd-input').value = '';
    document.getElementById('ussd-input').focus();
}

// Append Digit
function appendDigit(digit) {
    const input = document.getElementById('ussd-input');
    input.value += digit;
}

// Clear Input
function clearInput() {
    const input = document.getElementById('ussd-input');
    input.value = input.value.slice(0, -1);
}

// Send Input
async function sendInput() {
    const input = document.getElementById('ussd-input').value.trim();
    if (!input) return;

    const stage = sessionState.stage;

    switch (stage) {
        case 'main_menu':
            handleMainMenu(input);
            break;
        case 'language_select':
            handleLanguageSelect(input);
            break;
        case 'enter_age':
            handleAgeInput(input);
            break;
        case 'select_sex':
            handleSexSelect(input);
            break;
        case 'select_symptoms':
            handleSymptomsSelect(input);
            break;
        case 'enter_duration':
            await handleDurationInput(input);
            break;
        case 'followup_question':
            await handleFollowupAnswer(input);
            break;
        default:
            showError('Invalid state');
    }
}

// Handle Main Menu
function handleMainMenu(choice) {
    switch (choice) {
        case '1':
            showScreen('language_select');
            break;
        case '2':
            showLastCase();
            break;
        case '3':
            showTraining();
            break;
        case '4':
            showHelp();
            break;
        default:
            showError('Invalid choice. Please enter 1-4.');
    }
}

// Handle Language Select
function handleLanguageSelect(choice) {
    const languages = ['English', 'Twi', 'Ga', 'Ewe'];
    if (choice >= '1' && choice <= '4') {
        sessionState.language = languages[parseInt(choice) - 1];
        showScreen('enter_age');
    } else {
        showError('Invalid choice. Please enter 1-4.');
    }
}

// Handle Age Input
function handleAgeInput(age) {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
        showError('Invalid age. Please enter 0-120.');
        return;
    }

    sessionState.patientData.age = ageNum;
    showScreen('select_sex');
}

// Handle Sex Select
function handleSexSelect(choice) {
    if (choice === '1') {
        sessionState.patientData.sex = 'Male';
        showScreen('select_symptoms');
    } else if (choice === '2') {
        sessionState.patientData.sex = 'Female';
        showScreen('select_symptoms');
    } else {
        showError('Invalid choice. Please enter 1 or 2.');
    }
}

// Handle Symptoms Select
function handleSymptomsSelect(choice) {
    const symptoms = ['Fever', 'Diarrhea', 'Cough/Breathing', 'Vomiting', 'Rash', 'Other'];
    const choiceNum = parseInt(choice);

    if (choiceNum >= 1 && choiceNum <= 6) {
        sessionState.patientData.symptoms = symptoms[choiceNum - 1];
        showScreen('enter_duration');
    } else {
        showError('Invalid choice. Please enter 1-6.');
    }
}

// Handle Duration Input
async function handleDurationInput(days) {
    const daysNum = parseInt(days);
    if (isNaN(daysNum) || daysNum < 0 || daysNum > 365) {
        showError('Invalid duration. Please enter 0-365.');
        return;
    }

    sessionState.patientData.duration_days = daysNum;

    // Get follow-up questions
    await getFollowupQuestions();
}

// Get Follow-up Questions
async function getFollowupQuestions() {
    showScreen('processing');

    try {
        const response = await fetch(`${API_BASE}/followup_questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: sessionState.patientData.age,
                sex: sessionState.patientData.sex,
                symptoms: sessionState.patientData.symptoms,
                duration_days: sessionState.patientData.duration_days,
                has_consent: true
            })
        });

        const data = await response.json();
        sessionState.currentQuestions = data.questions || [];
        sessionState.currentQuestionIndex = 0;

        showNextQuestion();
    } catch (error) {
        console.error('Error:', error);
        showError('Connection error. Proceeding with triage...');
        setTimeout(performTriage, 2000);
    }
}

// Show Next Question
function showNextQuestion() {
    if (sessionState.currentQuestionIndex < sessionState.currentQuestions.length) {
        const q = sessionState.currentQuestions[sessionState.currentQuestionIndex];

        let content = `Question ${sessionState.currentQuestionIndex + 1} of ${sessionState.currentQuestions.length}\n\n`;
        content += q.question + '\n\n';

        if (q.options && q.options.length > 0) {
            q.options.forEach((opt, idx) => {
                content += `${idx + 1}. ${opt}\n`;
            });
            content += '\nEnter choice:';
        } else {
            content += 'Enter your answer:';
        }

        document.getElementById('ussd-content').innerHTML = content.replace(/\n/g, '<br>');
        document.getElementById('breadcrumb').textContent = `*920*55# > Question ${sessionState.currentQuestionIndex + 1}`;
        document.getElementById('ussd-input').value = '';
        sessionState.stage = 'followup_question';
    } else {
        performTriage();
    }
}

// Handle Follow-up Answer
async function handleFollowupAnswer(answer) {
    const q = sessionState.currentQuestions[sessionState.currentQuestionIndex];

    let responseValue;
    if (q.options && q.options.length > 0) {
        const choiceNum = parseInt(answer);
        if (choiceNum >= 1 && choiceNum <= q.options.length) {
            responseValue = q.options[choiceNum - 1];
        } else {
            showError(`Invalid choice. Please enter 1-${q.options.length}.`);
            return;
        }
    } else {
        responseValue = answer;
    }

    sessionState.patientData.followup_responses[q.question] = responseValue;
    sessionState.currentQuestionIndex++;

    showNextQuestion();
}

function saveToDashboard(intake, triage, source) {
    try {
        const newCase = {
            id: `FL-${Date.now().toString().slice(-4)}`,
            date: new Date(),
            age: intake.age || 5, // Default if missing
            symptom: (intake.symptoms || 'General').split(',')[0],
            tier: triage.risk_tier,
            region: 'Greater Accra',
            responseTime: Math.floor(Math.random() * 5) + 1,
            source: source
        };

        const cases = JSON.parse(localStorage.getItem('firstline_cases') || '[]');
        cases.unshift(newCase);
        if (cases.length > 50) cases.pop();

        localStorage.setItem('firstline_cases', JSON.stringify(cases));
        console.log('✅ Case saved to dashboard:', newCase);
    } catch (e) {
        console.error('Failed to save to dashboard', e);
    }
}

// Perform Triage
async function performTriage() {
    showScreen('processing');

    try {
        const response = await fetch(`${API_BASE}/triage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intake: {
                    age: sessionState.patientData.age,
                    sex: sessionState.patientData.sex,
                    symptoms: sessionState.patientData.symptoms,
                    duration_days: sessionState.patientData.duration_days,
                    has_consent: true
                },
                followup_responses: sessionState.patientData.followup_responses
            })
        });

        const triage = await response.json();

        // Save to Dashboard
        saveToDashboard(sessionState.patientData, triage, 'USSD');

        showTriageResult(triage);
    } catch (error) {
        console.error('Error:', error);
        showError('Connection error. Please try again.');
    }
}

// Show Triage Result
function showTriageResult(triage) {
    let content = `TRIAGE RESULT\n\n`;
    content += `Priority: ${triage.risk_tier}\n\n`;

    if (triage.risk_tier === 'RED') {
        content += `⚠️ EMERGENCY\n\n`;
        content += `Refer IMMEDIATELY to hospital.\n\n`;
    } else if (triage.risk_tier === 'YELLOW') {
        content += `⚠️ URGENT\n\n`;
        content += `Refer to health center within 24 hours.\n\n`;
    } else {
        content += `✓ ROUTINE\n\n`;
        content += `Can be managed locally.\n\n`;
    }

    if (triage.danger_signs && triage.danger_signs.length > 0) {
        content += `Danger Signs:\n`;
        triage.danger_signs.forEach(sign => {
            content += `- ${sign}\n`;
        });
        content += '\n';
    }

    if (triage.first_aid_advice && triage.first_aid_advice.length > 0) {
        content += `First Aid:\n`;
        content += `- ${triage.first_aid_advice[0]}\n\n`;
    }

    content += `Actions:\n`;
    triage.recommended_actions.forEach(action => {
        content += `- ${action}\n`;
    });

    content += `\nSOAP note sent via SMS.\n\n`;
    content += `1. New Case\n`;
    content += `2. Exit`;

    document.getElementById('ussd-content').innerHTML = content.replace(/\n/g, '<br>');
    document.getElementById('breadcrumb').textContent = '*920*55# > Result';
    sessionState.stage = 'result';
}

// Show Error
function showError(message) {
    const content = document.getElementById('ussd-content');
    content.innerHTML = `<div style="color: #d32f2f; font-weight: bold;">ERROR</div><br><br>${message}<br><br>Press SEND to continue.`;
}

// Show Last Case
function showLastCase() {
    const content = `LAST CASE\n\nNo previous cases.\n\n1. Back to Menu`;
    document.getElementById('ussd-content').innerHTML = content.replace(/\n/g, '<br>');
    sessionState.stage = 'last_case';
}

// Show Training
function showTraining() {
    const content = `TRAINING\n\nPractice cases:\n\n1. Fever case\n2. Diarrhea case\n3. Cough case\n4. Back to Menu`;
    document.getElementById('ussd-content').innerHTML = content.replace(/\n/g, '<br>');
    sessionState.stage = 'training';
}

// Show Help
function showHelp() {
    const content = `HELP\n\nFor assistance:\n- Call: 0800-HELP\n- SMS: 1234\n\n1. Back to Menu`;
    document.getElementById('ussd-content').innerHTML = content.replace(/\n/g, '<br>');
    sessionState.stage = 'help';
}

// Cancel Session
function cancelSession() {
    sessionState = {
        stage: 'main_menu',
        patientData: {
            age: null,
            sex: null,
            symptoms: null,
            duration_days: null,
            followup_responses: {}
        },
        currentQuestions: [],
        currentQuestionIndex: 0,
        history: []
    };

    showScreen('main_menu');
}

// Enter key support
document.getElementById('ussd-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendInput();
    }
});

// Initialize
init();

console.log('📱 USSD Simulator Ready!');
console.log('Dial *920*55# to start');
