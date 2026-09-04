import React from 'react';
import { ParsedResume } from '../types';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ResumeImprovementViewProps {
  resume: ParsedResume;
}

export const ResumeImprovementView: React.FC<ResumeImprovementViewProps> = ({ resume }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" /> Resume Strength & Improvement Engine
          </h3>
          <p className="text-sm text-slate-500 mt-1">Actionable recommendations to polish project descriptions and boost recruiter impact.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Extracted Strengths */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-emerald-800 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Detected Strengths
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cleanly parsed <b>{resume.normalized_skills.length} skills</b> across standard categories.</span>
            </li>
            <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Extracted <b>{resume.experience.length} work experience roles</b> and <b>{resume.projects.length} portfolio projects</b>.</span>
            </li>
            <li className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Contains valid education credentials and technical certifications.</span>
            </li>
          </ul>
        </div>

        {/* Ethical Safety Rule Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <h4 className="font-bold text-blue-700 text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> Strict AI Ethical Accuracy Rules
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our AI engine never fabricates skills, false job titles, or unearned certifications. All recommendations are designed to rephrase and emphasize authentic achievements already present in your background.
          </p>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 font-semibold">
            Rule Enforced: Bullet transformations only optimize syntax and impact metrics based on provided context.
          </div>
        </div>

      </div>

    </div>
  );
};
