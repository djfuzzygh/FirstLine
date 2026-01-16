// FirstLine Voice Call Simulator
// Demonstrates AI-powered triage via voice interface

const API_BASE = 'https://heliolatrous-unstooping-rosy.ngrok-free.dev';

// Voice Call State
let callState = {
    active: false,
    stage: 'idle', // idle, greeting, collecting_symptoms, asking_questions, providing_triage
    conversationHistory: [],
    patientData: {
        age: null,
        sex: null,
        symptoms: '',
        duration_days: null,
        followup_responses: {}
    },
    currentQuestions: [],
    currentQuestionIndex: 0,
    triageResult: null
};

// Speech Recognition & Synthesis
let recognition = null;
let synthesis = window.speechSynthesis;
let currentLanguage = 'en-US';

// DOM Elements
const btnCall = document.getElementById('btn-call');
const btnMic = document.getElementById('btn-mic');
const btnHangup = document.getElementById('btn-hangup');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const statusSubtext = document.getElementById('status-subtext');
const conversationLog = document.getElementById('conversation-log');
const transcript = document.getElementById('transcript');
const waveform = document.getElementById('waveform');
const languageSelect = document.getElementById('language-select');

// Initialize Speech Recognition
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true; // CHANGED: Alllow pauses
        recognition.interimResults = true;
        recognition.lang = currentLanguage;

        let silenceTimer = null;

        recognition.onstart = () => {
            updateStatus('listening', 'Listening...', 'Speak now (I will wait for you to finish)');
            transcript.classList.remove('hidden');
            waveform.classList.remove('hidden');
            btnMic.classList.add('recording');
        };

        recognition.onresult = (event) => {
            if (silenceTimer) clearTimeout(silenceTimer);

            let interimTranscript = '';
            let finalText = '';

            // Combine all results (since continuous=true accumulates them)
            for (let i = 0; i < event.results.length; i++) {
                finalText += event.results[i][0].transcript;
            }

            transcript.textContent = finalText || 'Listening...';
            statusSubtext.textContent = "Processing pause...";

            // Wait 2.5 seconds of silence before submitting
            silenceTimer = setTimeout(() => {
                recognition.stop();
                handleUserSpeech(finalText);
            }, 2500);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error !== 'no-speech') {
                addMessage('system', `Error: ${event.error}.`);
            }
            transcript.classList.add('hidden');
            waveform.classList.add('hidden');
            btnMic.classList.remove('recording');
        };

        recognition.onend = () => {
            // UI Cleanup
            // transcript.classList.add('hidden'); 
            // waveform.classList.add('hidden');
            btnMic.classList.remove('recording');
        };
    } else {
        alert('Speech recognition not supported in this browser. Please use Chrome or Edge.');
    }
}

// Text-to-Speech
function speak(text, callback) {
    updateStatus('speaking', 'AI Speaking...', text.substring(0, 50) + '...');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onend = () => {
        if (callback) callback();
    };

    synthesis.speak(utterance);
    addMessage('ai', text);
}

// Update UI Status
function updateStatus(state, text, subtext) {
    statusIndicator.className = 'status-indicator status-' + state;
    statusText.textContent = text;
    statusSubtext.textContent = subtext || '';

    const icons = {
        idle: '📞',
        calling: '📱',
        listening: '🎤',
        thinking: '🤔',
        speaking: '🗣️'
    };
    statusIndicator.textContent = icons[state] || '📞';
}

// Add Message to Conversation Log
function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;

    const icon = type === 'ai' ? '🤖 AI: ' : type === 'user' ? '👤 You: ' : '📋 ';
    messageDiv.textContent = icon + text;

    conversationLog.appendChild(messageDiv);
    conversationLog.scrollTop = conversationLog.scrollHeight;

    callState.conversationHistory.push({ type, text });
}

// Start Call
btnCall.addEventListener('click', () => {
    callState.active = true;
    callState.stage = 'greeting';

    btnCall.classList.add('hidden');
    btnMic.classList.remove('hidden');
    btnHangup.classList.remove('hidden');

    conversationLog.innerHTML = '';

    updateStatus('calling', 'Connecting...', 'Please wait');

    setTimeout(() => {
        const greeting = "Welcome to FirstLine, the AI-powered clinical decision support system. I'm here to help you assess your patient. Let's start with some basic information. How old is the patient?";
        speak(greeting, () => {
            callState.stage = 'collecting_age';
            startListening();
        });
    }, 1500);
});

// End Call
btnHangup.addEventListener('click', () => {
    endCall();
});

function endCall() {
    callState.active = false;
    callState.stage = 'idle';

    if (recognition) recognition.stop();
    synthesis.cancel();

    btnCall.classList.remove('hidden');
    btnMic.classList.add('hidden');
    btnHangup.classList.add('hidden');

    updateStatus('idle', 'Call Ended', 'Thank you for using FirstLine');

    addMessage('system', 'Call ended. You can start a new consultation anytime.');
}

// Start Listening
function startListening() {
    if (recognition && callState.active) {
        updateStatus('listening', 'Listening...', 'Speak now');
        recognition.start();
    }
}

// Handle User Speech
async function handleUserSpeech(text) {
    addMessage('user', text);
    updateStatus('thinking', 'Processing...', 'AI is analyzing');

    switch (callState.stage) {
        case 'collecting_age':
            await handleAgeResponse(text);
            break;
        case 'collecting_sex':
            await handleSexResponse(text);
            break;
        case 'collecting_symptoms':
            await handleSymptomsResponse(text);
            break;
        case 'collecting_duration':
            await handleDurationResponse(text);
            break;
        case 'asking_questions':
            await handleQuestionResponse(text);
            break;
        default:
            speak("I didn't understand that. Could you please repeat?", startListening);
    }
}

