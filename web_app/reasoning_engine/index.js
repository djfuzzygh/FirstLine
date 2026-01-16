/**
 * Clinical Reasoning Engine - Main Orchestrator
 * Implements hybrid rule-based + ML approach for intelligent triage
 */

import { CLINICAL_KNOWLEDGE_BASE } from '../clinical_knowledge_medgemma.js';
import SemanticConditionMatcher from './semantic_matcher.js';

class ClinicalReasoningEngine {
    constructor() {
        this.knowledgeBase = CLINICAL_KNOWLEDGE_BASE;
        this.semanticMatcher = new SemanticConditionMatcher(this.knowledgeBase);
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        console.log('🧠 Initializing Clinical Reasoning Engine...');
        console.log(`📚 Loaded ${Object.keys(this.knowledgeBase).length} conditions`);

        // Initialize semantic matcher (with TensorFlow.js)
        await this.semanticMatcher.initialize();

        this.initialized = true;
    }

    /**
     * Main reasoning pipeline
     * @param {Object} input - Patient data
     * @returns {Object} Triage decision with reasoning
     */
    async analyze(input) {
        if (!this.initialized) await this.initialize();

        const {
            symptoms = [],
            vitals = {},
            age = null,
            sex = 'unknown',
            duration = null,
            history = []
        } = input;

        // Layer 1: Normalize symptoms
        const normalizedSymptoms = this.normalizeSymptoms(symptoms);

        // Layer 2: Danger sign detection (FAST - rule-based)
        const dangerAssessment = this.detectDangerSigns(normalizedSymptoms, vitals, age);

        // Layer 3: Match conditions (Semantic + TF-IDF)
        const matches = await this.matchConditions(normalizedSymptoms, vitals, age);

        // Layer 4: Bayesian ranking
        const rankedMatches = this.rankMatches(matches, dangerAssessment, age);

        // Layer 5: Generate reasoning
        const topMatch = rankedMatches[0];
        const reasoning = this.generateReasoning(topMatch, normalizedSymptoms, vitals, dangerAssessment, age, sex);

        // Layer 6: Treatment synthesis
        const actions = this.synthesizeTreatment(topMatch, dangerAssessment, vitals);

        return {
            tier: topMatch.tier,
            diagnosis: topMatch.diagnosis,
            confidence: topMatch.confidence,
            reasoning,
            actions,
            differentialDiagnosis: rankedMatches.slice(1, 4).map(m => ({
                diagnosis: m.diagnosis,
                confidence: m.confidence
            })),
            dangerSigns: dangerAssessment.flags
        };
    }

    /**
     * Layer 1: Symptom Normalization
     */
    normalizeSymptoms(symptoms) {
        const synonymMap = {
            'hot body': 'fever',
            'high temperature': 'fever',
            'throwing up': 'vomiting',
            'being sick': 'vomiting',
            'loose stool': 'diarrhea',
            'watery stool': 'diarrhea',
            'head pain': 'headache',
            'shortness of breath': 'breathing difficulty',
            'breathlessness': 'breathing difficulty'
        };

        return symptoms.map(s => {
            const lower = s.toLowerCase().trim();
            return synonymMap[lower] || lower;
        });
    }

    /**
     * Layer 2: Danger Sign Detection (Rule-Based)
     */
    detectDangerSigns(symptoms, vitals, age) {
        const flags = [];
        let hasDangerSigns = false;

        // Critical symptoms
        const criticalSymptoms = [
            'stiff neck', 'convulsions', 'unconscious', 'blue lips',
            'severe bleeding', 'chest pain', 'difficulty breathing',
            'vomits everything', 'lethargic'
        ];

        for (const symptom of symptoms) {
            if (criticalSymptoms.some(cs => symptom.includes(cs))) {
                flags.push(`CRITICAL: ${symptom}`);
                hasDangerSigns = true;
            }
        }

        // Vital sign thresholds
        if (vitals.temperature) {
            if (age < 3 && vitals.temperature > 38) {
                flags.push(`High fever in infant (${vitals.temperature}°C)`);
                hasDangerSigns = true;
            } else if (vitals.temperature > 39.5) {
                flags.push(`Very high fever (${vitals.temperature}°C)`);
                hasDangerSigns = true;
            }
        }

        if (vitals.respiratoryRate) {
            if (age < 0.17 && vitals.respiratoryRate > 60) {
                flags.push(`Fast breathing for age (${vitals.respiratoryRate}/min)`);
                hasDangerSigns = true;
            }
        }

        return { hasDangerSigns, flags, severity: hasDangerSigns ? 'RED' : 'UNKNOWN' };
    }

