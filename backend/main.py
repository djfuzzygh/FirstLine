from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import sqlite3
from datetime import datetime

load_dotenv()

from app.schemas.triage import IntakeRequest, TriageResult, FollowUpQuestion, ReferralSummary
from app.services.agent import TriageAgent
from typing import List, Dict

app = FastAPI(title="FirstLine Backend", version="1.0.0")

# --- DATABASE SETUP ---
DB_PATH = "firstline.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS cases (
            id TEXT PRIMARY KEY,
            date TEXT,
            age INTEGER,
            sex TEXT,
            symptom TEXT,
            tier TEXT,
            region TEXT,
            source TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Enable CORS for the web app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = TriageAgent()

# --- DATABASE HELPERS ---
def save_case_to_db(case):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO cases (id, date, age, sex, symptom, tier, region, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        case['id'], 
        case['date'], 
        case['age'], 
        case['sex'], 
        case['symptom'], 
        case['tier'], 
        case['region'], 
        case['source']
    ))
    conn.commit()
    conn.close()

@app.get("/")
async def root():
    return {"message": "FirstLine Backend is operational", "schema": "/docs"}

@app.get("/cases")
async def get_cases():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM cases ORDER BY date DESC LIMIT 100")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/followup_questions", response_model=List[FollowUpQuestion])
async def get_followups(intake: IntakeRequest):
    if not intake.has_consent:
        raise HTTPException(status_code=400, detail="Patient consent is required.")
    return await agent.generate_followups(intake)

@app.post("/triage", response_model=TriageResult)
async def perform_triage(data: Dict):
    # data expects {"intake": IntakeRequest, "followup_responses": Dict[str, str]}
    try:
        intake = IntakeRequest(**data["intake"])
        responses = data.get("followup_responses", {})
        result = await agent.perform_triage(intake, responses)
        
        # Save to DB Automatically
        try:
             case_record = {
                "id": f"FL-{int(datetime.now().timestamp())}",
                "date": datetime.now().isoformat(),
                "age": intake.age,
                "sex": intake.sex,
                "symptom": intake.symptoms.split(',')[0],
                "tier": result.risk_tier,
                "region": "Greater Accra", # Mock region
                "source": "API"
            }
             save_case_to_db(case_record)
        except Exception as e:
            print(f"⚠️ DB Save Error: {e}")

        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/referral_summary", response_model=ReferralSummary)
async def get_referral(data: Dict):
    try:
        intake = IntakeRequest(**data["intake"])
        triage = TriageResult(**data["triage"])
        return await agent.generate_referral(intake, triage)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host=host, port=port)