// Handle Age Response
async function handleAgeResponse(text) {
    const age = parseInt(text.match(/\d+/)?.[0]);

    if (age && age > 0 && age < 120) {
        callState.patientData.age = age;
        speak(`Got it, ${age} years old. Is the patient male or female?`, () => {
            callState.stage = 'collecting_sex';
            startListening();
        });
    } else {
        speak("I didn't catch the age. Please say the patient's age in years.", startListening);
    }
}

// Handle Sex Response
async function handleSexResponse(text) {
    const textLower = text.toLowerCase();

    if (textLower.includes('male') && !textLower.includes('female')) {
        callState.patientData.sex = 'Male';
    } else if (textLower.includes('female')) {
        callState.patientData.sex = 'Female';
    } else {
        speak("Please say either male or female.", startListening);
        return;
    }

    speak(`Understood, ${callState.patientData.sex}. Now, please describe the main symptoms or complaints.`, () => {
        callState.stage = 'collecting_symptoms';
        startListening();
    });
}

// Handle Symptoms Response
async function handleSymptomsResponse(text) {
    callState.patientData.symptoms = text;

    speak(`Thank you. How many days has the patient had these symptoms?`, () => {
        callState.stage = 'collecting_duration';
        startListening();
    });
}

// Handle Duration Response
async function handleDurationResponse(text) {
    const days = parseInt(text.match(/\d+/)?.[0]);

    if (days && days > 0) {
        callState.patientData.duration_days = days;

        speak(`Understood, ${days} days. Let me ask a few follow-up questions to better assess the situation.`, async () => {
            await getFollowUpQuestions();
        });
    } else {
        speak("Please say the number of days.", startListening);
    }
}

// Get Follow-up Questions from API
async function getFollowUpQuestions() {
    try {
        const response = await fetch(`${API_BASE}/followup_questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: callState.patientData.age,
                sex: callState.patientData.sex,
                symptoms: callState.patientData.symptoms,
                duration_days: callState.patientData.duration_days,
                has_consent: true
            })
        });

        const data = await response.json();
        callState.currentQuestions = data.questions || [];
        callState.currentQuestionIndex = 0;
        callState.stage = 'asking_questions';

        askNextQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
        speak("I'm having trouble connecting. Let me proceed with the assessment based on what you've told me.", performTriage);
    }
}

// Ask Next Follow-up Question
function askNextQuestion() {
    if (callState.currentQuestionIndex < callState.currentQuestions.length) {
        const question = callState.currentQuestions[callState.currentQuestionIndex];
        speak(question.question, startListening);
    } else {
        speak("Thank you for answering those questions. Let me analyze this case now.", performTriage);
    }
}

// Handle Question Response
async function handleQuestionResponse(text) {
    const question = callState.currentQuestions[callState.currentQuestionIndex];
    callState.patientData.followup_responses[question.question] = text;

    callState.currentQuestionIndex++;
    askNextQuestion();
}

function saveToDashboard(intake, triage, source) {
    try {
        const newCase = {
            id: `FL-${Date.now().toString().slice(-4)}`,
            date: new Date(),
            age: intake.age || 5,
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
    updateStatus('thinking', 'Analyzing Case...', 'AI is making triage decision');

    try {
        const response = await fetch(`${API_BASE}/triage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intake: {
                    age: callState.patientData.age,
                    sex: callState.patientData.sex,
                    symptoms: callState.patientData.symptoms,
                    duration_days: callState.patientData.duration_days,
                    has_consent: true
                },
                followup_responses: callState.patientData.followup_responses
            })
        });

        const triage = await response.json();
        callState.triageResult = triage;

        // Save to Dashboard
        saveToDashboard(callState.patientData, triage, 'Voice');

        announceTriageResult(triage);
    } catch (error) {
        console.error('Error performing triage:', error);
        speak("I'm having trouble completing the analysis. Please consult with a supervisor or refer to the nearest health facility.", endCall);
    }
}

// Announce Triage Result
function announceTriageResult(triage) {
    let announcement = `Based on my assessment, this case is classified as ${triage.risk_tier} priority. `;

    if (triage.risk_tier === 'RED') {
        announcement += "This is an emergency. Immediate referral to a hospital is required. ";
    } else if (triage.risk_tier === 'YELLOW') {
        announcement += "This requires medical attention. Refer to a health center within 24 hours. ";
    } else {
        announcement += "This can likely be managed at the community level. ";
    }

    if (triage.danger_signs && triage.danger_signs.length > 0) {
        announcement += `Danger signs identified: ${triage.danger_signs.join(', ')}. `;
    }

    announcement += `Recommended actions: ${triage.recommended_actions.join(', ')}. `;

    // Announce First Aid if available
    if (triage.first_aid_advice && triage.first_aid_advice.length > 0) {
        announcement += `Immediate First Aid: ${triage.first_aid_advice[0]}. `;
    }

    announcement += "A detailed referral summary will be sent to you via SMS. Thank you for using FirstLine.";

    speak(announcement, () => {
        setTimeout(endCall, 3000);
    });
}

// Language Change
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    if (recognition) {
        recognition.lang = currentLanguage;
    }
    addMessage('system', `Language changed to ${e.target.options[e.target.selectedIndex].text}`);
});

// Push to Talk
btnMic.addEventListener('click', () => {
    if (callState.active) {
        startListening();
    }
});

// Initialize
initSpeechRecognition();

console.log('🎤 Voice Call Simulator Ready!');
console.log('📞 Click the green button to start a consultation');
