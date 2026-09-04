import React, { useState } from 'react';
import { RoadmapResponse } from '../types';
import { Calendar, Clock, Code, Target, Rocket } from 'lucide-react';

interface LearningRoadmapViewProps { roadmap: RoadmapResponse; }

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({ roadmap }) => {
  const [activeWeek, setActiveWeek] = useState(1);
  const week = roadmap.weeks.find(w => w.week === activeWeek) || roadmap.weeks[0];

  const weekColors = ['from-amber-500 to-orange-500', 'from-teal-500 to-cyan-500', 'from-rose-500 to-pink-500', 'from-purple-500 to-violet-500'];

  return (
    <div className="space-y-5">
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Personalized Learning Plan</span>
          <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2"><Calendar className="w-5 h-5 text-teal-400" />30-Day Skill Gap Roadmap</h3>
          <p className="text-xs text-slate-500 mt-1">Custom 4-week plan targeting your highest-priority missing skills.</p>
        </div>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/25 rounded-xl text-amber-400 text-xs font-bold flex items-center gap-2">
          <Clock className="w-4 h-4" /> ~10–12 hrs / week
        </div>
      </div>

      {/* Week Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roadmap.weeks.map((w, i) => {
          const active = w.week === activeWeek;
          const grad = weekColors[i % weekColors.length];
          return (
            <button key={w.week} onClick={() => setActiveWeek(w.week)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${active ? `bg-gradient-to-br ${grad} border-transparent text-black shadow-lg` : 'bg-[#0d1117] border-[#1a2236] hover:bg-[#131c2e] text-slate-300'}`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider ${active ? 'text-black/70' : 'text-slate-500'}`}>Week {w.week}</span>
              <p className={`text-xs font-black mt-1.5 line-clamp-2 ${active ? 'text-black' : 'text-white'}`}>{w.title.replace(`Week ${w.week}: `, '')}</p>
              <span className={`text-[10px] font-bold mt-2 block ${active ? 'text-black/60' : 'text-slate-600'}`}>{w.estimated_hours} hrs</span>
            </button>
          );
        })}
      </div>

      {/* Week Detail */}
      {week && (
        <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1a2236]">
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Week {week.week} Focus</span>
              <h4 className="text-lg font-black text-white mt-0.5">{week.title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {week.skills_focus.map((sf, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#07090f] border border-[#1a2236] text-slate-400 text-xs font-bold rounded-lg">{sf}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">What to Learn</span>
                <p className="text-sm text-slate-300 bg-[#07090f] p-3.5 rounded-xl border border-[#1a2236] leading-relaxed">{week.what_to_learn}</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Why to Learn</span>
                <p className="text-sm text-slate-400 bg-[#07090f] p-3.5 rounded-xl border border-[#1a2236] leading-relaxed">{week.why_to_learn}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5"><Code className="w-3.5 h-3.5" />Mini-Project Goal</span>
                <p className="text-sm text-teal-200 bg-teal-950/20 p-3.5 rounded-xl border border-teal-800/30 leading-relaxed font-semibold">{week.mini_project}</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5"><Target className="w-3.5 h-3.5" />Expected Outcome</span>
                <p className="text-sm text-slate-300 bg-[#07090f] p-3.5 rounded-xl border border-[#1a2236] leading-relaxed">{week.expected_outcome}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Capstone */}
      <div className="bg-gradient-to-r from-amber-950/40 via-[#0d1117] to-teal-950/30 border border-amber-500/25 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5"><Rocket className="w-4 h-4" />30-Day Capstone Project</span>
          <span className="text-xs px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/25 rounded-full font-black">{roadmap.capstone_project.estimated_days} Days</span>
        </div>
        <h4 className="text-lg font-black text-white">{roadmap.capstone_project.title}</h4>
        <p className="text-sm text-slate-400">{roadmap.capstone_project.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {roadmap.capstone_project.skills_targeted.map((st, i) => (
            <span key={i} className="px-2.5 py-0.5 bg-teal-950/60 text-teal-300 border border-teal-800/50 rounded text-xs font-black">✓ {st}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
