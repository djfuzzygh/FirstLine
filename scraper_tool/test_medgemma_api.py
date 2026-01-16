#!/usr/bin/env python3
"""
Quick test to verify MedGemma API is working
"""

import requests
import os
import json

MEDGEMMA_API = os.getenv('MEDGEMMA_API', 'http://localhost:8000')

print("🧪 Testing MedGemma API")
print(f"🔗 Endpoint: {MEDGEMMA_API}\n")

# Test 1: Basic connectivity
print("Test 1: Checking connectivity...")
try:
    response = requests.get(MEDGEMMA_API, timeout=5)
    print(f"✅ Server is reachable (status: {response.status_code})\n")
except Exception as e:
    print(f"❌ Cannot reach server: {e}\n")
    exit(1)

# Test 2: Chat endpoint
print("Test 2: Testing /chat endpoint...")
try:
    response = requests.post(
        f"{MEDGEMMA_API}/chat",
        json={
            "message": "What are the symptoms of bacterial meningitis?",
            "temperature": 0.3
        },
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        answer = data.get('response', '')
        print(f"✅ Chat endpoint works!")
        print(f"📝 Sample response: {answer[:200]}...\n")
    else:
        print(f"❌ Chat endpoint returned status {response.status_code}")
        print(f"Response: {response.text}\n")
        exit(1)
        
except Exception as e:
    print(f"❌ Chat endpoint failed: {e}\n")
    exit(1)

# Test 3: Enhancement simulation
print("Test 3: Simulating enhancement prompt...")
try:
    test_prompt = """You are a medical expert. Enhance the clinical knowledge for: Meningitis

Current Information:
- Symptoms: fever, headache, stiff neck
- Reasoning: Meningitis is a medical emergency requiring immediate hospital treatment.

Please provide:

1. EXPANDED SYMPTOMS (include medical synonyms and red flags):
[Return as JSON array of strings]

2. ENHANCED CLINICAL REASONING (3-4 sentences):
- Explain pathophysiology
- Why these symptoms occur
- Key diagnostic considerations
- Urgency assessment

Format your response as:
SYMPTOMS: [json array]
REASONING: [text]
"""
    
    response = requests.post(
        f"{MEDGEMMA_API}/chat",
        json={
            "message": test_prompt,
            "temperature": 0.3,
            "max_tokens": 1000
        },
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        answer = data.get('response', '')
        print(f"✅ Enhancement prompt works!")
        print(f"\n📋 Full response:\n{answer}\n")
        
        # Try to parse symptoms
        import re
        symptoms_match = re.search(r'SYMPTOMS:\s*(\[[\s\S]*?\])', answer)
        if symptoms_match:
            print("✅ Response contains SYMPTOMS section")
        else:
            print("⚠️  Warning: Could not find SYMPTOMS section in response")
        
        reasoning_match = re.search(r'REASONING:\s*([\s\S]*?)(?:\n\n|$)', answer)
        if reasoning_match:
            print("✅ Response contains REASONING section")
        else:
            print("⚠️  Warning: Could not find REASONING section in response")
            
    else:
        print(f"❌ Enhancement prompt failed with status {response.status_code}")
        exit(1)
        
except Exception as e:
    print(f"❌ Enhancement test failed: {e}\n")
    exit(1)

print("\n" + "="*60)
print("🎉 All tests passed! MedGemma API is ready for enhancement.")
print("="*60)
print("\n🚀 Run the full enhancement with:")
print("   python3 enhance_with_medgemma.py")
