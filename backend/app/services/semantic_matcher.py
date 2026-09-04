from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict, Any, Tuple
from app.core.config import settings
from app.services.skill_normalizer import normalizer

class SemanticMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words='english')

    def match_skills(self, resume_skills: List[str], resume_text: str, jd_skills: List[str], jd_text: str) -> Dict[str, Any]:
        """
        Calculates semantic similarity between extracted job skills and resume contents.
        Returns: skill_matches list, strong_matches, partial_matches, missing_skills.
        """
        resume_skills_norm = list(set([normalizer.normalize(s) for s in resume_skills if normalizer.normalize(s)]))
        jd_skills_norm = list(set([normalizer.normalize(s) for s in jd_skills if normalizer.normalize(s)]))
        
        strong_matches = []
        partial_matches = []
        missing_skills = []
        skill_match_items = []
        
        # Build TF-IDF corpus for context comparison
        corpus = [resume_text] + [jd_text] + resume_skills_norm
        try:
            tfidf_matrix = self.vectorizer.fit_transform(corpus)
        except Exception:
            tfidf_matrix = None

        for req_skill in jd_skills_norm:
            best_match_score = 0.0
            matched_skill_name = None
            
            req_norm = req_skill.lower()
            
            # 1. Exact or Alias Match check
            for cand_skill in resume_skills_norm:
                cand_norm = cand_skill.lower()
                if req_norm == cand_norm:
                    best_match_score = 1.0
                    matched_skill_name = cand_skill
                    break
                elif req_norm in cand_norm or cand_norm in req_norm:
                    if len(req_norm) > 3 and len(cand_norm) > 3:
                        score = 0.85
                        if score > best_match_score:
                            best_match_score = score
                            matched_skill_name = cand_skill

            # 2. Semantic Context Match using TF-IDF / Substring / Skill taxonomy relations
            if best_match_score < 0.85:
                # Check category & taxonomy relationships
                req_cat = normalizer.categorize(req_skill)
                for cand_skill in resume_skills_norm:
                    cand_cat = normalizer.categorize(cand_skill)
                    if req_cat == cand_cat and req_cat in ["ml_ai", "cloud_devops", "frameworks", "databases"]:
                        # Related domain skills
                        sim = self._compute_string_similarity(req_skill, cand_skill)
                        sim = max(sim, 0.60)  # Related category bonus
                        if sim > best_match_score:
                            best_match_score = sim
                            matched_skill_name = cand_skill

                # Check if requirement string appears in resume full text with high relevance
                if req_norm in resume_text.lower():
                    best_match_score = max(best_match_score, 0.80)
                    if not matched_skill_name:
                        matched_skill_name = req_skill

            # 3. Classify Match Status
            if best_match_score >= settings.SIMILARITY_STRONG_THRESHOLD:
                status = "Strong Match"
                strong_matches.append(req_skill)
            elif best_match_score >= settings.SIMILARITY_PARTIAL_THRESHOLD:
                status = "Partial Match"
                partial_matches.append(req_skill)
            else:
                status = "Missing Skill"
                missing_skills.append(req_skill)

            # Determine Skill Importance & Priority
            cat = normalizer.categorize(req_skill)
            importance = "Critical" if req_skill in jd_skills[:3] else ("High" if status == "Missing Skill" else "Medium")
            priority = "Critical" if (status == "Missing Skill" and importance in ["Critical", "High"]) else ("High" if status == "Missing Skill" else "Low")

            why_it_matters, resources, difficulty, project = self._get_skill_learning_details(req_skill, cat)

            skill_match_items.append({
                "skill": req_skill,
                "category": cat,
                "requirement_type": "MUST HAVE" if req_skill in jd_skills[:int(len(jd_skills)*0.7)+1] else "GOOD TO HAVE",
                "match_status": status,
                "match_score": round(float(best_match_score), 2),
                "matched_with": matched_skill_name,
                "importance": importance,
                "priority": priority,
                "why_it_matters": why_it_matters,
                "recommended_resources": resources,
                "estimated_difficulty": difficulty,
                "suggested_project": project
            })

        return {
            "skill_matches": skill_match_items,
            "strong_matches": strong_matches,
            "partial_matches": partial_matches,
            "missing_skills": missing_skills
        }

    def _compute_string_similarity(self, s1: str, s2: str) -> float:
        set1, set2 = set(s1.lower().split()), set(s2.lower().split())
        intersection = set1.intersection(set2)
        union = set1.union(set2)
        return len(intersection) / len(union) if union else 0.0

    def _get_skill_learning_details(self, skill: str, category: str) -> Tuple[str, List[Dict[str, str]], str, str]:
        resources = [
            {"title": f"Official {skill} Documentation & Quickstart", "url": f"https://www.google.com/search?q={skill}+official+documentation"},
            {"title": f"Interactive {skill} Crash Course", "url": f"https://www.coursera.org/search?query={skill}"}
        ]
        
        difficulty_map = {
            "programming": "Medium",
            "databases": "Low",
            "frameworks": "Medium",
            "ml_ai": "High",
            "cloud_devops": "High",
            "tools": "Low",
            "soft_skills": "Low",
            "domains": "Medium"
        }
        difficulty = difficulty_map.get(category, "Medium")
        
        why = f"{skill} is a core competency requested in the job description to ensure efficient implementation and team collaboration."
        project = f"Build a practical module incorporating {skill} to showcase hands-on mastery."
        
        if category == "cloud_devops":
            why = f"Modern cloud deployment relies heavily on {skill} for infrastructure scalability, containerization, or automated CI/CD pipelines."
            project = f"Containerize and deploy a web application on {skill} with automated health checks."
        elif category == "ml_ai":
            why = f"{skill} is vital for developing high-accuracy predictive models, data pipelines, and AI features."
            project = f"Develop and evaluate an ML model using {skill} on a real-world dataset."
        elif category == "databases":
            why = f"Data storage and query optimization using {skill} are essential for backend performance."
            project = f"Design a normalized relational or document database schema using {skill}."

        return why, resources, difficulty, project

semantic_matcher = SemanticMatcher()
