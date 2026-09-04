from typing import Dict, List, Any
from app.core.config import settings

class ScoringEngine:
    def calculate_scores(
        self,
        resume_data: Dict[str, Any],
        jd_data: Dict[str, Any],
        semantic_results: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Calculates weighted Job Match Score (0-100), Job Readiness Score (0-100), breakdown, and AI explanation.
        """
        skill_matches = semantic_results.get("skill_matches", [])
        strong_matches = semantic_results.get("strong_matches", [])
        partial_matches = semantic_results.get("partial_matches", [])
        missing_skills = semantic_results.get("missing_skills", [])
        
        # 1. Technical Skills Score (40%)
        tech_reqs = [m for m in skill_matches if m.get("category") in ["programming", "databases", "frameworks", "ml_ai", "cloud_devops", "tools"]]
        if tech_reqs:
            tech_match_sum = sum(m["match_score"] for m in tech_reqs)
            tech_score = (tech_match_sum / len(tech_reqs)) * 100.0
        else:
            tech_score = 75.0

        # 2. Experience Score (20%)
        cand_exp_count = len(resume_data.get("experience", []))
        req_exp_str = jd_data.get("experience_requirements", "0-2 years")
        if "5+" in req_exp_str:
            exp_score = min(100.0, (cand_exp_count / 3.0) * 100.0)
        elif "2-5" in req_exp_str:
            exp_score = min(100.0, (cand_exp_count / 2.0) * 100.0)
        else:
            exp_score = 100.0 if cand_exp_count >= 1 else 70.0

        # 3. Projects Score (15%)
        proj_count = len(resume_data.get("projects", []))
        proj_score = min(100.0, (proj_count / 2.0) * 100.0) if proj_count > 0 else 60.0

        # 4. Education Score (10%)
        edu_count = len(resume_data.get("education", []))
        edu_score = 100.0 if edu_count >= 1 else 60.0

        # 5. Certifications Score (5%)
        cert_count = len(resume_data.get("certifications", []))
        cert_score = min(100.0, (cert_count / 1.0) * 100.0) if cert_count > 0 else 50.0

        # 6. Soft Skills Score (5%)
        soft_reqs = [m for m in skill_matches if m.get("category") == "soft_skills"]
        if soft_reqs:
            soft_match_sum = sum(m["match_score"] for m in soft_reqs)
            soft_score = (soft_match_sum / len(soft_reqs)) * 100.0
        else:
            soft_score = 80.0

        # 7. Domain Knowledge Score (5%)
        domain_reqs = [m for m in skill_matches if m.get("category") == "domains"]
        if domain_reqs:
            dom_match_sum = sum(m["match_score"] for m in domain_reqs)
            domain_score = (dom_match_sum / len(domain_reqs)) * 100.0
        else:
            domain_score = 75.0

        breakdown = {
            "technical_skills": round(tech_score, 1),
            "experience": round(exp_score, 1),
            "projects": round(proj_score, 1),
            "education": round(edu_score, 1),
            "certifications": round(cert_score, 1),
            "soft_skills": round(soft_score, 1),
            "domain_knowledge": round(domain_score, 1)
        }

        # Overall Job Match Score calculation
        w = settings.WEIGHTS
        overall_match = (
            breakdown["technical_skills"] * w["technical_skills"] +
            breakdown["experience"] * w["experience"] +
            breakdown["projects"] * w["projects"] +
            breakdown["education"] * w["education"] +
            breakdown["certifications"] * w["certifications"] +
            breakdown["soft_skills"] * w["soft_skills"] +
            breakdown["domain_knowledge"] * w["domain_knowledge"]
        )
        overall_match = round(overall_match, 1)

        # Job Readiness Score calculation
        job_readiness = (overall_match * 0.7) + (proj_score * 0.15) + (edu_score * 0.15)
        job_readiness = round(job_readiness, 1)

        # Plain-English AI Explanation Generator
        job_title = jd_data.get("job_title", "target role")
        top_strong = ", ".join(strong_matches[:3]) if strong_matches else "fundamental skillsets"
        top_missing = ", ".join(missing_skills[:3]) if missing_skills else "advanced domain frameworks"
        
        explanation = (
            f"Your overall match score for the {job_title} role is {overall_match}%. "
            f"You demonstrate strong proficiency in {top_strong}, achieving an {breakdown['technical_skills']}% technical rating and {breakdown['education']}% education match. "
            f"However, your match is slightly constrained because key requirements such as {top_missing} are currently absent or only partially demonstrated in your resume. "
            f"Addressing these key gaps via targeted projects will boost your readiness score from {job_readiness}% to above 90%."
        )

        return {
            "overall_match_score": overall_match,
            "job_readiness_score": job_readiness,
            "score_breakdown": breakdown,
            "ai_explanation": explanation
        }

scoring_engine = ScoringEngine()
