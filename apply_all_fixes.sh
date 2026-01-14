#!/bin/bash
# FirstLine - One-Command Fix Script
# This applies all critical fixes automatically

echo "🔧 FirstLine Auto-Fix Script"
echo "=============================="
echo ""

# Navigate to project root
cd "$(dirname "$0")"

# Backup original file
echo "📦 Creating backup..."
cp web_app/main.js web_app/main.js.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Backup created"
echo ""

# Apply the follow-up fix
echo "🔨 Applying follow-up text input fix..."

# Use Python to do a precise replacement
python3 << 'PYTHON_SCRIPT'
import re

# Read the file
with open('web_app/main.js', 'r') as f:
    content = f.read()

# Find and replace the renderFollowUp function
# Pattern to match the function
pattern = r'// Follow-up Rendering\nfunction renderFollowUp\(questions\) \{[^}]*(?:\{[^}]*\}[^}]*)*\}'

replacement = '''// Follow-up Rendering with Text Input Support
function renderFollowUp(questions) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'form-group';
        qDiv.style.animation = `slideUp 0.4s ease-out ${idx * 0.1}s both`;
        
        // Detect if question is open-ended
        const questionLower = (q.question || '').toLowerCase();
        const hasOptions = q.options && q.options.length > 0;
        const isOpenEnded = !hasOptions || 
                           questionLower.includes('describe') ||
                           questionLower.includes('explain') ||
                           questionLower.includes('how long') ||
                           questionLower.includes('when') ||
                           questionLower.includes('what') ||
                           questionLower.includes('where');
        
        const label = document.createElement('label');
        label.style.marginTop = '20px';
        label.textContent = `Q${idx + 1}: ${q.question}`;
        qDiv.appendChild(label);
        
        if (isOpenEnded && !hasOptions) {
            // Text input for open-ended questions
            const textarea = document.createElement('textarea');
            textarea.className = 'followup-text-input';
            textarea.setAttribute('data-q', q.question);
            textarea.placeholder = 'Enter your response...';
            textarea.rows = 3;
            textarea.style.cssText = 'width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; resize: vertical; margin-top: 8px; font-family: inherit;';
            
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
            // Button grid for multiple choice
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';
            
            const options = q.options || ['Yes', 'No', 'Unsure'];
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'btn q-opt';
                btn.setAttribute('data-q', q.question);
                btn.setAttribute('data-val', opt);
                btn.style.cssText = 'background: white; border: 1px solid #e2e8f0; font-size: 14px; padding: 10px;';
                btn.textContent = opt;
                
                btn.addEventListener('click', (e) => {
                    const q = e.target.getAttribute('data-q');
                    const val = e.target.getAttribute('data-val');
                    
                    // Reset all buttons
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
}'''

# Try to replace
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

if new_content == content:
    print("⚠️  Pattern not found, trying line-based replacement...")
    # Fallback: replace by line numbers (347-396)
    lines = content.split('\n')
    # Find the function start
    for i, line in enumerate(lines):
        if 'function renderFollowUp(questions)' in line:
            # Find the end of the function
            brace_count = 0
            start_idx = i
            for j in range(i, len(lines)):
                brace_count += lines[j].count('{') - lines[j].count('}')
                if brace_count == 0 and j > i:
                    end_idx = j
                    break
            
            # Replace
            lines[start_idx:end_idx+1] = replacement.split('\n')
            new_content = '\n'.join(lines)
            break

# Write back
with open('web_app/main.js', 'w') as f:
    f.write(new_content)

print("✅ Follow-up fix applied")
PYTHON_SCRIPT

echo ""
echo "✅ All fixes applied successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Refresh your browser: http://localhost:5173/"
echo "2. Test with a demo case"
echo "3. Check that text inputs appear for open-ended questions"
echo ""
echo "🔍 To access backend:"
echo "   Swagger UI: http://localhost:8000/docs"
echo "   Terminal logs: Check where you ran 'python3 main.py'"
echo ""
echo "📚 For more help, see: HOW_TO_ACCESS_AND_FIX.md"
