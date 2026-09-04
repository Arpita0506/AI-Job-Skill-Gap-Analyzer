from typing import List, Dict, Any
from app.services.skill_normalizer import normalizer

class RoadmapGenerator:
    def generate_roadmap_and_projects(self, missing_skills: List[str], candidate_skills: List[str], job_title: str) -> Dict[str, Any]:
        """
        Generates a personalized 4-week learning roadmap and portfolio project recommendations.
        """
        top_gaps = missing_skills[:4] if missing_skills else ["Cloud Architecture", "Docker Containerization", "CI/CD Deployment", "System Monitoring"]
        
        weeks = []
        for i in range(1, 5):
            skill = top_gaps[(i - 1) % len(top_gaps)]
            cat = normalizer.categorize(skill)
            
            weeks.append({
                "week": i,
                "title": f"Week {i}: Mastering {skill} Core Fundamentals",
                "skills_focus": [skill, "Best Practices", "Hands-on Implementation"],
                "what_to_learn": f"Deep dive into key concepts, API structures, and configuration patterns of {skill}.",
                "why_to_learn": f"{skill} is a high-priority missing skill directly requested for the {job_title} position.",
                "prerequisites": candidate_skills[:2] if candidate_skills else ["Basic Command Line", "Git Version Control"],
                "estimated_hours": 8 + (i * 2),
                "mini_project": f"Build a prototype component demonstrating {skill} execution and error handling.",
                "expected_outcome": f"Proficiency in setting up, configuring, and deploying solutions with {skill}."
            })

        # Capstone Project Recommendation combining multiple skill gaps
        gap_summary = ", ".join(top_gaps[:3])
        capstone_title = f"End-to-End {job_title} Portfolio Platform ({gap_summary})"
        capstone = {
            "title": capstone_title,
            "description": f"Architect and deploy a full-featured microservice incorporating {gap_summary} to demonstrate production job-readiness.",
            "skills_targeted": top_gaps[:4],
            "estimated_days": 14
        }

        # Multi-Skill Portfolio Projects Recommendation Engine
        recommended_projects = [
            {
                "title": f"Production-Ready Microservice with {top_gaps[0] if top_gaps else 'Docker & AWS'}",
                "description": f"Design and implement a scalable web API utilizing {', '.join(top_gaps[:3])} to solve real-world data processing challenges.",
                "skills_targeted": top_gaps[:3],
                "difficulty": "Intermediate to Advanced",
                "relevance_explanation": f"Directly addresses the top missing requirement ({top_gaps[0] if top_gaps else 'Cloud'}) requested by recruiters for {job_title} positions.",
                "key_features": [
                    "Containerized deployment configuration",
                    "Automated integration testing and validation",
                    "Comprehensive API documentation and monitoring dashboard"
                ]
            },
            {
                "title": "Full-Stack Data Intelligence & Analytics Dashboard",
                "description": "Construct an interactive monitoring and analytics dashboard showcasing real-time data streams and predictive metrics.",
                "skills_targeted": candidate_skills[:2] + top_gaps[:2],
                "difficulty": "Intermediate",
                "relevance_explanation": "Combines existing strengths with newly acquired skill gaps to demonstrate full-stack versatility.",
                "key_features": [
                    "Responsive analytics UI",
                    "Cached database query layer",
                    "Automated alert notifications"
                ]
            }
        ]

        return {
            "roadmap": {
                "total_weeks": 4,
                "weeks": weeks,
                "capstone_project": capstone
            },
            "recommended_projects": recommended_projects
        }

roadmap_generator = RoadmapGenerator()
