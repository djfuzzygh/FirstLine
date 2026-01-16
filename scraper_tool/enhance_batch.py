#!/usr/bin/env python3
"""
BATCH ENHANCEMENT CLIENT
1. Upload all 424 conditions to Kaggle
2. Wait for processing (check status)
3. Download enhanced results
"""

import json
import re
import requests
import time
from pathlib import Path

KAGGLE_API = "https://heliolatrous-unstooping-rosy.ngrok-free.dev"
INPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_cleaned.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'web_app' / 'clinical_knowledge_medgemma.js'

def load_kb():
    """Load all conditions"""
    print("📖 Loading knowledge base...")
    with open(INPUT_FILE, 'r') as f:
        content = f.read()
    match = re.search(r'export const CLINICAL_KNOWLEDGE_BASE = ({[\s\S]*});', content)
    kb = json.loads(match.group(1))
    print(f"✅ Loaded {len(kb)} conditions\n")
    return kb

def upload_batch(kb):
    """Upload all conditions to Kaggle"""
    print(f"📤 Uploading {len(kb)} conditions to Kaggle...")
    
    try:
        response = requests.post(
            f"{KAGGLE_API}/batch_enhance",
            json={"conditions": kb},
            timeout=120
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Upload successful!")
            print(f"   Status: {data['status']}")
            print(f"   Message: {data['message']}\n")
            return True
        else:
            print(f"❌ Upload failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Upload error: {e}")
        return False

def check_status():
    """Check processing status"""
    try:
        response = requests.get(f"{KAGGLE_API}/batch_status", timeout=10)
        if response.status_code == 200:
            return response.json()
    except:
        pass
    return None

def download_results():
    """Download enhanced results"""
    print("\n📥 Downloading results...")
    try:
        response = requests.get(f"{KAGGLE_API}/batch_results", timeout=60)
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"❌ Download error: {e}")
    return None

def save_results(enhanced_kb):
    """Save enhanced knowledge base"""
    print("💾 Saving...")
    with open(OUTPUT_FILE, 'w') as f:
        f.write("// MedGemma-Enhanced (Batch Processing)\n\n")
        f.write("export const CLINICAL_KNOWLEDGE_BASE = ")
        json.dump(enhanced_kb, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print(f"✅ Saved to: {OUTPUT_FILE}")

def main():
    print("🚀 BATCH ENHANCEMENT via Kaggle")
    print("="*60 + "\n")
    
    # Step 1: Load data
    kb = load_kb()
    
    # Step 2: Upload to Kaggle
    if not upload_batch(kb):
        print("\n❌ Upload failed. Make sure:")
        print("   1. Kaggle notebook is running")
        print("   2. Batch endpoint is added to backend")
        return
    
    # Step 3: Monitor progress
    print("⏳ Monitoring progress (Kaggle processing in background)...")
    print("   You can close this and check back later!\n")
    
    last_processed = 0
    while True:
        status = check_status()
        
        if status:
            current = status.get('processed', 0)
            total = status.get('total', 424)
            state = status.get('status', 'unknown')
            
            if current != last_processed:
                progress = current / total * 100 if total > 0 else 0
                print(f"   Progress: {current}/{total} ({progress:.1f}%) - {state}")
                last_processed = current
            
            if state == 'complete':
                print("\n✅ Processing complete!")
                break
        
        time.sleep(10)  # Check every 10 seconds
    
    # Step 4: Download results
    results = download_results()
    if results and 'error' not in results:
        save_results(results)
        print(f"\n🎉 Successfully enhanced {len(results)} conditions!")
    else:
        print("\n❌ Could not download results")

if __name__ == '__main__':
    main()
