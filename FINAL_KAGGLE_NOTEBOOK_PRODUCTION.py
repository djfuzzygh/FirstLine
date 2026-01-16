# ========================================
# FirstLine - MedGemma Backend (Kaggle)
# For: The MedGemma Impact Challenge
# ========================================
# 
# This notebook runs the MedGemma-powered backend for FirstLine,
# an offline-first clinical triage system for rural Ghana.
#
# SETUP INSTRUCTIONS:
# 1. Add secrets in Kaggle:
#    - HUGGINGFACE_TOKEN (your HF token)
#    - NGROK_TOKEN (your ngrok token)
# 2. Enable GPU (T4 or P100)
# 3. Enable internet
# 4. Run all cells
# 5. Copy the ngrok URL and use it in your app
#
# ========================================

# ========== CELL 1: Setup & Installation ==========

import os
import sys
import json
import torch
from pathlib import Path

print("🚀 FirstLine MedGemma Backend - Starting...")
print("=" * 60)

# Check GPU
if torch.cuda.is_available():
    print(f"✅ GPU Available: {torch.cuda.get_device_name(0)}")
    print(f"   Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.2f} GB")
else:
    print("⚠️ No GPU available - this will be slow!")

# Install dependencies
print("\n📦 Installing dependencies...")
!pip install -q transformers accelerate pyngrok fastapi uvicorn python-multipart nest_asyncio bitsandbytes

print("✅ Dependencies installed")

# ========== CELL 2: Load Secrets ==========

from kaggle_secrets import UserSecretsClient

print("\n🔐 Loading secrets...")
secrets = UserSecretsClient()

try:
    HF_TOKEN = secrets.get_secret("HUGGINGFACE_TOKEN")
    NGROK_TOKEN = secrets.get_secret("NGROK_TOKEN")
    print("✅ Secrets loaded successfully")
except Exception as e:
    print(f"❌ Failed to load secrets: {e}")
    print("Please add HUGGINGFACE_TOKEN and NGROK_TOKEN in Kaggle secrets")
    sys.exit(1)

# Set environment variables
os.environ['HF_TOKEN'] = HF_TOKEN
os.environ['NGROK_TOKEN'] = NGROK_TOKEN

# ========== CELL 3: Load MedGemma Model ==========

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

print("\n🤖 Loading MedGemma model...")
print("This may take 2-3 minutes...")

MODEL_NAME = "google/medgemma-1.5-4b-it"

try:
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_NAME,
        token=HF_TOKEN
    )
    
    # Load model with optimizations
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        token=HF_TOKEN,
        torch_dtype=torch.float16,  # Use FP16 for speed
        device_map="auto",  # Automatic device placement
        load_in_8bit=True,   # FIXED: Use 8-bit quantization for stability & memory
        # low_cpu_mem_usage=True # Implied by device_map
    )
    
    print("✅ MedGemma model loaded successfully")
    print(f"   Model size: ~{sum(p.numel() for p in model.parameters()) / 1e9:.2f}B parameters")
    
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    sys.exit(1)

# ========== CELL 4: Create FastAPI Backend ==========

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import uvicorn
from threading import Thread

print("\n🌐 Setting up FastAPI backend...")

# Create FastAPI app
app = FastAPI(
    title="FirstLine MedGemma Backend",
    description="AI-powered clinical triage for rural Ghana",
    version="1.0.0"
)

# Enable CORS (allow all origins for demo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== Data Models ==========

class IntakeData(BaseModel):
    age: int
    sex: str
    symptoms: str
    duration_days: Optional[float] = None
    temp_c: Optional[float] = None
    rr: Optional[int] = None
    hr: Optional[int] = None
    pregnancy_status: Optional[bool] = False
    chronic_conditions: Optional[List[str]] = []
    medications: Optional[List[str]] = []
    allergies: Optional[List[str]] = []

class TriageRequest(BaseModel):
    intake: IntakeData
    followup_responses: Optional[Dict[str, str]] = {}

class TriageResponse(BaseModel):
    diagnosis: str
    tier: str
    confidence: int
    reasoning: str
    actions: List[str]
    followup_questions: Optional[List[str]] = []
    danger_signs: int

# ========== Helper Functions ==========

