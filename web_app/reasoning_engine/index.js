/**
 * Clinical Reasoning Engine - Main Orchestrator
 * Implements hybrid rule-based + ML approach for intelligent triage
 */

import { CLINICAL_KNOWLEDGE_BASE } from '../clinical_knowledge_cleaned.js';
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
        const reasoning = this.generateReasoning(topMatch, normalizedSymptoms, vitals, dangerAssessment);

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
            const ageThresholds = {
                '<2months': 60,
                '2-12months': 50,
                '1-5years': 40
            };

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
        // Use semantic matcher (TensorFlow.js if available, fallback to keyword)
        return await this.semanticMatcher.matchConditions(symptoms, 10);
    }

    /**
     * Calculate TF-IDF-like similarity
     */
    calculateSimilarity(userSymptoms, conditionSymptoms) {
        let score = 0;
        const matched = new Set();

        for (const userSymptom of userSymptoms) {
            for (const condSymptom of conditionSymptoms) {
                if (this.areSimilar(userSymptom, condSymptom)) {
                    score += 10;
                    matched.add(condSymptom);
                }
            }
        }

        // Bonus for high coverage
        const coverage = matched.size / conditionSymptoms.length;
        score *= (1 + coverage);

        return score;
    }

    /**
     * Check if two symptoms are similar
     */
    areSimilar(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        // Exact match
        if (s1 === s2) return true;

        // Substring match
        if (s1.includes(s2) || s2.includes(s1)) return true;

        // Levenshtein distance < 3
        return this.levenshtein(s1, s2) < 3;
    }

    /**
     * Levenshtein distance
     */
    levenshtein(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    /**
     * Get matched symptoms
     */
    getMatchedSymptoms(userSymptoms, conditionSymptoms) {
        return userSymptoms.filter(us =>
            conditionSymptoms.some(cs => this.areSimilar(us, cs))
        );
    }

    /**
     * Layer 4: Bayesian Ranking
     */
    rankMatches(matches, dangerAssessment, age) {
        return matches.map(match => {
            // Prior: condition prevalence (would be loaded from data)
            const prior = 0.001; // Default

            // Likelihood: symptom match score
            let likelihood = match.score / 100;

            // Boost for danger signs
            if (match.tier === 'RED' && dangerAssessment.hasDangerSigns) {
                likelihood *= 3.0;
            }

            // Boost for tier match
            if (match.tier === dangerAssessment.severity) {
                likelihood *= 1.5;
            }

            // Posterior probability
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
     * Layer 5: Generate Clinical Reasoning
     */
    generateReasoning(match, symptoms, vitals, dangerAssessment) {
        const parts = [];

        // Symptom match explanation
        parts.push(`You have ${match.matchedSymptoms.length} symptoms consistent with ${match.diagnosis}:`);
        parts.push(`• ${match.matchedSymptoms.slice(0, 5).join(', ')}`);

        // Danger sign context
        if (dangerAssessment.hasDangerSigns) {
            parts.push(`\n⚠️ DANGER SIGNS DETECTED:`);
            parts.push(dangerAssessment.flags.map(f => `• ${f}`).join('\n'));
        }

        // Vital sign context
        if (vitals.temperature && vitals.temperature > 38) {
            parts.push(`\nYour temperature of ${vitals.temperature}°C indicates active infection or inflammation.`);
        }

        // Clinical reasoning from knowledge base
        parts.push(`\n${match.reasoning}`);

        return parts.join('\n');
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
