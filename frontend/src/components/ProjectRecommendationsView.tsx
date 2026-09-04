import React from 'react';
import { RecommendedProject } from '../types';
import { FolderGit2, CheckCircle2 } from 'lucide-react';

interface ProjectRecommendationsViewProps {
  projects: RecommendedProject[];
}

const CARD_ACCENTS = [
  { border: 'border-blue-200', bg: 'bg-white', badge: 'bg-blue-50 text-blue-700 border-blue-200', title: 'text-slate-900', skill: 'bg-blue-50 text-blue-700 border-blue-200', check: 'text-blue-600' },
  { border: 'border-teal-200', bg: 'bg-white', badge: 'bg-teal-50 text-teal-700 border-teal-200', title: 'text-slate-900', skill: 'bg-teal-50 text-teal-700 border-teal-200', check: 'text-teal-600' },
  { border: 'border-indigo-200', bg: 'bg-white', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', title: 'text-slate-900', skill: 'bg-indigo-50 text-indigo-700 border-indigo-200', check: 'text-indigo-600' },
  { border: 'border-purple-200', bg: 'bg-white', badge: 'bg-purple-50 text-purple-700 border-purple-200', title: 'text-slate-900', skill: 'bg-purple-50 text-purple-700 border-purple-200', check: 'text-purple-600' },
];

export const ProjectRecommendationsView: React.FC<ProjectRecommendationsViewProps> = ({ projects }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-600" /> Targeted Portfolio Project Recommendations
          </h3>
          <p className="text-sm text-slate-500 mt-1">Multi-skill projects designed specifically to demonstrate practical experience in your missing skills.</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => {
          const acc = CARD_ACCENTS[idx % CARD_ACCENTS.length];
          return (
            <div key={idx} className={`bg-white border ${acc.border} rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition`}>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-bold text-slate-900 leading-snug">{proj.title}</h4>
                  <span className={`px-3 py-1 border text-xs font-bold rounded-full whitespace-nowrap ${acc.badge}`}>
                    {proj.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

                {/* Skills Targeted Badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Gaps Targeted</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skills_targeted.map((st, sIdx) => (
                      <span key={sIdx} className={`px-2.5 py-0.5 border rounded text-xs font-bold ${acc.skill}`}>
                        ✓ {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Core Architecture Deliverables</span>
                  <ul className="space-y-1">
                    {proj.key_features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-700 flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${acc.check} shrink-0`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Relevance Explanation Footer */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span className="font-bold text-blue-700">Recruiter Impact: </span>
                <span>{proj.relevance_explanation}</span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