    /**
     * Layer 3: Condition Matching (Semantic + TF-IDF)
     */
    async matchConditions(symptoms, vitals, age) {
        return await this.semanticMatcher.matchConditions(symptoms, 10);
    }

    /**
     * Layer 4: Bayesian Ranking
     */
    rankMatches(matches, dangerAssessment, age) {
        return matches.map(match => {
            const prior = 0.001;
            let likelihood = match.score / 100;

            if (match.tier === 'RED' && dangerAssessment.hasDangerSigns) {
                likelihood *= 3.0;
            }

            if (match.tier === dangerAssessment.severity) {
                likelihood *= 1.5;
            }

            const posterior = likelihood * prior;
            const confidence = Math.min(Math.round(posterior * 10000), 99);

            return {
                ...match,
                confidence,
                posterior
            };
        }).sort((a, b) => b.confidence - a.confidence);
    }

    /**
     * Layer 5: Generate Clinical Reasoning (Enhanced)
     */
    generateReasoning(match, symptoms, vitals, dangerAssessment, age, sex) {
        const parts = [];

        // 1. Patient Context & Diagnosis
        parts.push(`**Assessment for ${age || '?'}yo ${sex}:** Presentation is consistent with **${match.diagnosis}**.`);

        // 2. Symptom Evidence
        if (match.matchedSymptoms && match.matchedSymptoms.length > 0) {
            parts.push(`Identified key correlation with: ${match.matchedSymptoms.join(', ')}.`);
        }

        // 3. Vital Signs Context
        if (vitals.temperature) {
            if (vitals.temperature > 38) parts.push(`Fever of ${vitals.temperature}°C significantly increases infection probability.`);
            else if (vitals.temperature < 36) parts.push(`Hypothermia (${vitals.temperature}°C) is a critical warning sign.`);
        }
        if (vitals.systolicBP && vitals.systolicBP < 90) {
            parts.push(`Hypotension (BP ${vitals.systolicBP}/${vitals.diastolicBP}) suggests possible shock.`);
        }

        // 4. Danger Analysis
        if (dangerAssessment.hasDangerSigns) {
            parts.push(`\n⚠️ **CRITICAL FINDINGS:** Detected danger signs (${dangerAssessment.flags.join(', ')}) which mandate immediate escalation to RED tier.`);
        }

        // 5. Clinical Knowledge Base Context
        if (match.reasoning) {
            parts.push(`\n**Protocol:** ${match.reasoning}`);
        }

        return parts.join(' ');
    }

    /**
     * Layer 6: Treatment Synthesis
     */
    synthesizeTreatment(match, dangerAssessment, vitals) {
        const actions = [];

        // Immediate actions for RED tier
        if (match.tier === 'RED' || dangerAssessment.hasDangerSigns) {
            actions.push({
                priority: 'URGENT',
                action: '🚨 Call 999 or go to A&E immediately',
                reason: 'Life-threatening condition requires emergency care'
            });
        }

        // Symptomatic relief
        if (vitals.temperature && vitals.temperature > 38.5) {
            actions.push({
                priority: 'HIGH',
                action: 'Take paracetamol 500mg every 6 hours',
                reason: 'Reduces fever and discomfort'
            });
        }

        // Specific treatments from knowledge base
        if (match.treatment && match.treatment.length > 0) {
            match.treatment.slice(0, 5).forEach(t => {
                actions.push({
                    priority: match.tier === 'YELLOW' ? 'MEDIUM' : 'LOW',
                    action: t,
                    reason: `Recommended for ${match.diagnosis}`
                });
            });
        }

        // Follow-up advice
        if (match.tier === 'GREEN') {
            actions.push({
                priority: 'LOW',
                action: 'Monitor symptoms for 48 hours',
                reason: 'Seek medical help if symptoms worsen or persist beyond 7 days'
            });
        }

        return actions;
    }
}

export default ClinicalReasoningEngine;
