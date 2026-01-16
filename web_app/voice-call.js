// FirstLine Voice Call Simulator - Enhanced Version
// Natural conversation with unlimited speech input

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

// Voice Call State
let callState = {
    active: false,
    stage: 'idle',
    conversationHistory: [],
    patientData: {
        age: null,
        sex: null,
        symptoms: '',
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
    currentQuestion: null,
    awaitingResponse: false,
    triageResult: null,
    recognizedText: '',
    currentInterim: '',
    silenceTimeout: null
};

// Speech Recognition & Synthesis
let recognition = null;
let synthesis = window.speechSynthesis;
let currentLanguage = 'en-US';
let isListening = false;

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

        // Enhanced settings for better capture
        recognition.continuous = true;  // Keep listening
        recognition.interimResults = true;  // Show interim results
        recognition.maxAlternatives = 3;  // Get multiple alternatives
        recognition.lang = currentLanguage;

        recognition.onstart = () => {
            isListening = true;
            updateStatus('listening', 'Listening...', 'Speak clearly');
            startWaveformAnimation();
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let currentFinal = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptText = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    currentFinal += transcriptText + ' ';
                } else {
                    interimTranscript += transcriptText;
                }
            }

            // Store interim for the "last word" capture
            callState.currentInterim = interimTranscript;

            // Update transcript display
            updateTranscript(callState.recognizedText + currentFinal + interimTranscript);

            // Accumulate final results
            if (currentFinal) {
                callState.recognizedText += currentFinal;
            }

            // ANY result (even interim) resets the silence timer for snappier feel
            clearTimeout(callState.silenceTimeout);

            // Set new silence timer (1.5 seconds of silence = done speaking)
            callState.silenceTimeout = setTimeout(() => {
                submitResponse();
            }, 1500);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech') {
                // Just restart
                if (isListening && callState.awaitingResponse) {
                    recognition.start();
                }
            } else {
                updateStatus('error', 'Error', event.error);
            }
        };

        recognition.onend = () => {
            isListening = false;
            stopWaveformAnimation();

            // Restart if we're still waiting for response
            if (callState.awaitingResponse && callState.active) {
                setTimeout(() => {
                    if (callState.awaitingResponse) {
                        recognition.start();
                    }
                }, 100);
            }
        };
    } else {
        alert('Speech recognition not supported in this browser. Please use Chrome.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSpeechRecognition();
    setupEventListeners();
});

function setupEventListeners() {
    btnCall.addEventListener('click', startCall);
    btnHangup.addEventListener('click', endCall);
    btnMic.addEventListener('click', toggleMic);

    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        if (recognition) {
            recognition.lang = currentLanguage;
        }
    });
}

// Start Call
async function startCall() {
    callState.active = true;
    callState.stage = 'greeting';
    callState.conversationHistory = [];

    updateStatus('active', 'Call Active', 'Connected');
    btnCall.disabled = true;
    btnHangup.disabled = false;
    btnMic.disabled = false;

    // Start conversation
    await speak("Hello! This is FirstLine AI Triage. I'm here to help assess the patient's condition. Let's begin.");
    await sleep(500);
    await askAge();
}

// End Call
function endCall() {
    callState.active = false;
    callState.awaitingResponse = false;

    if (recognition && isListening) {
        recognition.stop();
    }

    synthesis.cancel();

    updateStatus('idle', 'Call Ended', 'Ready');
    btnCall.disabled = false;
    btnHangup.disabled = true;
    btnMic.disabled = true;

    addToConversation('system', 'Call ended');
}

// Toggle Mic
function toggleMic() {
    if (isListening) {
        submitResponse();
    } else {
        startListening();
    }
}

function startListening() {
    if (recognition && !isListening) {
        callState.recognizedText = '';
        recognition.start();
    }
}

function stopListening() {
    if (recognition && isListening) {
        recognition.stop();
    }
}

function submitResponse() {
    clearTimeout(callState.silenceTimeout);

    // Include any remaining interim text so we don't miss the last word!
    const fullText = (callState.recognizedText + (callState.currentInterim || '')).trim();

    if (callState.awaitingResponse && fullText) {
        updateStatus('processing', 'Processing...', 'Analyzing your response');
        stopListening();
        processResponse(fullText);

        // Reset buffers
        callState.recognizedText = '';
        callState.currentInterim = '';
    }
}

