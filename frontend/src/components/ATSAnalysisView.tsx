import React from 'react';
import { ATSResult } from '../types';
import { FileCheck, CheckCircle2, XCircle, Key, Sparkles, ArrowRight } from 'lucide-react';

interface ATSAnalysisViewProps {
  atsAnalysis: ATSResult;
}

export const ATSAnalysisView: React.FC<ATSAnalysisViewProps> = ({ atsAnalysis }) => {
  const ringColor = atsAnalysis.ats_score >= 80 ? '#059669' : atsAnalysis.ats_score >= 60 ? '#d97706' : '#dc2626';

  return (
    <div className="space-y-6">
      
      {/* ATS Header & Score Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-600">
            <FileCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">ATS Compatibility & Readability Report</h3>
            <p className="text-sm text-slate-500 mt-1">Evaluates automated parsing, layout structure, action verbs, and keyword density.</p>
          </div>
        </div>

        {/* Score Ring */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
              <circle
                cx="18" cy="18" r="15.915" fill="none"
                stroke={ringColor} strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={`${atsAnalysis.ats_score} 100`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-slate-900">{atsAnalysis.ats_score}</span>
              <span className="text-[9px] text-slate-400 font-bold">/100</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">ATS Score</span>
            <span className="text-xl font-bold" style={{ color: ringColor }}>
              {atsAnalysis.ats_score >= 80 ? 'Excellent' : atsAnalysis.ats_score >= 60 ? 'Moderate' : 'Needs Work'}
            </span>
          </div>
        </div>
      </div>

      {/* Section Structure & Formatting Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section Checks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" /> Standard Resume Section Coverage
          </h4>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {Object.entries(atsAnalysis.section_checks).map(([sec, present]) => (
              <div
                key={sec}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                  present ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                <span>{sec} Section</span>
                {present ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
              </div>
            ))}
          </div>
        </div>

        {/* Missing Keywords Alert Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2 text-rose-600">
            <Key className="w-5 h-5" /> High-Impact Missing Keywords
          </h4>
          <p className="text-xs text-slate-500">Keywords present in job description but absent from resume text:</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {atsAnalysis.missing_keywords.length === 0 ? (
              <span className="text-xs text-emerald-700 font-bold">All major job keywords are represented in your resume!</span>
            ) : (
              atsAnalysis.missing_keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold">
                  + {kw}
                </span>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Bullet Point Upgrade Recommendations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" /> Action-Verb & Impact Bullet Enhancements
        </h4>
        <p className="text-xs text-slate-500">AI-suggested bullet point rewrites adding quantifiable impact metrics without fabricating experience:</p>

        <div className="space-y-4 pt-2">
          {atsAnalysis.improvement_suggestions.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">Weak Original Phrasing</span>
                <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 italic">"{item.weak}"</p>
              </div>

              <div className="flex justify-center my-1">
                <ArrowRight className="w-4 h-4 text-blue-600 transform rotate-90 md:rotate-0" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Suggested High-Impact Bullet Upgrade</span>
                <p className="text-xs text-emerald-900 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 font-semibold">"{item.improved}"</p>
              </div>

              <p className="text-[11px] text-slate-500 pt-1"><b>Rationale:</b> {item.reason}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
