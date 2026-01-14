import json
import asyncio
import httpx
from app.services.agent import TriageAgent
from app.schemas.triage import IntakeRequest

async def run_demo():
    print("🚀 Starting FirstLine Agentic Workflow Demo...")
    print("-" * 50)
    
    # Load synthetic cases
    with open("../kaggle_submission_assets/DEMO_CASES.json", "r") as f:
        cases = json.load(f)
    
    agent = TriageAgent()
    
    for case in cases:
        print(f"\nEvaluating Case: {case['id']} - {case['description']}")
        intake = IntakeRequest(**case['input'])
        
        # Step 1: Check Red Flags
        print(f"  [Step 1] Checking Red Flags...")
        red_flags = agent.check_red_flags(intake)
        if red_flags:
            print(f"  ⚠️ DETECTED: {red_flags}")
        else:
            print(f"  ✅ No immediate red flags.")
            
        # Step 2: Generate Follow-ups
        print(f"  [Step 2] Generating Follow-up Questions...")
        followups = await agent.generate_followups(intake)
        for i, f_q in enumerate(followups):
            print(f"    Q{i+1}: {f_q.question}")
            
        # Step 3: Perform Triage
        print(f"  [Step 3] Reasoning and Triage...")
        # Simulate responses (mostly 'Yes' for demo)
        mock_responses = {q.question: "Yes" for q in followups}
        result = await agent.perform_triage(intake, mock_responses)
        
        color_code = {
            "RED": "🔴 RED (URGENT)",
            "YELLOW": "🟡 YELLOW (REFERRAL)",
            "GREEN": "🟢 GREEN (HOME CARE)"
        }.get(result.risk_tier, result.risk_tier)
        
        print(f"  RESULT: {color_code}")
        print(f"  REASONING: {result.reasoning}")
        print(f"  UNCERTAINTY: {result.uncertainty}")
        
        # Step 4: Referral Summary
        print(f"  [Step 4] Patient Summary (SOAP)...")
        referral = await agent.generate_referral(intake, result)
        print("  " + referral.soap_note.replace("\n", "\n  "))
        
        # Validation against expected behavior
        expected = case['expected_behavior']['triage']
        if result.risk_tier == expected:
            print(f"\n  ✅ VALIDATION PASSED: Match expected {expected}")
        else:
            print(f"\n  ❌ VALIDATION FAILED: Expected {expected} but got {result.risk_tier}")
        
        print("-" * 50)

if __name__ == "__main__":
    asyncio.run(run_demo())
