import React from 'react';
import { ATSResult } from '../types';
import { FileCheck, CheckCircle2, XCircle, Key, Sparkles, ArrowRight } from 'lucide-react';

interface ATSAnalysisViewProps { atsAnalysis: ATSResult; }

export const ATSAnalysisView: React.FC<ATSAnalysisViewProps> = ({ atsAnalysis }) => {
  const ringColor = atsAnalysis.ats_score >= 80 ? '#10b981' : atsAnalysis.ats_score >= 60 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="space-y-5">
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-400">
            <FileCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">ATS Compatibility Report</h3>
            <p className="text-xs text-slate-500 mt-1">Automated Parsing, Keyword Coverage, Formatting & Action-Verb Analysis</p>
          </div>
        </div>

        {/* ATS Ring */}
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1a2236" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.915" fill="none"
                stroke={ringColor} strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={`${atsAnalysis.ats_score} 100`}
                style={{ filter: `drop-shadow(0 0 4px ${ringColor})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-white">{atsAnalysis.ats_score}</span>
              <span className="text-[9px] text-slate-500">/100</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">ATS Score</span>
            <span className="text-2xl font-black" style={{ color: ringColor }}>{atsAnalysis.ats_score >= 80 ? 'Excellent' : atsAnalysis.ats_score >= 60 ? 'Moderate' : 'Needs Work'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Section Checks */}
        <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-5 space-y-3">
          <h4 className="font-black text-white flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-teal-400" />Section Coverage</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(atsAnalysis.section_checks).map(([sec, present]) => (
              <div key={sec} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${present ? 'bg-teal-500/5 border-teal-500/20 text-teal-300' : 'bg-rose-500/5 border-rose-500/20 text-rose-400'}`}>
                <span>{sec}</span>
                {present ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-5 space-y-3">
          <h4 className="font-black text-rose-400 flex items-center gap-2 text-sm"><Key className="w-4 h-4" />Missing High-Impact Keywords</h4>
          <p className="text-[11px] text-slate-500">Found in job description but absent from resume:</p>
          <div className="flex flex-wrap gap-2">
            {atsAnalysis.missing_keywords.length === 0
              ? <span className="text-xs text-teal-400 font-bold">✅ All key terms represented!</span>
              : atsAnalysis.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-rose-950/50 text-rose-300 border border-rose-800/50 rounded-lg text-xs font-bold">+ {kw}</span>
                ))
            }
          </div>
        </div>
      </div>

      {/* Bullet Improvements */}
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 space-y-4">
        <h4 className="font-black text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400" />AI Resume Bullet Upgrades</h4>
        <div className="space-y-4">
          {atsAnalysis.improvement_suggestions.map((item, idx) => (
            <div key={idx} className="bg-[#07090f] border border-[#1a2236] rounded-xl p-4 space-y-3">
              <div>
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider">❌ Weak Phrasing</span>
                <p className="text-xs text-slate-500 bg-[#0d1117] p-2.5 rounded-lg mt-1 border border-[#1a2236] italic">"{item.weak}"</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-amber-400 rotate-90 md:rotate-0" />
              </div>
              <div>
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider">✅ High-Impact Upgrade</span>
                <p className="text-xs text-teal-200 bg-teal-950/20 p-2.5 rounded-lg mt-1 border border-teal-800/30 font-semibold">"{item.improved}"</p>
              </div>
              <p className="text-[11px] text-slate-500"><b className="text-slate-400">Why: </b>{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
