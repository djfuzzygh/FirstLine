/**
 * Test Clinical Reasoning Engine
 */

import ClinicalReasoningEngine from './reasoning_engine/index.js';

const engine = new ClinicalReasoningEngine();

async function runTests() {
    console.log('🧪 Testing Clinical Reasoning Engine\n');
    console.log('═'.repeat(60));

    await engine.initialize();

    // Test Case 1: Meningitis (RED)
    console.log('\n📋 TEST CASE 1: Suspected Meningitis');
    console.log('─'.repeat(60));
    const case1 = await engine.analyze({
        symptoms: ['fever', 'stiff neck', 'headache', 'vomiting'],
        vitals: { temperature: 39.5, heartRate: 120 },
        age: 3
    });

    console.log(`Diagnosis: ${case1.diagnosis}`);
    console.log(`Tier: ${case1.tier}`);
    console.log(`Confidence: ${case1.confidence}%`);
    console.log(`Danger Signs: ${case1.dangerSigns.length}`);
    console.log(`\nReasoning:\n${case1.reasoning}`);
    console.log(`\nActions:`);
    case1.actions.forEach((a, i) => console.log(`${i + 1}. [${a.priority}] ${a.action}`));

    // Test Case 2: Common Cold (GREEN)
    console.log('\n\n📋 TEST CASE 2: Common Cold');
    console.log('─'.repeat(60));
    const case2 = await engine.analyze({
        symptoms: ['runny nose', 'cough', 'sore throat'],
        vitals: { temperature: 37.2 },
        age: 25
    });

    console.log(`Diagnosis: ${case2.diagnosis}`);
    console.log(`Tier: ${case2.tier}`);
    console.log(`Confidence: ${case2.confidence}%`);
    console.log(`\nReasoning:\n${case2.reasoning}`);
    console.log(`\nActions:`);
    case2.actions.forEach((a, i) => console.log(`${i + 1}. [${a.priority}] ${a.action}`));

    // Test Case 3: Pneumonia (YELLOW)
    console.log('\n\n📋 TEST CASE 3: Suspected Pneumonia');
    console.log('─'.repeat(60));
    const case3 = await engine.analyze({
        symptoms: ['cough', 'fever', 'breathing difficulty', 'chest pain'],
        vitals: { temperature: 38.8, respiratoryRate: 28 },
        age: 45
    });

    console.log(`Diagnosis: ${case3.diagnosis}`);
    console.log(`Tier: ${case3.tier}`);
    console.log(`Confidence: ${case3.confidence}%`);
    console.log(`\nReasoning:\n${case3.reasoning}`);
    console.log(`\nActions:`);
    case3.actions.forEach((a, i) => console.log(`${i + 1}. [${a.priority}] ${a.action}`));

    console.log('\n' + '═'.repeat(60));
    console.log('✅ All tests completed!\n');
}

runTests().catch(console.error);
