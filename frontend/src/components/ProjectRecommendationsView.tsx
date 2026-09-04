import React from 'react';
import { RecommendedProject } from '../types';
import { FolderGit2, CheckCircle2 } from 'lucide-react';

interface ProjectRecommendationsViewProps { projects: RecommendedProject[]; }

// Each project card gets a unique accent color pair
const CARD_ACCENTS = [
  { border: 'border-amber-500/30', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/25', title: 'text-amber-400', skill: 'bg-amber-950/60 text-amber-300 border-amber-800/50', check: 'text-amber-400' },
  { border: 'border-teal-500/30',  badge: 'bg-teal-500/10 text-teal-300 border-teal-500/25',   title: 'text-teal-400',  skill: 'bg-teal-950/60 text-teal-300 border-teal-800/50',   check: 'text-teal-400'  },
  { border: 'border-rose-500/30',  badge: 'bg-rose-500/10 text-rose-300 border-rose-500/25',   title: 'text-rose-400',  skill: 'bg-rose-950/60 text-rose-300 border-rose-800/50',   check: 'text-rose-400'  },
  { border: 'border-purple-500/30',badge: 'bg-purple-500/10 text-purple-300 border-purple-500/25', title: 'text-purple-400', skill: 'bg-purple-950/60 text-purple-300 border-purple-800/50', check: 'text-purple-400' },
];

export const ProjectRecommendationsView: React.FC<ProjectRecommendationsViewProps> = ({ projects }) => {
  return (
    <div className="space-y-5">
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2"><FolderGit2 className="w-5 h-5 text-teal-400" />Targeted Portfolio Projects</h3>
        <p className="text-xs text-slate-500 mt-1">Multi-skill projects designed to close your specific resume gaps and impress recruiters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj, idx) => {
          const acc = CARD_ACCENTS[idx % CARD_ACCENTS.length];
          return (
            <div key={idx} className={`bg-[#0d1117] border ${acc.border} rounded-2xl p-6 space-y-4 flex flex-col hover:bg-[#131c2e] transition-all`}>
              <div className="flex items-start justify-between gap-3">
                <h4 className={`text-base font-black ${acc.title} leading-snug`}>{proj.title}</h4>
                <span className={`px-2.5 py-1 border text-[11px] font-black rounded-full whitespace-nowrap ${acc.badge}`}>{proj.difficulty}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>

              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">Skills Targeted</span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.skills_targeted.map((st, i) => (
                    <span key={i} className={`px-2.5 py-0.5 border rounded text-xs font-black ${acc.skill}`}>✓ {st}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">Key Deliverables</span>
                <ul className="space-y-1.5">
                  {proj.key_features.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${acc.check}`} />{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#1a2236] text-xs text-slate-500">
                <span className={`font-black ${acc.title}`}>Recruiter Impact: </span>{proj.relevance_explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
