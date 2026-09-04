import React, { useState } from 'react';
import { InterviewQuestion } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface InterviewPrepViewProps { questions: InterviewQuestion[]; }

const CAT_COLORS: Record<string, string> = {
  'Technical Questions':    'bg-amber-950/80 text-amber-300 border-amber-800',
  'Resume Questions':       'bg-teal-950/80 text-teal-300 border-teal-800',
  'Project Questions':      'bg-purple-950/80 text-purple-300 border-purple-800',
  'Behavioral Questions':   'bg-rose-950/80 text-rose-300 border-rose-800',
  'Missing Skill Questions':'bg-orange-950/80 text-orange-300 border-orange-800',
};

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ questions }) => {
  const [openId, setOpenId] = useState<string | null>(questions[0]?.id ?? null);

  return (
    <div className="space-y-5">
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2"><HelpCircle className="w-5 h-5 text-amber-400" />Personalized Interview Prep Suite</h3>
        <p className="text-xs text-slate-500 mt-1">Generated from your resume, target job, and identified skill gaps.</p>
      </div>

      <div className="space-y-3">
        {questions.map(q => {
          const isOpen = openId === q.id;
          const catCls = CAT_COLORS[q.category] ?? 'bg-slate-800 text-slate-300 border-slate-700';
          return (
            <div key={q.id} className="bg-[#0d1117] border border-[#1a2236] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : q.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[#131c2e] transition"
              >
                <div className="space-y-1.5">
                  <span className={`px-2.5 py-0.5 border text-[11px] font-black rounded ${catCls}`}>{q.category}</span>
                  <h4 className="text-sm font-black text-white pt-1">{q.question}</h4>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400 shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 mt-1" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-[#1a2236] space-y-3">
                  <div className="bg-[#07090f] p-3.5 rounded-xl border border-[#1a2236]">
                    <span className="text-[10px] font-black text-teal-400 block mb-1">WHY INTERVIEWERS ASK THIS</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{q.context_or_reason}</p>
                  </div>
                  <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-800/30">
                    <span className="text-[10px] font-black text-amber-400 flex items-center gap-1.5 mb-1.5"><Sparkles className="w-3.5 h-3.5" />IDEAL RESPONSE STRATEGY</span>
                    <p className="text-xs text-amber-100 leading-relaxed italic">"{q.sample_ideal_answer}"</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