// Speech Synthesis
async function speak(text) {
    return new Promise((resolve) => {
        // Cancel any ongoing speech
        synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage;
        utterance.rate = 0.9;  // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
            resolve();
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            resolve();
        };

        addToConversation('ai', text);
        synthesis.speak(utterance);
    });
}

// Conversation Flow
async function askAge() {
    callState.stage = 'collecting_age';
    await speak("First, how old is the patient? Please tell me their age in years.");
    callState.awaitingResponse = true;
    startListening();
}

async function askSex() {
    callState.stage = 'collecting_sex';
    await speak("Thank you. What is the patient's sex? Male, female, or other?");
    callState.awaitingResponse = true;
    startListening();
}

async function askPregnancy() {
    callState.stage = 'collecting_pregnancy';
    await speak("Is the patient currently pregnant?");
    callState.awaitingResponse = true;
    startListening();
}

async function askSymptoms() {
    callState.stage = 'collecting_symptoms';
    await speak("Now, please describe all the symptoms the patient is experiencing. Take your time and be as detailed as you like. I'll wait for you to finish speaking.");
    callState.awaitingResponse = true;
    startListening();
}

async function askAdditionalSymptoms() {
    callState.stage = 'collecting_additional_symptoms';
    await speak("Thank you for that information. Is there anything else about the symptoms you'd like to add? Any additional details that might be important?");
    callState.awaitingResponse = true;
    startListening();
}

async function askDuration() {
    callState.stage = 'collecting_duration';
    await speak("How long has the patient been experiencing these symptoms? You can say hours, days, or weeks.");
    callState.awaitingResponse = true;
    startListening();
}

async function askVitals() {
    callState.stage = 'asking_vitals';
    await speak("Do you have any vital signs measurements like temperature, respiratory rate, or heart rate?");
    callState.awaitingResponse = true;
    startListening();
}

async function collectVitals() {
    // Temperature
    callState.stage = 'collecting_temperature';
    await speak("What is the patient's temperature in degrees Celsius?");
    callState.awaitingResponse = true;
    startListening();
}

async function collectRespiratoryRate() {
    callState.stage = 'collecting_rr';
    await speak("What is the respiratory rate? How many breaths per minute?");
    callState.awaitingResponse = true;
    startListening();
}

async function collectHeartRate() {
    callState.stage = 'collecting_hr';
    await speak("What is the heart rate? How many beats per minute?");
    callState.awaitingResponse = true;
    startListening();
}

async function collectBloodPressure() {
    callState.stage = 'collecting_bp';
    await speak("Do you have a blood pressure reading? If yes, please tell me the systolic over diastolic values.");
    callState.awaitingResponse = true;
    startListening();
}

async function askMedicalHistory() {
    callState.stage = 'asking_history';
    await speak("To improve the accuracy of my assessment, I'd like to ask about medical history. Does the patient have any chronic medical conditions like diabetes, hypertension, or asthma?");
    callState.awaitingResponse = true;
    startListening();
}

async function askMedications() {
    callState.stage = 'collecting_medications';
    await speak("Is the patient currently taking any medications? Please list them.");
    callState.awaitingResponse = true;
    startListening();
}

async function askAllergies() {
    callState.stage = 'collecting_allergies';
    await speak("Does the patient have any known allergies to medications or other substances?");
    callState.awaitingResponse = true;
    startListening();
}

async function confirmInformation() {
    callState.stage = 'confirming';

    const data = callState.patientData;
    let summary = "Let me summarize the information you've provided. ";

    summary += `The patient is ${data.age} years old, ${data.sex}. `;
    if (data.pregnancy_status) summary += "The patient is pregnant. ";
    summary += `Symptoms include: ${data.symptoms}. `;
    if (data.symptomDetails) summary += `Additional details: ${data.symptomDetails}. `;
    summary += `These symptoms have been present for ${data.duration_days} days. `;

    if (data.temp_c) summary += `Temperature is ${data.temp_c} degrees Celsius. `;
    if (data.rr) summary += `Respiratory rate is ${data.rr} breaths per minute. `;
    if (data.hr) summary += `Heart rate is ${data.hr} beats per minute. `;
    if (data.bp_systolic) summary += `Blood pressure is ${data.bp_systolic} over ${data.bp_diastolic}. `;

    if (data.chronic_conditions.length > 0) {
        summary += `Chronic conditions: ${data.chronic_conditions.join(', ')}. `;
    }
    if (data.medications.length > 0) {
        summary += `Current medications: ${data.medications.join(', ')}. `;
    }
    if (data.allergies.length > 0) {
        summary += `Known allergies: ${data.allergies.join(', ')}. `;
    }

    summary += "Is this information correct?";

    await speak(summary);
    callState.awaitingResponse = true;
    startListening();
}

