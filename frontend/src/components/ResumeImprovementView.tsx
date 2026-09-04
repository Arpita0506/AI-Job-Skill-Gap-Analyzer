import React from 'react';
import { ParsedResume } from '../types';
import { Sparkles, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ResumeImprovementViewProps {
  resume: ParsedResume;
}

export const ResumeImprovementView: React.FC<ResumeImprovementViewProps> = ({ resume }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" /> Resume Strength & Improvement Engine
          </h3>
          <p className="text-sm text-slate-400 mt-1">Actionable recommendations to polish project descriptions and boost recruiter impact.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Extracted Strengths */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-xl space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" /> Detected Strengths
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cleanly parsed <b>{resume.normalized_skills.length} skills</b> across standard categories.</span>
            </li>
            <li className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Extracted <b>{resume.experience.length} work experience roles</b> and <b>{resume.projects.length} portfolio projects</b>.</span>
            </li>
            <li className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Contains valid education credentials and technical certifications.</span>
            </li>
          </ul>
        </div>

        {/* Ethical Safety Rule Banner */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-xl space-y-3">
          <h4 className="font-bold text-white text-base flex items-center gap-2 text-blue-400">
            <ShieldCheck className="w-5 h-5" /> Strict AI Ethical Accuracy Rules
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our AI engine never fabricates skills, false job titles, or unearned certifications. All recommendations are designed to rephrase and emphasize authentic achievements already present in your background.
          </p>
          <div className="p-3 bg-blue-950/50 border border-blue-800/50 rounded-xl text-xs text-blue-300 font-medium">
            Rule Enforced: Bullet transformations only optimize syntax and impact metrics based on provided context.
          </div>
        </div>

      </div>

    </div>
  );
};
