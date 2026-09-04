import json
import os
import re
from typing import Dict, List, Tuple

class SkillNormalizer:
    def __init__(self):
        taxonomy_path = os.path.join(os.path.dirname(__file__), "..", "taxonomy", "skill_db.json")
        try:
            with open(taxonomy_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.aliases = data.get("aliases", {})
                self.categories = data.get("categories", {})
        except Exception as e:
            self.aliases = {}
            self.categories = {}

    def normalize(self, skill_raw: str) -> str:
        if not skill_raw:
            return ""
        cleaned = skill_raw.strip()
        lower_key = cleaned.lower()
        if lower_key in self.aliases:
            return self.aliases[lower_key]
        
        # Clean trailing punctuation
        cleaned = re.sub(r'[\.,;:!?]+$', '', cleaned)
        lower_key = cleaned.lower()
        if lower_key in self.aliases:
            return self.aliases[lower_key]
        
        # Proper case formatting fallback
        if len(cleaned) <= 3 and cleaned.isupper():
            return cleaned
        return cleaned.title() if len(cleaned) > 2 and not any(c.isupper() for c in cleaned[1:]) else cleaned

    def categorize(self, skill_name: str) -> str:
        norm = self.normalize(skill_name)
        norm_lower = norm.lower()
        
        for category, skill_list in self.categories.items():
            if any(s.lower() == norm_lower for s in skill_list):
                return category
                
        # Keyword-based heuristics
        if any(k in norm_lower for k in ["python", "java", "c++", "script", "sql", "html", "css", "rust", "go", "ruby"]):
            return "programming"
        if any(k in norm_lower for k in ["postgres", "mongo", "mysql", "redis", "database", "sql"]):
            return "databases"
        if any(k in norm_lower for k in ["react", "node", "express", "fastapi", "flask", "django", "vue", "angular", "tailwind"]):
            return "frameworks"
        if any(k in norm_lower for k in ["machine learning", "deep learning", "ai", "tensorflow", "pytorch", "scikit", "nlp", "vision", "pandas"]):
            return "ml_ai"
        if any(k in norm_lower for k in ["aws", "azure", "cloud", "docker", "kubernetes", "devops", "ci/cd", "terraform", "linux"]):
            return "cloud_devops"
        if any(k in norm_lower for k in ["communication", "leadership", "teamwork", "problem solving", "time management", "thinking"]):
            return "soft_skills"
        if any(k in norm_lower for k in ["fintech", "healthcare", "analytics", "security", "engineering", "domain"]):
            return "domains"
        return "tools"

normalizer = SkillNormalizer()
