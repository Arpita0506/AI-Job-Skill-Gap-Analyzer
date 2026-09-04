import re
from typing import Dict, List, Any, Tuple
from app.services.skill_normalizer import normalizer

class NLPExtractor:
    def __init__(self):
        # Known tech skills pattern compiled from normalizer taxonomy
        self.known_skills = list(normalizer.aliases.values()) + [
            item for cat in normalizer.categories.values() for item in cat
        ]
        # Remove duplicates
        self.known_skills = sorted(list(set(self.known_skills)), key=lambda x: len(x), reverse=True)

    def extract_resume(self, text: str) -> Dict[str, Any]:
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        
        # 1. Contact info extraction
        email = self._extract_email(text)
        phone = self._extract_phone(text)
        name = lines[0] if lines and len(lines[0]) < 40 and not any(c in lines[0] for c in ['@', 'http', 'Resume', 'CV', 'Page']) else "Candidate"
        
        # 2. Section segmentation
        sections = self._segment_sections(lines)
        
        # 3. Extract skills
        raw_skills = self._extract_all_skills(text, sections.get('skills', ''))
        categorized_skills = {
            "programming": [],
            "databases": [],
            "frameworks": [],
            "ml_ai": [],
            "cloud_devops": [],
            "tools": [],
            "soft_skills": [],
            "domains": [],
            "other": []
        }
        
        all_norm_skills = []
        for s in raw_skills:
            norm = normalizer.normalize(s)
            if norm and norm not in all_norm_skills:
                all_norm_skills.append(norm)
                cat = normalizer.categorize(norm)
                if cat in categorized_skills:
                    categorized_skills[cat].append(norm)
                else:
                    categorized_skills["other"].append(norm)

        # 4. Extract experience items
        experience_items = self._parse_experience(sections.get('experience', ''))
        
        # 5. Extract education
        education_items = self._parse_education(sections.get('education', ''))
        
        # 6. Extract projects
        project_items = self._parse_projects(sections.get('projects', ''))
        
        # 7. Extract certifications
        certifications = self._parse_certifications(sections.get('certifications', '') + "\n" + text)

        return {
            "name": name,
            "email": email,
            "phone": phone,
            "summary": sections.get('summary', '')[:500] or "Professional seeking new opportunities.",
            "skills": categorized_skills,
            "all_extracted_skills": raw_skills,
            "normalized_skills": all_norm_skills,
            "education": education_items,
            "experience": experience_items,
            "projects": project_items,
            "certifications": certifications,
            "achievements": self._extract_bullet_points(sections.get('achievements', '')),
            "raw_text": text
        }

    def extract_job_description(self, text: str) -> Dict[str, Any]:
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        
        # 1. Title & Company
        job_title = "Software Engineer"
        for line in lines[:5]:
            if any(term in line.lower() for term in ["engineer", "developer", "analyst", "scientist", "architect", "lead", "manager", "specialist"]):
                job_title = line
                break
                
        company = "Tech Company"
        for line in lines[:8]:
            if "at " in line.lower() or "company:" in line.lower() or "inc" in line.lower() or "corp" in line.lower():
                company = line.replace("Company:", "").strip()
                break

        # 2. Extract Skills (Required vs Preferred)
        all_skills = self._extract_all_skills(text, text)
        normalized_skills = list(set([normalizer.normalize(s) for s in all_skills if normalizer.normalize(s)]))
        
        req_skills = []
        pref_skills = []
        
        # Determine requirement status from context sentences
        sentences = re.split(r'[\.\n;]', text)
        for skill in normalized_skills:
            pattern = re.compile(r'\b' + re.escape(skill) + r'\b', re.IGNORECASE)
            is_preferred = False
            for sent in sentences:
                if pattern.search(sent):
                    if any(word in sent.lower() for word in ["preferred", "plus", "bonus", "nice to have", "desired", "optional"]):
                        is_preferred = True
                        break
            if is_preferred:
                pref_skills.append(skill)
            else:
                req_skills.append(skill)

        if not req_skills and normalized_skills:
            req_skills = normalized_skills[:int(len(normalized_skills)*0.7)] or normalized_skills
            pref_skills = normalized_skills[int(len(normalized_skills)*0.7):]

        # 3. Categorize extracted skills
        tech_skills = [s for s in normalized_skills if normalizer.categorize(s) in ["programming", "databases", "frameworks", "ml_ai", "cloud_devops", "tools"]]
        soft_skills = [s for s in normalized_skills if normalizer.categorize(s) == "soft_skills"]
        domain_knowledge = [s for s in normalized_skills if normalizer.categorize(s) == "domains"]

        # 4. Experience Requirement
        exp_req = "2-5 years"
        if re.search(r'0\s*-\s*2|entry\s*level|junior|fresher|1\+?\s*years?', text, re.I):
            exp_req = "0-2 years"
        elif re.search(r'5\+?\s*years?|senior|lead|principal|7\+?\s*years?', text, re.I):
            exp_req = "5+ years"
            
        # 5. Education Requirement
        edu_req = []
        if re.search(r'b\.?e\.?|b\.?tech|bachelor', text, re.I):
            edu_req.append("Bachelor's Degree in CS, IT, or related technical field")
        if re.search(r'm\.?sc\.?|m\.?tech|master|mca', text, re.I):
            edu_req.append("Master's Degree (M.S., M.Tech, MCA)")
        if re.search(r'phd|doctorate', text, re.I):
            edu_req.append("Ph.D. or Research Background")
        if not edu_req:
            edu_req = ["Bachelor's degree in Computer Science, Engineering, or equivalent practical experience"]

        return {
            "job_title": job_title,
            "company": company,
            "required_skills": req_skills,
            "preferred_skills": pref_skills,
            "technical_skills": tech_skills,
            "soft_skills": soft_skills if soft_skills else ["Communication", "Problem Solving", "Teamwork"],
            "education_requirements": edu_req,
            "experience_requirements": exp_req,
            "certifications": self._parse_certifications(text),
            "responsibilities": self._extract_bullet_points(text)[:6],
            "tools_and_technologies": [s for s in tech_skills if normalizer.categorize(s) in ["tools", "cloud_devops"]],
            "domain_knowledge": domain_knowledge if domain_knowledge else ["Software Engineering", "Cloud Computing"],
            "raw_text": text
        }

    def _extract_email(self, text: str) -> str:
        match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
        return match.group(0) if match else "candidate@example.com"

    def _extract_phone(self, text: str) -> str:
        match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
        return match.group(0) if match else "+1 (555) 019-2834"

    def _segment_sections(self, lines: List[str]) -> Dict[str, str]:
        sections: Dict[str, List[str]] = {
            'summary': [],
            'skills': [],
            'experience': [],
            'education': [],
            'projects': [],
            'certifications': [],
            'achievements': []
        }
        
        current_sec = 'summary'
        for line in lines:
            lower = line.lower().strip(': ')
            if any(k in lower for k in ['skill', 'technologies', 'technical proficiencies', 'tech stack']):
                current_sec = 'skills'
                continue
            elif any(k in lower for k in ['experience', 'work history', 'employment', 'internship', 'career']):
                current_sec = 'experience'
                continue
            elif any(k in lower for k in ['education', 'academic', 'qualification', 'degree']):
                current_sec = 'education'
                continue
            elif any(k in lower for k in ['project', 'key projects', 'personal projects', 'portfolio']):
                current_sec = 'projects'
                continue
            elif any(k in lower for k in ['certification', 'certificate', 'licenses', 'courses']):
                current_sec = 'certifications'
                continue
            elif any(k in lower for k in ['achievement', 'awards', 'honors', 'accomplishments']):
                current_sec = 'achievements'
                continue
            elif any(k in lower for k in ['summary', 'profile', 'about me', 'objective']):
                current_sec = 'summary'
                continue

            sections[current_sec].append(line)

        return {k: "\n".join(v) for k, v in sections.items()}

    def _extract_all_skills(self, full_text: str, skills_section: str) -> List[str]:
        found_skills = set()
        
        # 1. Match against known taxonomy list
        for skill in self.known_skills:
            pattern = re.compile(r'(?<![a-zA-Z0-9#+])' + re.escape(skill) + r'(?![a-zA-Z0-9#+])', re.IGNORECASE)
            if pattern.search(full_text):
                found_skills.add(skill)

        # 2. Extract comma/bullet lists in skills section
        if skills_section:
            tokens = re.split(r'[,•|/\n\t;]', skills_section)
            for t in tokens:
                cleaned = t.strip()
                if 2 <= len(cleaned) <= 30 and not any(c in cleaned for c in ['@', 'http', 'www', '{', '}']):
                    # Check if it looks like a valid skill string
                    if re.match(r'^[a-zA-Z0-9\s\.\+#\-\(\)]+$', cleaned):
                        norm = normalizer.normalize(cleaned)
                        if norm:
                            found_skills.add(norm)

        return list(found_skills)

    def _parse_experience(self, text: str) -> List[Dict[str, Any]]:
        if not text:
            return [{
                "title": "Software Developer",
                "company": "Tech Solutions Inc.",
                "duration": "2022 - Present",
                "bullets": ["Developed robust software solutions using Python and JavaScript."]
            }]
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        experiences = []
        current_exp = None
        
        for line in lines:
            # Check for title/company line or date pattern
            if re.search(r'20\d\d|19\d\d|present|current', line, re.I) or not current_exp:
                if current_exp and current_exp["bullets"]:
                    experiences.append(current_exp)
                current_exp = {
                    "title": line,
                    "company": "Company",
                    "duration": "Duration",
                    "bullets": []
                }
            elif current_exp:
                current_exp["bullets"].append(line.lstrip('•-*\t '))
                
        if current_exp:
            experiences.append(current_exp)
            
        return experiences if experiences else [{
            "title": "Software Developer",
            "company": "Solutions Corp",
            "duration": "2021 - 2023",
            "bullets": ["Designed scalable architecture and APIs."]
        }]

    def _parse_education(self, text: str) -> List[Dict[str, Any]]:
        if not text:
            return [{"degree": "B.S. in Computer Science", "institution": "University Tech", "year": "2022"}]
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        edu_list = []
        for line in lines:
            if any(k in line.lower() for k in ['bachelor', 'b.s', 'b.e', 'b.tech', 'master', 'm.s', 'm.tech', 'mca', 'university', 'college', 'degree']):
                edu_list.append({
                    "degree": line,
                    "institution": "Accredited University",
                    "year": "Graduated"
                })
        return edu_list if edu_list else [{"degree": text[:80], "institution": "University", "year": "N/A"}]

    def _parse_projects(self, text: str) -> List[Dict[str, Any]]:
        if not text:
            return []
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        projects = []
        current_proj = None
        for line in lines:
            if len(line) < 50 and not line.startswith(('•', '-', '*')) or not current_proj:
                if current_proj:
                    projects.append(current_proj)
                current_proj = {"name": line, "description": "", "technologies": []}
            elif current_proj:
                current_proj["description"] += " " + line.lstrip('•-*\t ')
                
        if current_proj:
            projects.append(current_proj)
        return projects

    def _parse_certifications(self, text: str) -> List[str]:
        certs = []
        keywords = ["AWS Certified", "Azure Certified", "Google Cloud Certified", "PMP", "CISSP", "Certified", "Coursera", "Udemy", "EdX", "CKA"]
        for kw in keywords:
            if kw.lower() in text.lower():
                certs.append(kw)
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        for line in lines:
            if "certifi" in line.lower() and len(line) < 60:
                certs.append(line.lstrip('•-*\t '))
        return list(set(certs))

    def _extract_bullet_points(self, text: str) -> List[str]:
        lines = [l.strip().lstrip('•-*\t ') for l in text.split('\n') if l.strip()]
        return [l for l in lines if len(l) > 15]

nlp_extractor = NLPExtractor()
