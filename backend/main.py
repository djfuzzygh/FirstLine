from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from app.schemas.triage import IntakeRequest, TriageResult, FollowUpQuestion, ReferralSummary
from app.services.agent import TriageAgent
from typing import List, Dict

app = FastAPI(title="FirstLine Backend", version="1.0.0")

# Enable CORS for the web app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = TriageAgent()

@app.get("/")
async def root():
    return {"message": "FirstLine Backend is operational", "schema": "/docs"}

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
        return await agent.perform_triage(intake, responses)
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
