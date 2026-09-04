import React from 'react';
import { ScoreBreakdown } from '../types';
import { CheckCircle2, ShieldAlert, Sparkles, Award, Target } from 'lucide-react';

interface MatchScoreCardProps {
  overallMatchScore: number;
  jobReadinessScore: number;
  scoreBreakdown: ScoreBreakdown;
  aiExplanation: string;
  jobTitle: string;
  company: string;
}

export const MatchScoreCard: React.FC<MatchScoreCardProps> = ({
  overallMatchScore,
  jobReadinessScore,
  scoreBreakdown,
  aiExplanation,
  jobTitle,
  company,
}) => {
  const getScoreBadge = (score: number) => {
    if (score >= 75) return 'text-emerald-700 border-emerald-200 bg-emerald-50';
    if (score >= 55) return 'text-amber-700 border-amber-200 bg-amber-50';
    return 'text-rose-700 border-rose-200 bg-rose-50';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 80) return 'Strong Match';
    if (score >= 60) return 'Moderate Match';
    return 'Gaps Identified';
  };

  const categoryLabels: Record<keyof ScoreBreakdown, { label: string; weight: string }> = {
    technical_skills: { label: 'Technical Skills', weight: '40%' },
    experience: { label: 'Experience Level', weight: '20%' },
    projects: { label: 'Practical Projects', weight: '15%' },
    education: { label: 'Education Match', weight: '10%' },
    certifications: { label: 'Certifications', weight: '5%' },
    soft_skills: { label: 'Soft Skills', weight: '5%' },
    domain_knowledge: { label: 'Domain Knowledge', weight: '5%' },
  };

  const ringColor = overallMatchScore >= 75 ? '#2563eb' : overallMatchScore >= 55 ? '#d97706' : '#e11d48';

  return (
    <div className="space-y-6">
      {/* Target Job Overview Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Target Position Evaluation</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">{jobTitle}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{company || 'Target Organization'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-sm text-slate-700 font-medium">
            <Target className="w-4 h-4 text-blue-600" />
            <span>Readiness Score: <b className="text-emerald-600 font-bold">{jobReadinessScore}%</b></span>
          </div>
          <div className={`px-4 py-2 rounded-xl border font-bold text-sm flex items-center gap-2 ${getScoreBadge(overallMatchScore)}`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{getMatchLabel(overallMatchScore)} ({overallMatchScore}%)</span>
          </div>
        </div>
      </div>

      {/* Main Score Metrics & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gauge Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Overall Job Match</span>
          
          {/* Circular Score Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke={ringColor}
                strokeDasharray={`${overallMatchScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900 tracking-tight">{overallMatchScore}%</span>
              <span className="text-xs text-slate-500 mt-1 font-medium">Weighted Score</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-around text-xs">
            <div>
              <span className="text-slate-500 block">Job Readiness</span>
              <span className="text-base font-black text-emerald-600">{jobReadinessScore}%</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <span className="text-slate-500 block">Match Status</span>
              <span className="text-base font-black text-blue-600">{getMatchLabel(overallMatchScore)}</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Sliders */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> Score Breakdown by Category
            </h3>
            <span className="text-xs text-slate-500 font-medium">Weighted Multi-Factor Breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 pt-2">
            {(Object.keys(scoreBreakdown) as Array<keyof ScoreBreakdown>).map((key) => {
              const val = scoreBreakdown[key];
              const info = categoryLabels[key];
              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-semibold">{info.label} <span className="text-slate-400 font-normal">({info.weight})</span></span>
                    <span className="font-black text-slate-900">{val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        val >= 75 ? 'bg-blue-600' : val >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* AI Plain-English Explanation Quote Box */}
      <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 shadow-sm relative">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-sm mt-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">AI Compatibility Explanation</h4>
            <p className="text-sm text-slate-800 leading-relaxed font-normal">{aiExplanation}</p>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>Note: AI-generated compatibility estimate based on supplied resume & job criteria.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
