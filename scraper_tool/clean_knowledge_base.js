#!/usr/bin/env node
/**
 * Clinical Knowledge Base Cleaner (Node.js version)
 * Transforms raw NHS scraped data into structured, intelligent medical knowledge
 */

const fs = require('fs');
const path = require('path');

// Import the knowledge base
const knowledgeBasePath = path.join(__dirname, '../web_app/clinical_knowledge.js');
const rawContent = fs.readFileSync(knowledgeBasePath, 'utf8');

// Extract the object using regex
const match = rawContent.match(/export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});/);
if (!match) {
    console.error('❌ Could not parse knowledge base file');
    process.exit(1);
}

// Use Function constructor to safely evaluate the object
const CLINICAL_KNOWLEDGE_BASE = new Function(`return ${match[1]}`)();

console.log('🧹 Starting Clinical Knowledge Base Cleaning...');
console.log(`✅ Found ${Object.keys(CLINICAL_KNOWLEDGE_BASE).length} conditions\n`);

// Danger sign keywords for tier classification
const RED_KEYWORDS = [
    'meningitis', 'sepsis', 'stroke', 'heart attack', 'cardiac arrest',
    'anaphylaxis', 'severe bleeding', 'unconscious', 'seizure', 'coma',
    'difficulty breathing', 'chest pain', 'blue lips', 'severe dehydration',
    'diabetic ketoacidosis', 'ectopic pregnancy', 'appendicitis', 'convulsions'
];

const YELLOW_KEYWORDS = [
    'pneumonia', 'dehydration', 'chest infection', 'kidney infection',
    'high fever', 'cellulitis', 'deep vein thrombosis', 'angioedema',
    'middle ear infection', 'acute', 'severe', 'persistent vomiting'
];

function classifyTier(condition) {
    const diagnosisLower = condition.diagnosis.toLowerCase();
    const symptomsText = (condition.symptoms || []).join(' ').toLowerCase();
    const treatmentText = (condition.treatment || []).join(' ').toLowerCase();

    // Check for RED flags
    for (const keyword of RED_KEYWORDS) {
        if (diagnosisLower.includes(keyword) || symptomsText.includes(keyword)) {
            return 'RED';
        }
    }

    // Check for YELLOW flags
    for (const keyword of YELLOW_KEYWORDS) {
        if (diagnosisLower.includes(keyword) || symptomsText.includes(keyword)) {
            return 'YELLOW';
        }
    }

    // Check for urgent language in treatment
    if (treatmentText.includes('emergency') || treatmentText.includes('999') ||
        treatmentText.includes('urgent') || treatmentText.includes('immediately')) {
        return 'RED';
    }

    return condition.tier || 'GREEN';
}

function cleanCondition(key, condition) {
    const tier = classifyTier(condition);

    // Clean symptoms - remove metadata
    const symptoms = (condition.symptoms || [])
        .filter(s => s && s.length > 5)
        .filter(s => !s.toLowerCase().includes('are pregnant'))
        .filter(s => !s.toLowerCase().includes('nhs inform'))
        .filter(s => !s.toLowerCase().includes('macmillan'))
        .slice(0, 15);

    // Clean treatments
    const treatment = (condition.treatment || [])
        .filter(t => t && t.length > 10)
        .filter(t => !t.toLowerCase().includes('are pregnant'))
        .filter(t => !t.toLowerCase().includes('macmillan'))
        .slice(0, 10);

    // Generate better reasoning
    let reasoning;
    if (tier === 'RED') {
        reasoning = `${condition.diagnosis} is a medical emergency requiring immediate hospital treatment. Delays can lead to serious complications including organ failure or death.`;
    } else if (tier === 'YELLOW') {
        reasoning = `${condition.diagnosis} requires prompt medical evaluation as symptoms can worsen rapidly. Early treatment significantly improves outcomes.`;
    } else {
        reasoning = `${condition.diagnosis} can typically be managed with self-care measures. However, seek medical advice if symptoms persist beyond 7 days or worsen.`;
    }

    return {
        id: key,
        diagnosis: condition.diagnosis,
        tier,
        symptoms,
        reasoning,
        treatment,
        source: 'NHS Inform',
        last_updated: '2026-01-16'
    };
}

// Clean all conditions
const cleanedConditions = {};
const stats = { RED: 0, YELLOW: 0, GREEN: 0 };

for (const [key, condition] of Object.entries(CLINICAL_KNOWLEDGE_BASE)) {
    try {
        const cleaned = cleanCondition(key, condition);
        cleanedConditions[key] = cleaned;
        stats[cleaned.tier]++;
    } catch (error) {
        console.error(`⚠️  Error cleaning ${key}:`, error.message);
    }
}

console.log(`📊 Cleaning Statistics:`);
console.log(`   🔴 RED (Emergency): ${stats.RED}`);
console.log(`   🟡 YELLOW (Urgent): ${stats.YELLOW}`);
console.log(`   🟢 GREEN (Self-care): ${stats.GREEN}\n`);

// Save cleaned data
const outputPath = path.join(__dirname, '../web_app/clinical_knowledge_cleaned.js');
const output = `// Auto-generated cleaned clinical knowledge base
// Last updated: 2026-01-16

export const CLINICAL_KNOWLEDGE_BASE = ${JSON.stringify(cleanedConditions, null, 2)};
`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`✅ Cleaned data saved to: ${outputPath}\n`);

// Create data directory
const dataDir = path.join(__dirname, '../web_app/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Save symptom synonyms
const synonyms = {
    "fever": ["high temperature", "hot body", "burning up", "pyrexia"],
    "vomiting": ["being sick", "throwing up", "nausea and vomiting"],
    "diarrhea": ["diarrhoea", "loose stool", "watery stool"],
    "headache": ["head pain", "migraine"],
    "cough": ["coughing", "persistent cough"],
    "rash": ["skin rash", "spots", "red skin"],
    "pain": ["ache", "discomfort", "soreness"],
    "breathing difficulty": ["shortness of breath", "breathlessness", "wheezing"],
    "confusion": ["disorientation", "confused"],
    "weakness": ["fatigue", "tiredness", "lethargy"]
};

fs.writeFileSync(
    path.join(dataDir, 'symptom_synonyms.json'),
    JSON.stringify(synonyms, null, 2),
    'utf8'
);

console.log(`✅ Symptom synonyms saved\n`);
console.log('🎉 Cleaning complete!');
