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

export const Dashboard: React.FC<DashboardProps> = ({
  analysisResult,
  onAnalysisUpdate,
  onOpenPresets,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [resumeText, setResumeText] = useState<string>('');
  const [jdText, setJdText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    if (!resumeText.trim() || !jdText.trim()) {
      setError('Please provide both resume content and target job description text (or load a demo preset scenario).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.runMatchAnalysis({
        resume_text: resumeText,
        job_description_text: jdText,
      });
      onAnalysisUpdate(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to complete AI match analysis.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Match Overview', icon: Sparkles },
    { id: 'skill_gaps', label: 'Skill Gap Matrix', icon: Layers },
    { id: 'ats', label: 'ATS Analysis', icon: FileCheck },
    { id: 'roadmap', label: '30-Day Roadmap', icon: Calendar },
    { id: 'projects', label: 'Recommended Projects', icon: FolderGit2 },
    { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
    { id: 'improvements', label: 'Resume Polish', icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      
      {/* Input Section if No Analysis or Updating */}
      {!analysisResult ? (
        <div className="space-y-6">
          
          {/* Hero Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Next-Gen AI Career Intelligence
            </div>
            <h2 className="text-3xl font-black tracking-tight">
              AI Job & Skill Gap Analyzer Platform
            </h2>
            <p className="text-sm text-blue-100 max-w-3xl leading-relaxed">
              Upload your resume and target job description to extract structured skills, run vector semantic matching, compute ATS compatibility, and generate a custom 30-day learning roadmap with interview prep questions.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPresets}
                className="px-5 py-2.5 bg-white hover:bg-slate-100 text-blue-700 font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition"
              >
                <Zap className="w-4 h-4 text-blue-600" /> Load 1-Click Demo Scenarios
              </button>
            </div>
          </div>

          {/* Dual Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResumeUploader
              onParsed={(parsed, text) => setResumeText(text)}
            />
            <JobDescriptionInput
              onParsed={(parsed, text) => setJdText(text)}
            />
          </div>

          {/* Run Analysis Submit Action */}
          <div className="flex flex-col items-center space-y-3 pt-2">
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/25 flex items-center gap-3 transition transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Running AI Semantic Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Compatibility & Skill Gaps</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Render Analysis Results Dashboard */
        <div className="space-y-6">
          
          {/* Top Tab Bar */}
          <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Views */}
          {activeTab === 'overview' && (
            <MatchScoreCard
              overallMatchScore={analysisResult.overall_match_score}
              jobReadinessScore={analysisResult.job_readiness_score}
              scoreBreakdown={analysisResult.score_breakdown}
              aiExplanation={analysisResult.ai_explanation}
              jobTitle={analysisResult.parsed_jd.job_title}
              company={analysisResult.parsed_jd.company || 'Target Company'}
            />
          )}

          {activeTab === 'skill_gaps' && (
            <SkillGapTable skillMatches={analysisResult.skill_matches} />
          )}

          {activeTab === 'ats' && (
            <ATSAnalysisView atsAnalysis={analysisResult.ats_analysis} />
          )}

          {activeTab === 'roadmap' && (
            <LearningRoadmapView roadmap={analysisResult.learning_roadmap} />
          )}

          {activeTab === 'projects' && (
            <ProjectRecommendationsView projects={analysisResult.recommended_projects} />
          )}

          {activeTab === 'interview' && (
            <InterviewPrepView questions={analysisResult.interview_questions} />
          )}

          {activeTab === 'improvements' && (
            <ResumeImprovementView resume={analysisResult.parsed_resume} />
          )}

          {/* Quick Return / Reset Controls */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <span>Analysis ID: <code className="text-slate-700 font-mono font-semibold">{analysisResult.id}</code></span>
            <button
              onClick={() => onAnalysisUpdate(null as any)}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-300 font-semibold shadow-sm transition"
            >
              Analyze New Resume / Job Description
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
