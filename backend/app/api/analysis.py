import uuid
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db, AnalysisDB
from app.models.schemas import AnalyzeRequest, AnalysisResultResponse
from app.services.nlp_extractor import nlp_extractor
from app.services.semantic_matcher import semantic_matcher
from app.services.scoring_engine import scoring_engine
from app.services.ats_analyzer import ats_analyzer
from app.services.roadmap_generator import roadmap_generator
from app.services.interview_prep import interview_prep_generator
from seed_data import DEMO_PRESETS

router = APIRouter(prefix="/analysis", tags=["analysis"])

@router.post("/match", response_model=AnalysisResultResponse)
def analyze_match(req: AnalyzeRequest, db: Session = Depends(get_db)):
    resume_text = req.resume_text
    jd_text = req.job_description_text

    # Check for Demo Preset quick loader
    if req.use_demo_preset and req.use_demo_preset in DEMO_PRESETS:
        preset = DEMO_PRESETS[req.use_demo_preset]
        resume_text = preset["resume_text"]
        jd_text = preset["job_description_text"]

    if not resume_text or not jd_text:
        raise HTTPException(
            status_code=400,
            detail="Both resume text and job description text must be provided (or select a demo preset)."
        )

    try:
        # 1. Parse Resume & Job Description
        parsed_resume = nlp_extractor.extract_resume(resume_text)
        parsed_jd = nlp_extractor.extract_job_description(jd_text)

        # 2. Semantic Matching
        semantic_results = semantic_matcher.match_skills(
            resume_skills=parsed_resume["normalized_skills"],
            resume_text=resume_text,
            jd_skills=parsed_jd["technical_skills"] + parsed_jd["required_skills"],
            jd_text=jd_text
        )

        # 3. Scoring & Rationale
        scores = scoring_engine.calculate_scores(
            resume_data=parsed_resume,
            jd_data=parsed_jd,
            semantic_results=semantic_results
        )

        # 4. ATS Compatibility Analysis
        ats_results = ats_analyzer.analyze(
            resume_data=parsed_resume,
            jd_data=parsed_jd,
            missing_skills=semantic_results["missing_skills"]
        )

        # 5. Personalized Learning Roadmap & Project Recommendations
        roadmap_and_projects = roadmap_generator.generate_roadmap_and_projects(
            missing_skills=semantic_results["missing_skills"],
            candidate_skills=parsed_resume["normalized_skills"],
            job_title=parsed_jd["job_title"]
        )

        # 6. Interview Preparation Questions
        interview_questions = interview_prep_generator.generate_questions(
            resume_data=parsed_resume,
            jd_data=parsed_jd,
            missing_skills=semantic_results["missing_skills"],
            strong_matches=semantic_results["strong_matches"]
        )

        # Action Plan
        action_plan = [
            f"Focus Week 1 learning on {semantic_results['missing_skills'][0]}" if semantic_results['missing_skills'] else "Review advanced system design principles",
            "Update resume bullet points with quantified impact metrics suggested in ATS section.",
            "Complete recommended hands-on portfolio project to close missing skill gaps.",
            "Practice generated technical and behavioral interview preparation questions."
        ]

        analysis_id = str(uuid.uuid4())
        
        result_payload = {
            "id": analysis_id,
            "overall_match_score": scores["overall_match_score"],
            "job_readiness_score": scores["job_readiness_score"],
            "score_breakdown": scores["score_breakdown"],
            "ai_explanation": scores["ai_explanation"],
            "parsed_resume": parsed_resume,
            "parsed_jd": parsed_jd,
            "skill_matches": semantic_results["skill_matches"],
            "strong_matches": semantic_results["strong_matches"],
            "partial_matches": semantic_results["partial_matches"],
            "missing_skills": semantic_results["missing_skills"],
            "ats_analysis": ats_results,
            "learning_roadmap": roadmap_and_projects["roadmap"],
            "recommended_projects": roadmap_and_projects["recommended_projects"],
            "interview_questions": interview_questions,
            "action_plan": action_plan
        }

        # Save to Database
        db_record = AnalysisDB(
            id=analysis_id,
            job_title=parsed_jd["job_title"],
            company=parsed_jd.get("company", ""),
            overall_match_score=scores["overall_match_score"],
            job_readiness_score=scores["job_readiness_score"],
            result_json=json.dumps(result_payload)
        )
        db.add(db_record)
        db.commit()

        return result_payload
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {str(e)}")

@router.get("/{analysis_id}", response_model=AnalysisResultResponse)
def get_analysis_result(analysis_id: str, db: Session = Depends(get_db)):
    record = db.query(AnalysisDB).filter(AnalysisDB.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis result not found.")
    return json.loads(record.result_json)
