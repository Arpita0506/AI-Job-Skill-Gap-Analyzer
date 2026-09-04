from typing import List, Dict, Any

class InterviewPrepGenerator:
    def generate_questions(
        self,
        resume_data: Dict[str, Any],
        jd_data: Dict[str, Any],
        missing_skills: List[str],
        strong_matches: List[str]
    ) -> List[Dict[str, Any]]:
        questions = []
        q_id = 1
        
        job_title = jd_data.get("job_title", "Software Engineer")
        cand_projects = resume_data.get("projects", [])
        cand_exp = resume_data.get("experience", [])

        # 1. Technical Questions (based on strong match skills)
        tech_skill = strong_matches[0] if strong_matches else "Python"
        questions.append({
            "id": f"q_{q_id}",
            "category": "Technical Questions",
            "question": f"How do you handle performance optimization and memory management when developing with {tech_skill}?",
            "context_or_reason": f"Evaluates core technical depth in {tech_skill}, which is highlighted on your resume as a strong match requirement.",
            "sample_ideal_answer": f"In {tech_skill}, I optimize performance by avoiding unnecessary memory allocations, using efficient data structures, leveraging asynchronous I/O where applicable, and profiling code paths to eliminate bottlenecks."
        })
        q_id += 1

        # 2. Resume Questions (based on experience)
        first_role = cand_exp[0]["title"] if cand_exp else "Developer Role"
        questions.append({
            "id": f"q_{q_id}",
            "category": "Resume Questions",
            "question": f"In your role as {first_role}, what was the most complex technical challenge you faced, and how did you resolve it?",
            "context_or_reason": "Assesses your ability to articulate practical problem-solving experiences listed under your recent work history.",
            "sample_ideal_answer": f"During my time in that role, we encountered high latency during peak traffic. I diagnosed slow database queries, introduced caching layers, and refactored payload handling, resulting in a 40% performance improvement."
        })
        q_id += 1

        # 3. Project Questions (based on projects actually present in resume)
        proj_name = cand_projects[0]["name"] if cand_projects else "Web Application Project"
        questions.append({
            "id": f"q_{q_id}",
            "category": "Project Questions",
            "question": f"Can you walk me through the system architecture of '{proj_name}' and explain why you chose your specific tech stack?",
            "context_or_reason": "Verifies project ownership, architectural design rationale, and technical decision-making.",
            "sample_ideal_answer": f"For '{proj_name}', I selected a modular architecture to separate data ingestion, business logic, and presentation. This decoupled design allowed rapid iteration and simplified testing."
        })
        q_id += 1

        # 4. Behavioral Questions
        questions.append({
            "id": f"q_{q_id}",
            "category": "Behavioral Questions",
            "question": "Describe a situation where project requirements changed unexpectedly close to a deadline. How did you handle it?",
            "context_or_reason": "Evaluates adaptability, prioritization under pressure, and cross-functional communication.",
            "sample_ideal_answer": "I immediately convened a brief sync with stakeholders to evaluate trade-offs, prioritized core MVP deliverables, communicated risks clearly, and refactored sprint goals to hit the deadline smoothly."
        })
        q_id += 1

        # 5. Missing Skill Questions
        missing_skill = missing_skills[0] if missing_skills else "AWS"
        questions.append({
            "id": f"q_{q_id}",
            "category": "Missing Skill Questions",
            "question": f"The position heavily emphasizes {missing_skill}, which is not explicitly detailed on your resume. How would you approach quickly acquiring hands-on mastery in {missing_skill} for this team?",
            "context_or_reason": f"Directly tests learning agility and proactive preparation for identified skill gap: {missing_skill}.",
            "sample_ideal_answer": f"Although my background focuses heavily on related frameworks, I have already started a structured 30-day learning plan for {missing_skill}. I learn rapidly by building hands-on containerized prototypes and leveraging my strong foundation in software design."
        })

        return questions

interview_prep_generator = InterviewPrepGenerator()
