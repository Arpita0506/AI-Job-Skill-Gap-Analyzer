import React, { useState } from 'react';
import { AnalysisResultResponse } from '../types';
import { MatchScoreCard } from './MatchScoreCard';
import { SkillGapTable } from './SkillGapTable';
import { ATSAnalysisView } from './ATSAnalysisView';
import { LearningRoadmapView } from './LearningRoadmapView';
import { ProjectRecommendationsView } from './ProjectRecommendationsView';
import { InterviewPrepView } from './InterviewPrepView';
import { ResumeImprovementView } from './ResumeImprovementView';
import { ResumeUploader } from './ResumeUploader';
import { JobDescriptionInput } from './JobDescriptionInput';
import { api } from '../services/api';
import {
  Sparkles, Layers, FileCheck, Calendar, FolderGit2, HelpCircle,
  FileText, ArrowRight, RefreshCw, AlertCircle, Cpu, Zap
} from 'lucide-react';

interface DashboardProps {
  analysisResult: AnalysisResultResponse | null;
  onAnalysisUpdate: (result: AnalysisResultResponse) => void;
  onOpenPresets: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ analysisResult, onAnalysisUpdate, onOpenPresets }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [resumeText, setResumeText] = useState<string>('');
  const [jdText, setJdText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    if (!resumeText.trim() || !jdText.trim()) {
      setError('Please provide both resume and job description, or load a demo preset.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await api.runMatchAnalysis({ resume_text: resumeText, job_description_text: jdText });
      onAnalysisUpdate(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'AI analysis pipeline error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview',      label: 'Match Overview',        icon: Sparkles,    accent: 'amber' },
    { id: 'skill_gaps',    label: 'Skill Gap Matrix',       icon: Layers,      accent: 'teal' },
    { id: 'ats',           label: 'ATS Analysis',           icon: FileCheck,   accent: 'amber' },
    { id: 'roadmap',       label: '30-Day Roadmap',         icon: Calendar,    accent: 'teal' },
    { id: 'projects',      label: 'Projects',               icon: FolderGit2,  accent: 'rose' },
    { id: 'interview',     label: 'Interview Prep',         icon: HelpCircle,  accent: 'amber' },
    { id: 'improvements',  label: 'Resume Polish',          icon: FileText,    accent: 'teal' },
  ];

  if (!analysisResult) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Hero */}
        <div className="grad-border p-8 space-y-5">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">AI-Powered Career Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Match Your Resume To Any <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-teal-400">
              Job Description — Instantly.
            </span>
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Upload your resume and paste any job description. Our NLP engine extracts skills, runs semantic vector matching, computes ATS scores, and generates a personalized 30-day learning roadmap with portfolio project ideas and interview questions.
          </p>
          <div className="pt-1 flex flex-wrap gap-3">
            <button
              onClick={onOpenPresets}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all glow-amber"
            >
              <Zap className="w-4 h-4" /> Load Demo Scenarios
            </button>
            <button
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-[#0d1117] hover:bg-[#131c2e] border border-[#1a2236] text-slate-300 font-semibold text-sm rounded-xl transition-all"
            >
              Upload My Resume →
            </button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Semantic NLP Matching','Weighted Score (0–100)','ATS Compatibility','30-Day Roadmap','PDF Export','Interview Prep'].map(f => (
              <span key={f} className="px-2.5 py-1 bg-[#0d1117] border border-[#1a2236] text-slate-400 text-[11px] rounded-lg font-medium">✦ {f}</span>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div id="upload-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResumeUploader onParsed={(_, text) => setResumeText(text)} />
          <JobDescriptionInput onParsed={(_, text) => setJdText(text)} />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-10 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-black text-base rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 glow-amber"
          >
            {loading ? (
              <><RefreshCw className="w-5 h-5 animate-spin" /> Analyzing with AI Engine...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Analyze Job Compatibility & Skill Gaps <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/60 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

      {/* Tab Bar */}
      <div className="flex items-center bg-[#0d1117] p-1.5 rounded-2xl border border-[#1a2236] overflow-x-auto gap-1">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          const activeClasses =
            t.accent === 'amber' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-amber-500/20' :
            t.accent === 'teal'  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-black shadow-md shadow-teal-500/20' :
                                   'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20';
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition-all ${isActive ? activeClasses : 'text-slate-500 hover:text-slate-300 hover:bg-[#131c2e]'}`}
            >
              <Icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Views */}
      {activeTab === 'overview'     && <MatchScoreCard overallMatchScore={analysisResult.overall_match_score} jobReadinessScore={analysisResult.job_readiness_score} scoreBreakdown={analysisResult.score_breakdown} aiExplanation={analysisResult.ai_explanation} jobTitle={analysisResult.parsed_jd.job_title} company={analysisResult.parsed_jd.company || ''} />}
      {activeTab === 'skill_gaps'   && <SkillGapTable skillMatches={analysisResult.skill_matches} />}
      {activeTab === 'ats'          && <ATSAnalysisView atsAnalysis={analysisResult.ats_analysis} />}
      {activeTab === 'roadmap'      && <LearningRoadmapView roadmap={analysisResult.learning_roadmap} />}
      {activeTab === 'projects'     && <ProjectRecommendationsView projects={analysisResult.recommended_projects} />}
      {activeTab === 'interview'    && <InterviewPrepView questions={analysisResult.interview_questions} />}
      {activeTab === 'improvements' && <ResumeImprovementView resume={analysisResult.parsed_resume} />}

      {/* Footer Reset */}
      <div className="pt-6 border-t border-[#1a2236] flex justify-between items-center text-xs text-slate-500">
        <span>Analysis ID: <code className="text-slate-400 font-mono">{analysisResult.id}</code></span>
        <button
          onClick={() => onAnalysisUpdate(null as any)}
          className="px-4 py-2 bg-[#0d1117] hover:bg-[#131c2e] text-slate-300 rounded-xl border border-[#1a2236] font-semibold transition-all"
        >
          ↩ Analyze New Resume
        </button>
      </div>
    </div>
  );
};
