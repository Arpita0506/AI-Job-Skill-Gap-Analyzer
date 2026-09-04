import React, { useState } from 'react';
import { InterviewQuestion } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface InterviewPrepViewProps {
  questions: InterviewQuestion[];
}

const CAT_COLORS: Record<string, string> = {
  'Technical Questions': 'bg-blue-50 text-blue-700 border-blue-200',
  'Resume Questions': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Project Questions': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Behavioral Questions': 'bg-purple-50 text-purple-700 border-purple-200',
  'Missing Skill Questions': 'bg-amber-50 text-amber-700 border-amber-200',
};

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ questions }) => {
  const [openId, setOpenId] = useState<string | null>(questions[0]?.id || null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" /> Personalized Interview Preparation Suite
          </h3>
          <p className="text-sm text-slate-500 mt-1">Generated based on your resume, target job requirements, and identified skill gaps.</p>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4">
        {questions.map((q) => {
          const isOpen = openId === q.id;
          const catCls = CAT_COLORS[q.category] || 'bg-slate-100 text-slate-700 border-slate-200';
          return (
            <div
              key={q.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition"
            >
              {/* Question Header */}
              <button
                onClick={() => setOpenId(isOpen ? null : q.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition"
              >
                <div className="space-y-1">
                  <span className={`px-2.5 py-0.5 border text-[11px] font-bold rounded ${catCls}`}>
                    {q.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 pt-1">{q.question}</h4>
                </div>
                <div className="p-2 text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs">
                  
                  {/* Question Rationale Context */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-blue-700 block mb-1">Why Interviewers Ask This:</span>
                    <p className="text-slate-600 leading-relaxed">{q.context_or_reason}</p>
                  </div>

                  {/* Sample Ideal Model Answer */}
                  <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 space-y-2">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-emerald-600" /> Ideal Model Response Strategy
                    </span>
                    <p className="text-emerald-950 text-xs leading-relaxed italic">
                      "{q.sample_ideal_answer}"
                    </p>
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
