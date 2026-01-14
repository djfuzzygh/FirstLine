from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class IntakeRequest(BaseModel):
    age: int
    sex: str
    pregnancy_status: bool = False
    symptoms: str
    duration_days: int
    temp_c: Optional[float] = None
    hr: Optional[int] = None
    rr: Optional[int] = None
    has_consent: bool

class FollowUpQuestion(BaseModel):
    question: str
    options: List[str] = ["Yes", "No", "Unsure"]

class TriageResult(BaseModel):
    risk_tier: str # GREEN, YELLOW, RED
    danger_signs: List[str]
    reasoning: str
    uncertainty: str # LOW, MEDIUM, HIGH
    recommended_actions: List[str]
    disclaimer: str = "Clinical decision support only. Confirm clinically."

class ReferralSummary(BaseModel):
    soap_note: str
    priority: str
    key_findings: List[str]
    suggested_facility_type: str
