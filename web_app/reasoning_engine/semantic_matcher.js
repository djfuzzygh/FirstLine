/**
 * Enhanced Condition Matcher with TensorFlow.js
 * Uses Universal Sentence Encoder for semantic similarity
 */

import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

class SemanticConditionMatcher {
    constructor(knowledgeBase) {
        this.kb = knowledgeBase;
        this.model = null;
        this.conditionEmbeddings = null;
        this.conditionKeys = [];
    }

    async initialize() {
        console.log('🤖 Loading Universal Sentence Encoder...');

        try {
            // Load USE model
            this.model = await use.load();
            console.log('✅ Model loaded successfully');

            // Pre-compute embeddings for all conditions
            await this.precomputeEmbeddings();
            console.log(`✅ Pre-computed embeddings for ${this.conditionKeys.length} conditions`);

        } catch (error) {
            console.warn('⚠️  Could not load TensorFlow model:', error.message);
            console.warn('Falling back to keyword matching');
            this.model = null;
        }
    }

    async precomputeEmbeddings() {
        const conditionTexts = [];
        this.conditionKeys = [];

        for (const [key, condition] of Object.entries(this.kb)) {
            if (!condition.symptoms || condition.symptoms.length === 0) continue;

            // Create rich text representation
            const text = `${condition.diagnosis}. Symptoms: ${condition.symptoms.join(', ')}`;
            conditionTexts.push(text);
            this.conditionKeys.push(key);
        }

        // Batch embed all conditions
        this.conditionEmbeddings = await this.model.embed(conditionTexts);
    }

    async matchConditions(symptoms, topK = 10) {
        if (!this.model) {
            // Fallback to keyword matching
            return this.keywordMatch(symptoms, topK);
        }

        // Create query text
        const queryText = `Patient symptoms: ${symptoms.join(', ')}`;

        // Get embedding for query
        const queryEmbedding = await this.model.embed([queryText]);

        // Calculate cosine similarity
        const similarities = await this.cosineSimilarity(
            queryEmbedding,
            this.conditionEmbeddings
        );

        // Get top K matches
        const topIndices = this.getTopK(similarities, topK);

        // Map back to conditions
        const matches = topIndices.map(({ index, score }) => {
            const key = this.conditionKeys[index];
            const condition = this.kb[key];

            return {
                ...condition,
                key,
                score: score * 100, // Convert to percentage
                matchedSymptoms: this.getMatchedSymptoms(symptoms, condition.symptoms)
            };
        });

        // Clean up tensors
        queryEmbedding.dispose();

        return matches;
    }

    async cosineSimilarity(queryEmbedding, conditionEmbeddings) {
        // Normalize embeddings
        const queryNorm = tf.norm(queryEmbedding, 2, 1, true);
        const condNorm = tf.norm(conditionEmbeddings, 2, 1, true);

        const queryNormalized = tf.div(queryEmbedding, queryNorm);
        const condNormalized = tf.div(conditionEmbeddings, condNorm);

        // Compute dot product (cosine similarity)
        const similarity = tf.matMul(
            queryNormalized,
            condNormalized,
            false,
            true
        );

        // Get values
        const values = await similarity.array();

        // Clean up
        queryNorm.dispose();
        condNorm.dispose();
        queryNormalized.dispose();
        condNormalized.dispose();
        similarity.dispose();

        return values[0]; // Return 1D array
    }

    getTopK(scores, k) {
        const indexed = scores.map((score, index) => ({ index, score }));
        indexed.sort((a, b) => b.score - a.score);
        return indexed.slice(0, k);
    }

    getMatchedSymptoms(userSymptoms, conditionSymptoms) {
        return userSymptoms.filter(us =>
            conditionSymptoms.some(cs =>
                this.areSimilar(us, cs)
            )
        );
    }

    areSimilar(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        if (s1 === s2) return true;
        if (s1.includes(s2) || s2.includes(s1)) return true;

        return this.levenshtein(s1, s2) < 3;
    }

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

    // Fallback keyword matching
    keywordMatch(symptoms, topK) {
        const matches = [];

        for (const [key, condition] of Object.entries(this.kb)) {
            if (!condition.symptoms || condition.symptoms.length === 0) continue;

            let score = 0;
            const matched = new Set();

            for (const userSymptom of symptoms) {
                for (const condSymptom of condition.symptoms) {
                    if (this.areSimilar(userSymptom, condSymptom)) {
                        score += 10;
                        matched.add(condSymptom);
                    }
                }
            }

            if (score > 0) {
                const coverage = matched.size / condition.symptoms.length;
                score *= (1 + coverage);

                matches.push({
                    ...condition,
                    key,
                    score,
                    matchedSymptoms: Array.from(matched)
                });
            }
        }

        return matches.sort((a, b) => b.score - a.score).slice(0, topK);
    }
}

export default SemanticConditionMatcher;
