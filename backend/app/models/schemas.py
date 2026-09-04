from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    is_active: bool

class ParsedResume(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    summary: Optional[str] = None
    education: List[Dict[str, Any]] = []
    skills: Dict[str, List[str]] = {
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
    all_extracted_skills: List[str] = []
    normalized_skills: List[str] = []
    certifications: List[str] = []
    projects: List[Dict[str, Any]] = []
    experience: List[Dict[str, Any]] = []
    achievements: List[str] = []
    raw_text: str = ""

class ParsedJobDescription(BaseModel):
    job_title: str = "Unknown Role"
    company: Optional[str] = "Target Company"
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    technical_skills: List[str] = []
    soft_skills: List[str] = []
    education_requirements: List[str] = []
    experience_requirements: str = "0-2 years"
    certifications: List[str] = []
    responsibilities: List[str] = []
    tools_and_technologies: List[str] = []
    domain_knowledge: List[str] = []
    raw_text: str = ""

class SkillMatchItem(BaseModel):
    skill: str
    category: str  # technical, soft, domain, tool
    requirement_type: str  # MUST HAVE, GOOD TO HAVE
    match_status: str  # Strong Match, Partial Match, Missing Skill
    match_score: float  # 0.0 to 1.0
    matched_with: Optional[str] = None
    importance: str  # Critical, High, Medium, Low
    priority: str  # Critical, High, Medium, Low
    why_it_matters: str
    recommended_resources: List[Dict[str, str]] = []
    estimated_difficulty: str = "Medium"
    suggested_project: str = ""

class ScoreBreakdown(BaseModel):
    technical_skills: float
    experience: float
    projects: float
    education: float
    certifications: float
    soft_skills: float
    domain_knowledge: float

class ATSResult(BaseModel):
    ats_score: float
    formatting_issues: List[str] = []
    missing_keywords: List[str] = []
    improvement_suggestions: List[Dict[str, str]] = []
    readability_score: float = 85.0
    section_checks: Dict[str, bool] = {}

class RoadmapWeek(BaseModel):
    week: int
    title: str
    skills_focus: List[str]
    what_to_learn: str
    why_to_learn: str
    prerequisites: List[str]
    estimated_hours: int
    mini_project: str
    expected_outcome: str

class RoadmapResponse(BaseModel):
    total_weeks: int = 4
    weeks: List[RoadmapWeek]
    capstone_project: Dict[str, Any]

class RecommendedProject(BaseModel):
    title: str
    description: str
    skills_targeted: List[str]
    difficulty: str
    relevance_explanation: str
    key_features: List[str]

class InterviewQuestion(BaseModel):
    id: str
    category: str  # Technical, Resume, Project, Behavioral, Missing Skill
    question: str
    context_or_reason: str
    sample_ideal_answer: str

class AnalysisResultResponse(BaseModel):
    id: str
    overall_match_score: float
    job_readiness_score: float
    score_breakdown: ScoreBreakdown
    ai_explanation: str
    parsed_resume: ParsedResume
    parsed_jd: ParsedJobDescription
    skill_matches: List[SkillMatchItem]
    strong_matches: List[str]
    partial_matches: List[str]
    missing_skills: List[str]
    ats_analysis: ATSResult
    learning_roadmap: RoadmapResponse
    recommended_projects: List[RecommendedProject]
    interview_questions: List[InterviewQuestion]
    action_plan: List[str]

class AnalyzeRequest(BaseModel):
    resume_text: Optional[str] = None
    job_description_text: str
    use_demo_preset: Optional[str] = None