// Process Response
async function processResponse(text) {
    callState.awaitingResponse = false;
    addToConversation('user', text);

    const lowerText = text.toLowerCase();

    switch (callState.stage) {
        case 'collecting_age':
            const ageMatch = text.match(/(\d+)/);
            if (ageMatch) {
                callState.patientData.age = parseInt(ageMatch[1]);
                await askSex();
            } else {
                await speak("I didn't catch the age. Please tell me the patient's age in years.");
                callState.awaitingResponse = true;
                startListening();
            }
            break;

        case 'collecting_sex':
            if (lowerText.includes('male') && !lowerText.includes('female')) {
                callState.patientData.sex = 'M';
                await askSymptoms();
            } else if (lowerText.includes('female')) {
                callState.patientData.sex = 'F';
                await askPregnancy();
            } else {
                callState.patientData.sex = 'O';
                await askSymptoms();
            }
            break;

        case 'collecting_pregnancy':
            callState.patientData.pregnancy_status = lowerText.includes('yes');
            await askSymptoms();
            break;

        case 'collecting_symptoms':
            callState.patientData.symptoms = text;
            await askAdditionalSymptoms();
            break;

        case 'collecting_additional_symptoms':
            if (!lowerText.includes('no') && !lowerText.includes('nothing')) {
                callState.patientData.symptomDetails = text;
            }
            await askDuration();
            break;

        case 'collecting_duration':
            const duration = parseDuration(text);
            callState.patientData.duration_days = duration;
            await askVitals();
            break;

        case 'asking_vitals':
            if (lowerText.includes('yes')) {
                await collectVitals();
            } else {
                await askMedicalHistory();
            }
            break;

        case 'collecting_temperature':
            const tempMatch = text.match(/(\d+\.?\d*)/);
            if (tempMatch) {
                callState.patientData.temp_c = parseFloat(tempMatch[1]);
            }
            await collectRespiratoryRate();
            break;

        case 'collecting_rr':
            const rrMatch = text.match(/(\d+)/);
            if (rrMatch) {
                callState.patientData.rr = parseInt(rrMatch[1]);
            }
            await collectHeartRate();
            break;

        case 'collecting_hr':
            const hrMatch = text.match(/(\d+)/);
            if (hrMatch) {
                callState.patientData.hr = parseInt(hrMatch[1]);
            }
            await collectBloodPressure();
            break;

        case 'collecting_bp':
            const bpMatch = text.match(/(\d+)\s*(?:over|\/)\s*(\d+)/);
            if (bpMatch) {
                callState.patientData.bp_systolic = parseInt(bpMatch[1]);
                callState.patientData.bp_diastolic = parseInt(bpMatch[2]);
            }
            await askMedicalHistory();
            break;

        case 'asking_history':
            if (lowerText.includes('yes') || (!lowerText.includes('no') && text.length > 10)) {
                callState.patientData.chronic_conditions = parseList(text);
                await askMedications();
            } else {
                await askMedications();
            }
            break;

        case 'collecting_medications':
            if (!lowerText.includes('no') && !lowerText.includes('none')) {
                callState.patientData.medications = parseList(text);
            }
            await askAllergies();
            break;

        case 'collecting_allergies':
            if (!lowerText.includes('no') && !lowerText.includes('none')) {
                callState.patientData.allergies = parseList(text);
            }
            await confirmInformation();
            break;

        case 'confirming':
            if (lowerText.includes('yes') || lowerText.includes('correct')) {
                await performTriage();
            } else {
                await speak("Let's start over to ensure we have accurate information.");
                await askAge();
            }
            break;
    }
}