def call_medgemma(prompt: str, max_tokens: int = 500) -> str:
    """Call MedGemma model with a prompt"""
    try:
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            min_new_tokens=20, # Ensure it doesn't just stop
            do_sample=False,  
            repetition_penalty=1.1, 
            pad_token_id=tokenizer.eos_token_id
        )
        
        # skip_special_tokens=True is important here
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # The prompt might still be there if tokenizer doesn't clean it well
        # In Gemma 2, it often includes the model turn start
        if "<start_of_turn>model" in response:
            response = response.split("<start_of_turn>model")[-1].strip()
        elif "model\n" in response:
             response = response.split("model\n")[-1].strip()
        
        return response.strip()
        
    except Exception as e:
        print(f"⚠️ MedGemma call failed: {e}")
        return ""

def create_triage_prompt(intake: IntakeData) -> str:
    """Create a structured prompt for MedGemma using Gemma instruction format"""
    
    # Header/Context
    instruction = "You are a professional medical AI assistant helping with clinical triage in rural Ghana. Analyze the following patient data and provide a structured assessment."
    
    # Patient Data block
    patient_info = f"""Patient Information:
- Age: {intake.age} years
- Sex: {intake.sex}
- Symptoms: {intake.symptoms}
- Duration: {intake.duration_days} days
"""
    
    if intake.temp_c:
        patient_info += f"- Temperature: {intake.temp_c}°C\n"
    if intake.rr:
        patient_info += f"- Respiratory Rate: {intake.rr}/min\n"
    if intake.hr:
        patient_info += f"- Heart Rate: {intake.hr} bpm\n"
    if intake.pregnancy_status:
        patient_info += "- Pregnant: Yes\n"
    if intake.chronic_conditions:
        patient_info += f"- Chronic Conditions: {', '.join(intake.chronic_conditions)}\n"
    if intake.medications:
        patient_info += f"- Current Medications: {', '.join(intake.medications)}\n"
    if intake.allergies:
        patient_info += f"- Allergies: {', '.join(intake.allergies)}\n"
    
    # Request block
    request = """
Based on the data above, provide:
1. Most likely diagnosis
2. Urgency tier (RED=emergency, YELLOW=urgent, GREEN=routine)
3. Confidence level (0-100%)
4. Clinical reasoning
5. Recommended actions (prioritized)
6. Any danger signs detected

Format your response clearly and concisely.
"""

    # Combine using Gemma Instruction Format
    full_prompt = f"<start_of_turn>user\n{instruction}\n\n{patient_info}\n{request}<end_of_turn>\n<start_of_turn>model\n"
    
    return full_prompt

def parse_medgemma_response(response: str, intake: IntakeData) -> TriageResponse:
    """Parse MedGemma response into structured format"""
    
    # Simple parsing (could be enhanced with regex)
    lines = response.lower()
    
    # Determine tier based on keywords
    tier = "GREEN"
    if any(word in lines for word in ["emergency", "urgent", "immediate", "critical", "severe"]):
        tier = "RED" if "emergency" in lines or "immediate" in lines else "YELLOW"
    
    # Extract diagnosis (first sentence usually)
    diagnosis = response.split('\n')[0].strip()
    if len(diagnosis) > 100:
        diagnosis = diagnosis[:100] + "..."
    
    # Count danger signs
    danger_keywords = ["chest pain", "difficulty breathing", "severe", "bleeding", "unconscious"]
    danger_signs = sum(1 for keyword in danger_keywords if keyword in lines)
    
    # Generate actions based on tier
    actions = []
    if tier == "RED":
        actions.append("🚨 Seek immediate medical attention - call emergency services or go to nearest hospital")
    elif tier == "YELLOW":
        actions.append("⚠️ Seek medical attention within 24 hours")
    else:
        actions.append("Monitor symptoms and seek medical advice if they worsen")
    
    # Add symptom-specific actions
    if intake.temp_c and intake.temp_c > 38.5:
        actions.append("💊 Take paracetamol for fever (500mg every 6 hours)")
    
    actions.append("💧 Stay well hydrated - drink plenty of fluids")
    actions.append("😴 Get adequate rest")
    
    if tier != "GREEN":
        actions.append("📝 Monitor vital signs regularly")
    
    return TriageResponse(
        diagnosis=diagnosis,
        tier=tier,
        confidence=75,  # Could be enhanced with confidence extraction
        reasoning=response[:500],  # First 500 chars
        actions=actions,
        followup_questions=[],
        danger_signs=danger_signs
    )

# ========== API Endpoints ==========

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "FirstLine MedGemma Backend",
        "model": "google/medgemma-1.5-4b-it",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "gpu_available": torch.cuda.is_available(),
        "model_loaded": model is not None,
        "tokenizer_loaded": tokenizer is not None
    }

