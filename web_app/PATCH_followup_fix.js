// PATCH: Enhanced Follow-up Question Rendering with Text Input Support

// Add this function after the existing renderFollowUp function
function renderFollowUpEnhanced(questions) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'form-group';
        qDiv.style.animation = `slideUp 0.4s ease-out ${idx * 0.1}s both`;

        // Detect if question is open-ended
        const isOpenEnded = !q.options || q.options.length === 0 ||
            q.question.toLowerCase().includes('describe') ||
            q.question.toLowerCase().includes('explain') ||
            q.question.toLowerCase().includes('how long') ||
            q.question.toLowerCase().includes('when did') ||
            q.question.toLowerCase().includes('what') ||
            q.question.toLowerCase().includes('where');

        const label = document.createElement('label');
        label.style.marginTop = '20px';
        label.textContent = `Q${idx + 1}: ${q.question}`;
        qDiv.appendChild(label);

        if (isOpenEnded) {
            // Create text input for open-ended questions
            const textarea = document.createElement('textarea');
            textarea.className = 'followup-text-input';
            textarea.setAttribute('data-q', q.question);
            textarea.placeholder = 'Enter your response...';
            textarea.rows = 3;
            textarea.style.cssText = 'width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; resize: vertical; margin-top: 8px;';

            textarea.addEventListener('input', (e) => {
                const q = e.target.getAttribute('data-q');
                const val = e.target.value;

                if (val.trim()) {
                    caseData.followup_responses[q] = val;
                    updateQuestionProgress(questions.length);
                    addAuditEntry(`Answered: ${q} = ${val.substring(0, 50)}${val.length > 50 ? '...' : ''}`);
                }
            });

            qDiv.appendChild(textarea);
        } else {
            // Create button grid for multiple choice
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';

            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'btn q-opt';
                btn.setAttribute('data-q', q.question);
                btn.setAttribute('data-val', opt);
                btn.style.cssText = 'background: white; border: 1px solid #e2e8f0; font-size: 14px; padding: 10px;';
                btn.textContent = opt;

                btn.addEventListener('click', (e) => {
                    const q = e.target.getAttribute('data-q');
                    const val = e.target.getAttribute('data-val');

                    // Reset all buttons in this group
                    optionsGrid.querySelectorAll('.q-opt').forEach(b => {
                        b.style.borderColor = '#e2e8f0';
                        b.style.background = 'white';
                        b.style.color = '#0f172a';
                    });

                    // Highlight selected
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                    e.target.style.color = 'var(--primary-dark)';

                    caseData.followup_responses[q] = val;
                    updateQuestionProgress(questions.length);
                    addAuditEntry(`Answered: ${q} = ${val}`);
                });

                optionsGrid.appendChild(btn);
            });

            qDiv.appendChild(optionsGrid);
        }

        container.appendChild(qDiv);
    });
}

// Replace the call to renderFollowUp with renderFollowUpEnhanced in handleIntakeSubmit
