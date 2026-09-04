export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills: {
    programming: string[];
    databases: string[];
    frameworks: string[];
    ml_ai: string[];
    cloud_devops: string[];
    tools: string[];
    soft_skills: string[];
    domains: string[];
    other: string[];
  };
  all_extracted_skills: string[];
  normalized_skills: string[];
  education: Array<{ degree: string; institution: string; year: string }>;
  experience: Array<{ title: string; company: string; duration: string; bullets: string[] }>;
  projects: Array<{ name: string; description: string; technologies: string[] }>;
  certifications: string[];
  achievements: string[];
  raw_text: string;
}

export interface ParsedJobDescription {
  job_title: string;
  company?: string;
  required_skills: string[];
  preferred_skills: string[];
  technical_skills: string[];
  soft_skills: string[];
  education_requirements: string[];
  experience_requirements: string;
  certifications: string[];
  responsibilities: string[];
  tools_and_technologies: string[];
  domain_knowledge: string[];
  raw_text: string;
}

export interface SkillMatchItem {
  skill: string;
  category: string;
  requirement_type: string;
  match_status: 'Strong Match' | 'Partial Match' | 'Missing Skill';
  match_score: number;
  matched_with?: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  why_it_matters: string;
  recommended_resources: Array<{ title: string; url: string }>;
  estimated_difficulty: string;
  suggested_project: string;
}

export interface ScoreBreakdown {
  technical_skills: number;
  experience: number;
  projects: number;
  education: number;
  certifications: number;
  soft_skills: number;
  domain_knowledge: number;
}

export interface ATSResult {
  ats_score: number;
  formatting_issues: string[];
  missing_keywords: string[];
  improvement_suggestions: Array<{ weak: string; improved: string; reason: string }>;
  readability_score: number;
  section_checks: Record<string, boolean>;
}

export interface RoadmapWeek {
  week: number;
  title: string;
  skills_focus: string[];
  what_to_learn: string;
  why_to_learn: string;
  prerequisites: string[];
  estimated_hours: number;
  mini_project: string;
  expected_outcome: string;
}

export interface RoadmapResponse {
  total_weeks: number;
  weeks: RoadmapWeek[];
  capstone_project: {
    title: string;
    description: string;
    skills_targeted: string[];
    estimated_days: number;
  };
}

export interface RecommendedProject {
  title: string;
  description: string;
  skills_targeted: string[];
  difficulty: string;
  relevance_explanation: string;
  key_features: string[];
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  context_or_reason: string;
  sample_ideal_answer: string;
}

export interface AnalysisResultResponse {
  id: string;
  overall_match_score: number;
  job_readiness_score: number;
  score_breakdown: ScoreBreakdown;
  ai_explanation: string;
  parsed_resume: ParsedResume;
  parsed_jd: ParsedJobDescription;
  skill_matches: SkillMatchItem[];
  strong_matches: string[];
  partial_matches: string[];
  missing_skills: string[];
  ats_analysis: ATSResult;
  learning_roadmap: RoadmapResponse;
  recommended_projects: RecommendedProject[];
  interview_questions: InterviewQuestion[];
  action_plan: string[];
}