@app.post("/triage", response_model=TriageResponse)
async def triage(request: TriageRequest):
    """
    Main triage endpoint
    Analyzes patient data and returns clinical assessment
    """
    try:
        print(f"\n🏥 Triage request for {request.intake.age}yo {request.intake.sex}")
        print(f"   Symptoms: {request.intake.symptoms[:200]}...")
        
        # Create prompt
        prompt = create_triage_prompt(request.intake)
        
        # Call MedGemma
        response = call_medgemma(prompt, max_tokens=500)
        
        if not response:
            raise HTTPException(status_code=500, detail="MedGemma failed to generate response")
        
        # Parse response
        result = parse_medgemma_response(response, request.intake)
        
        print(f"   ✅ Result: {result.tier} - {result.diagnosis[:50]}...")
        
        return result
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
async def stats():
    """Get system statistics"""
    return {
        "model": MODEL_NAME,
        "gpu": torch.cuda.get_device_name(0) if torch.cuda.is_available() else "None",
        "gpu_memory_allocated": f"{torch.cuda.memory_allocated() / 1e9:.2f} GB" if torch.cuda.is_available() else "N/A",
        "gpu_memory_reserved": f"{torch.cuda.memory_reserved() / 1e9:.2f} GB" if torch.cuda.is_available() else "N/A"
    }

print("✅ FastAPI backend configured")

# ========== CELL 5: Start Ngrok Tunnel ==========

from pyngrok import ngrok, conf

print("\n🌐 Starting ngrok tunnel...")

# Set ngrok token
conf.get_default().auth_token = NGROK_TOKEN

# Start tunnel
try:
    # Kill any existing tunnels
    ngrok.kill()
    
    # Start new tunnel
    public_url = ngrok.connect(8000, bind_tls=True)
    
    print("✅ Ngrok tunnel started!")
    print("=" * 60)
    print(f"🌍 PUBLIC URL: {public_url}")
    print("=" * 60)
    print("\n📋 COPY THIS URL AND USE IT IN YOUR APP!")
    print(f"   Set MEDGEMMA_API={public_url}")
    print("=" * 60)
    
except Exception as e:
    print(f"❌ Failed to start ngrok: {e}")
    sys.exit(1)

# ========== CELL 6: Start Server ==========

import time
import socket

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

print("\n🚀 Starting FastAPI server...")

if is_port_in_use(8000):
    print("🧹 Port 8000 is in use. Killing existing processes...")
    # Try multiple ways to kill the process
    !fuser -k 8000/tcp || true
    !lsof -t -i:8000 | xargs kill -9 || true
    time.sleep(2) # Give it a moment to release
    
    if is_port_in_use(8000):
        print("⚠️ Failed to clear port 8000. If problems persist, please Restart Session.")
    else:
        print("✨ Port 8000 cleared.")

print("Server will run on http://0.0.0.0:8000")
print("Public access via ngrok URL above")
print("\n⏳ Server running... (keep this cell running)")
print("=" * 60)

# Fix for Jupyter/Kaggle - allow nested event loops
import nest_asyncio
nest_asyncio.apply()

# Run server in background thread
from threading import Thread
import uvicorn

def run_server():
    try:
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=8000,
            log_level="info"
        )
    except BaseException as e:
        if str(e) == "1": # SystemExit: 1
            print(f"\n❌ Server failed to bind to port 8000 (Address already in use).")
        else:
            print(f"\n❌ Server error: {e}")
        print("💡 TIP: Please click 'Stop' (the square icon), wait 5 seconds, and then run this cell again.")

# Start server in background
server_thread = Thread(target=run_server, daemon=True)
server_thread.start()

print("✅ Server started in background!")
print("\n📊 Server is now running and accessible via:")
print(f"   {public_url}")
print("\n💡 TIP: Keep this notebook running to keep the server alive")
print("=" * 60)

# Keep the cell running
import time
try:
    while True:
        time.sleep(60)
        print(".", end="", flush=True)
except KeyboardInterrupt:
    print("\n\n⏹️ Server stopped")

# ========================================
# END OF NOTEBOOK
# ========================================
#
# USAGE:
# 1. Run all cells in order
# 2. Copy the ngrok URL from Cell 5
# 3. Use it in your FirstLine app
# 4. Keep this notebook running
#
# TESTING:
# - Health check: {ngrok_url}/health
# - Stats: {ngrok_url}/stats
# - Triage: POST to {ngrok_url}/triage
#
# ========================================
