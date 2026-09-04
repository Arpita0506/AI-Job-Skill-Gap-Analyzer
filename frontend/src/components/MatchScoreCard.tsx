import React from 'react';
import { ScoreBreakdown } from '../types';
import { ShieldAlert, Sparkles, Target, TrendingUp } from 'lucide-react';

interface MatchScoreCardProps {
  overallMatchScore: number;
  jobReadinessScore: number;
  scoreBreakdown: ScoreBreakdown;
  aiExplanation: string;
  jobTitle: string;
  company: string;
}

export const MatchScoreCard: React.FC<MatchScoreCardProps> = ({
  overallMatchScore, jobReadinessScore, scoreBreakdown, aiExplanation, jobTitle, company
}) => {
  const getLabel = (s: number) => s >= 80 ? 'Strong Match' : s >= 60 ? 'Moderate Match' : 'Gaps Identified';
  const getRingColor = (s: number) => s >= 75 ? '#f59e0b' : s >= 55 ? '#fb923c' : '#f43f5e';

  const categories: Record<keyof ScoreBreakdown, { label: string; weight: string }> = {
    technical_skills:  { label: 'Technical Skills',  weight: '40%' },
    experience:        { label: 'Experience',         weight: '20%' },
    projects:          { label: 'Projects',           weight: '15%' },
    education:         { label: 'Education',          weight: '10%' },
    certifications:    { label: 'Certifications',     weight: '5%'  },
    soft_skills:       { label: 'Soft Skills',        weight: '5%'  },
    domain_knowledge:  { label: 'Domain Knowledge',   weight: '5%'  },
  };

  const getBarColor = (v: number) =>
    v >= 75 ? 'from-amber-400 to-teal-400' : v >= 50 ? 'from-orange-500 to-amber-400' : 'from-rose-500 to-pink-500';

  return (
    <div className="space-y-5">

      {/* Header strip */}
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Target Position</span>
          <h2 className="text-2xl font-black text-white mt-1">{jobTitle}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{company || 'Target Organization'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-teal-500/10 border border-teal-500/25 rounded-xl flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-teal-400" />
            <span className="text-slate-300">Readiness: <b className="text-teal-400">{jobReadinessScore}%</b></span>
          </div>
          <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/25 rounded-xl text-sm font-bold text-amber-400">
            {getLabel(overallMatchScore)} · {overallMatchScore}%
          </div>
        </div>
      </div>

      {/* Gauge + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Circular Gauge */}
        <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Job Match</span>
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1a2236" strokeWidth="3.5" />
              <circle
                cx="18" cy="18" r="15.915" fill="none"
                stroke={getRingColor(overallMatchScore)}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${overallMatchScore} 100`}
                style={{ filter: `drop-shadow(0 0 6px ${getRingColor(overallMatchScore)})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{overallMatchScore}%</span>
              <span className="text-[10px] text-slate-500 mt-1">Weighted Score</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1a2236] w-full grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Readiness</span>
              <span className="font-black text-teal-400 text-base">{jobReadinessScore}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">Verdict</span>
              <span className="font-black text-amber-400 text-xs leading-tight">{getLabel(overallMatchScore)}</span>
            </div>
          </div>
        </div>

        {/* Score Bars */}
        <div className="lg:col-span-2 bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a2236]">
            <h3 className="font-black text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" /> Category Breakdown
            </h3>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Weighted Evaluation</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-1">
            {(Object.keys(scoreBreakdown) as Array<keyof ScoreBreakdown>).map(key => {
              const val = scoreBreakdown[key];
              const info = categories[key];
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">{info.label} <span className="text-slate-600">({info.weight})</span></span>
                    <span className="font-black text-white">{val}%</span>
                  </div>
                  <div className="w-full bg-[#07090f] rounded-full h-2 border border-[#1a2236]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getBarColor(val)} transition-all`}
                      style={{ width: `${val}%`, boxShadow: val >= 75 ? '0 0 8px rgba(245,158,11,0.4)' : 'none' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-gradient-to-r from-amber-950/30 via-[#0d1117] to-[#07090f] border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest">AI Match Rationale</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{aiExplanation}</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <ShieldAlert className="w-3 h-3" /> AI-generated estimate based strictly on supplied resume & job criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
