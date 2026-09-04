import React, { useState } from 'react';
import { RoadmapResponse } from '../types';
import { Calendar, Clock, Code, Target, Rocket } from 'lucide-react';

interface LearningRoadmapViewProps {
  roadmap: RoadmapResponse;
}

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({ roadmap }) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const selectedWeek = roadmap.weeks.find(w => w.week === activeWeek) || roadmap.weeks[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Personalized Action Schedule</span>
          <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" /> Personalized 30-Day Skill Gap Roadmap
          </h3>
          <p className="text-sm text-slate-500 mt-1">Structured 4-week learning path custom-tailored to close your specific missing skills.</p>
        </div>
        <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-xs font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Estimated 10-12 Hours / Week</span>
        </div>
      </div>

      {/* Week Navigation Timeline Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roadmap.weeks.map((w) => {
          const isActive = w.week === activeWeek;
          return (
            <button
              key={w.week}
              onClick={() => setActiveWeek(w.week)}
              className={`p-4 rounded-xl border text-left transition relative overflow-hidden ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  Week {w.week}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {w.estimated_hours} hrs
                </span>
              </div>
              <p className={`text-xs font-bold mt-2 line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {w.title.replace(`Week ${w.week}: `, '')}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Week Detailed Content Card */}
      {selectedWeek && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Week {selectedWeek.week} Focus</span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">{selectedWeek.title}</h4>
            </div>
            <div className="flex items-center gap-2">
              {selectedWeek.skills_focus.map((sf, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
                  {sf}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Learning Plan */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">What to Learn</span>
                <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedWeek.what_to_learn}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Why to Learn</span>
                <p className="text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedWeek.why_to_learn}
                </p>
              </div>
            </div>

            {/* Practical Output & Prerequisites */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-600" /> Weekly Mini-Project Goal
                </span>
                <p className="text-sm text-emerald-950 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 leading-relaxed font-semibold">
                  {selectedWeek.mini_project}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" /> Expected Skill Outcome
                </span>
                <p className="text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedWeek.expected_outcome}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Capstone Project Showcase Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-blue-600" /> 30-Day Capstone Project Milestone
          </span>
          <span className="text-xs px-3 py-1 bg-blue-600 text-white font-bold rounded-full shadow-sm">
            {roadmap.capstone_project.estimated_days} Days Completion
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-900">{roadmap.capstone_project.title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{roadmap.capstone_project.description}</p>
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Targeted Gap Skills:</span>
          {roadmap.capstone_project.skills_targeted.map((st, i) => (
            <span key={i} className="px-2.5 py-0.5 bg-white text-blue-700 border border-blue-200 rounded text-xs font-bold shadow-2xs">
              ✓ {st}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