// Helper Functions
function parseDuration(text) {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('hour')) {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) / 24 : 0.5;
    } else if (lowerText.includes('day')) {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) : 1;
    } else if (lowerText.includes('week')) {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) * 7 : 7;
    } else if (lowerText.includes('month')) {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1]) * 30 : 30;
    }

    // Default to 1 day if unclear
    return 1;
}

function parseList(text) {
    // Remove common filler words
    const cleaned = text.toLowerCase()
        .replace(/yes,?\s*/gi, '')
        .replace(/i have\s*/gi, '')
        .replace(/the patient has\s*/gi, '')
        .replace(/\band\b/gi, ',');

    return cleaned.split(',')
        .map(item => item.trim())
        .filter(item => item.length > 2);
}

// Perform Triage
async function performTriage() {
    callState.stage = 'analyzing';
    await speak("Thank you for all that information. Let me analyze this data now. Please wait a moment.");

    try {
        const data = callState.patientData;

        const input = {
            age: data.age,
            sex: data.sex,
            symptoms: `${data.symptoms} ${data.symptomDetails}`.trim(),
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
                console.warn('Offline analysis failed');
            }
        }

        // Try API if offline failed
        if (!result && navigator.onLine) {
            try {
                const response = await fetch(`${API_BASE}/triage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ intake: input })
                });
                result = await response.json();
                result.source = 'online';
            } catch (error) {
                console.warn('API call failed');
            }
        }

        // Fallback
        if (!result) {
            result = performBasicTriage(input);
            result.source = 'fallback';
        }

        callState.triageResult = result;
        await presentResults(result);

    } catch (error) {
        console.error('Triage failed:', error);
        await speak("I apologize, but I encountered an error during analysis. Please try again or seek immediate medical attention if this is an emergency.");
        endCall();
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
        reasoning: `Based on the symptoms described`,
        actions: [
            tier === 'RED' ? 'Seek immediate medical attention' : 'Monitor symptoms closely',
            'Ensure adequate hydration',
            'Get plenty of rest'
        ]
    };
}

async function presentResults(result) {
    callState.stage = 'presenting_results';

    let message = "Based on my analysis, here are my findings. ";

    // Tier
    if (result.tier === 'RED') {
        message += "This is classified as a RED tier case, which means it's an EMERGENCY. ";
    } else if (result.tier === 'YELLOW') {
        message += "This is classified as a YELLOW tier case, which means it's URGENT. ";
    } else {
        message += "This is classified as a GREEN tier case, which means it's ROUTINE. ";
    }

    // Diagnosis
    message += `The likely diagnosis is: ${result.diagnosis}. `;
    message += `I am ${result.confidence} percent confident in this assessment. `;

    // Reasoning
    message += `My reasoning is as follows: ${result.reasoning.substring(0, 200)}. `;

    // Actions
    message += "Here are the recommended actions, in order of priority: ";
    result.actions.forEach((action, index) => {
        message += `${index + 1}. ${action}. `;
    });

    // Source
    if (result.source === 'offline') {
        message += "This assessment was performed using offline AI analysis. ";
    } else if (result.source === 'online') {
        message += "This assessment was enhanced with online AI analysis. ";
    }

    message += "Do you have any questions about this assessment?";

    await speak(message);

    callState.awaitingResponse = true;
    startListening();
}

// UI Updates
function updateStatus(status, text, subtext) {
    statusIndicator.className = `status-indicator ${status}`;
    statusText.textContent = text;
    statusSubtext.textContent = subtext;
}

function updateTranscript(text) {
    transcript.textContent = text;
}

function addToConversation(speaker, text) {
    const entry = document.createElement('div');
    entry.className = `conversation-entry ${speaker}`;

    const timestamp = new Date().toLocaleTimeString();
    entry.innerHTML = `
        <span class="timestamp">${timestamp}</span>
        <span class="speaker">${speaker === 'ai' ? 'AI' : speaker === 'user' ? 'User' : 'System'}:</span>
        <span class="text">${text}</span>
    `;

    conversationLog.appendChild(entry);
    conversationLog.scrollTop = conversationLog.scrollHeight;
}

function startWaveformAnimation() {
    waveform.classList.add('active');
}

function stopWaveformAnimation() {
    waveform.classList.remove('active');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for testing
export { callState, startCall, endCall, speak };

// ========== Global Functions (for onclick handlers) ==========
window.startCall = startCall;
window.endCall = endCall;
window.toggleMic = toggleMic;
