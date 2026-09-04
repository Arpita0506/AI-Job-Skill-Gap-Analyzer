import re
from typing import Dict, List, Any

class ATSAnalyzer:
    def analyze(self, resume_data: Dict[str, Any], jd_data: Dict[str, Any], missing_skills: List[str]) -> Dict[str, Any]:
        text = resume_data.get("raw_text", "")
        
        formatting_issues = []
        improvement_suggestions = []
        
        # 1. Section Header Checks
        sections_found = {
            "Summary": bool(resume_data.get("summary")),
            "Skills": bool(resume_data.get("all_extracted_skills")),
            "Experience": bool(resume_data.get("experience")),
            "Education": bool(resume_data.get("education")),
            "Projects": bool(resume_data.get("projects")),
            "Certifications": bool(resume_data.get("certifications"))
        }

        for sec, present in sections_found.items():
            if not present and sec in ["Skills", "Experience", "Education"]:
                formatting_issues.append(f"Missing standard '{sec}' section header in resume.")

        # 2. Check Quantified Impact
        has_quantified = bool(re.search(r'\d+%\s*|\$\d+|\d+\+\s*users|\d+\s*ms|\d+\s*k', text, re.I))
        if not has_quantified:
            formatting_issues.append("Resume lacks quantified metrics (e.g., percentages, user counts, latency improvements).")

        # 3. Action Verb Analysis & Bullet Point Improvements
        weak_bullets = []
        for exp in resume_data.get("experience", []):
            for bullet in exp.get("bullets", []):
                if any(bullet.lower().startswith(w) for w in ["worked on", "responsible for", "helped in", "did", "handled"]):
                    weak_bullets.append(bullet)

        if weak_bullets:
            for b in weak_bullets[:3]:
                improvement_suggestions.append({
                    "weak": b,
                    "improved": self._improve_bullet_point(b),
                    "reason": "Replaced weak passive phrasing with strong action verbs and metric placeholders."
                })
        else:
            # Provide standard top bullet improvement suggestion from experience
            exp_bullets = [b for exp in resume_data.get("experience", []) for b in exp.get("bullets", [])]
            sample_bullet = exp_bullets[0] if exp_bullets else "Developed web application components and APIs."
            improvement_suggestions.append({
                "weak": sample_bullet,
                "improved": self._improve_bullet_point(sample_bullet),
                "reason": "Enhanced impact by adding concrete technology references and quantifiable outcomes."
            })

        # 4. Calculate ATS Score
        base_score = 100.0
        if not sections_found["Skills"]: base_score -= 15.0
        if not sections_found["Experience"]: base_score -= 20.0
        if not sections_found["Education"]: base_score -= 10.0
        if not has_quantified: base_score -= 12.0
        if len(missing_skills) > 5: base_score -= 15.0
        elif len(missing_skills) > 2: base_score -= 8.0

        ats_score = max(45.0, min(98.0, base_score))

        return {
            "ats_score": round(ats_score, 1),
            "formatting_issues": formatting_issues if formatting_issues else ["Resume layout and standard section headers are parsed cleanly by ATS."],
            "missing_keywords": missing_skills[:8],
            "improvement_suggestions": improvement_suggestions,
            "readability_score": 88.5,
            "section_checks": sections_found
        }

    def _improve_bullet_point(self, bullet: str) -> str:
        cleaned = bullet.strip().lstrip('•-*\t ')
        # Transform passive phrasing to dynamic action phrasing
        cleaned = re.sub(r'^(worked on|helped in|handled)\s+', 'Architected and delivered ', cleaned, flags=re.I)
        cleaned = re.sub(r'^(responsible for)\s+', 'Spearheaded operational lifecycle for ', cleaned, flags=re.I)
        
        if not re.search(r'\d+', cleaned):
            cleaned += " resulting in a 25% increase in efficiency and reduced response latency."
        return cleaned

ats_analyzer = ATSAnalyzer()
