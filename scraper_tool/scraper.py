from flask import Flask, render_template, request, jsonify
from bs4 import BeautifulSoup
import requests
import json
import re
import time
from pathlib import Path

app = Flask(__name__)

# Path to clinical knowledge file
KNOWLEDGE_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge.js'

def scrape_nhs_page(url):
    """Scrape a single NHS Inform page and extract clinical data."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0',
        }
        
        session = requests.Session()
        response = session.get(url, headers=headers, timeout=15, allow_redirects=True)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title/diagnosis
        title_elem = soup.find('h1')
        diagnosis = title_elem.text.strip() if title_elem else "Unknown"
        
        # Extract symptoms
        symptoms = []
        symptoms_section = soup.find(['h2', 'h3'], string=re.compile(r'symptom', re.I))
        if symptoms_section:
            ul = symptoms_section.find_next('ul')
            if ul:
                symptoms = [li.text.strip().lower() for li in ul.find_all('li')]
        
        # Extract red flags (when to seek urgent help)
        red_flags = []
        urgent_section = soup.find(['h2', 'h3'], string=re.compile(r'when to (get|seek).*(urgent|emergency|999|111)', re.I))
        if urgent_section:
            ul = urgent_section.find_next('ul')
            if ul:
                red_flags = [li.text.strip() for li in ul.find_all('li')]
        
        # Extract treatment/self-help
        treatment = []
        treatment_section = soup.find(['h2', 'h3'], string=re.compile(r'treatment|self.?help|self.?care', re.I))
        if treatment_section:
            ul = treatment_section.find_next('ul')
            if ul:
                treatment = [li.text.strip() for li in ul.find_all('li')]
        
        # Determine tier based on content
        tier = "GREEN"
        if any(word in diagnosis.lower() for word in ['severe', 'emergency', 'meningitis', 'sepsis']):
            tier = "RED"
        elif red_flags or any(word in diagnosis.lower() for word in ['infection', 'pneumonia', 'dehydration']):
            tier = "YELLOW"
        
        return {
            'diagnosis': diagnosis,
            'tier': tier,
            'symptoms': symptoms[:10],  # Limit to top 10
            'red_flags': red_flags[:5],
            'treatment': treatment[:8],
            'url': url,
            'reasoning': f"Based on NHS Inform guidelines for {diagnosis}."
        }
    
    except Exception as e:
        return {'error': str(e), 'url': url}

def append_to_knowledge_base(data_entries):
    """Append scraped data to clinical_knowledge.js."""
    try:
        # Read existing file
        with open(KNOWLEDGE_FILE, 'r') as f:
            content = f.read()
        
        # Find the last closing brace of the CLINICAL_KNOWLEDGE_BASE object
        # We'll insert new entries before the final };
        
        # Parse existing entries to avoid duplicates
        existing_diagnoses = set()
        for match in re.finditer(r'"([^"]+)":\s*{', content):
            existing_diagnoses.add(match.group(1))
        
        # Build new entries
        new_entries = []
        for entry in data_entries:
            if 'error' in entry:
                continue
            
            # Create a safe key (lowercase, underscores)
            key = re.sub(r'[^a-z0-9]+', '_', entry['diagnosis'].lower()).strip('_')
            
            if key in existing_diagnoses:
                continue  # Skip duplicates
            
            symptoms_str = json.dumps(entry.get('symptoms', []))
            red_flags_str = json.dumps(entry.get('red_flags', []))
            treatment_str = json.dumps(entry.get('treatment', []))
            
            entry_code = f'''
    "{key}": {{
        "diagnosis": "{entry['diagnosis']}",
        "tier": "{entry['tier']}",
        "symptoms": {symptoms_str},
        "reasoning": "{entry['reasoning']}",
        "treatment": {treatment_str}
    }}'''
            
            new_entries.append(entry_code)
        
        if not new_entries:
            return {'success': True, 'added': 0, 'message': 'No new entries to add'}
        
        # Insert before the last closing brace
        insert_position = content.rfind('}')
        if insert_position == -1:
            return {'success': False, 'message': 'Could not find insertion point'}
        
        # Add comma after last entry
        insert_position = content.rfind('}', 0, insert_position)
        new_content = content[:insert_position+1] + ',' + ','.join(new_entries) + content[insert_position+1:]
        
        # Write back
        with open(KNOWLEDGE_FILE, 'w') as f:
            f.write(new_content)
        
        return {'success': True, 'added': len(new_entries), 'message': f'Added {len(new_entries)} new conditions'}
    
    except Exception as e:
        return {'success': False, 'message': str(e)}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.json
    urls = data.get('urls', [])
    
    if not urls:
        return jsonify({'error': 'No URLs provided'}), 400
    
    results = []
    for i, url in enumerate(urls):
        print(f"Scraping {i+1}/{len(urls)}: {url}")
        result = scrape_nhs_page(url.strip())
        results.append(result)
        time.sleep(2)  # Increased delay to be more polite
    
    # Append to knowledge base
    append_result = append_to_knowledge_base(results)
    
    return jsonify({
        'results': results,
        'append_status': append_result
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
