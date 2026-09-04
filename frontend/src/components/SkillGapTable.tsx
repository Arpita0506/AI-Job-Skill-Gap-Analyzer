import React, { useState } from 'react';
import { SkillMatchItem } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, ExternalLink, ChevronDown, ChevronUp, BookOpen, Layers } from 'lucide-react';

interface SkillGapTableProps { skillMatches: SkillMatchItem[]; }

export const SkillGapTable: React.FC<SkillGapTableProps> = ({ skillMatches }) => {
  const [filter, setFilter] = useState<'all' | 'Strong Match' | 'Partial Match' | 'Missing Skill'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'all' ? skillMatches : skillMatches.filter(i => i.match_status === filter);
  const counts = {
    strong:  skillMatches.filter(s => s.match_status === 'Strong Match').length,
    partial: skillMatches.filter(s => s.match_status === 'Partial Match').length,
    missing: skillMatches.filter(s => s.match_status === 'Missing Skill').length,
  };

  const statusBadge = (status: string) => {
    if (status === 'Strong Match')  return <span className="px-3 py-1 text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/25 rounded-full flex items-center gap-1.5 w-fit"><CheckCircle2 className="w-3.5 h-3.5" />Strong Match</span>;
    if (status === 'Partial Match') return <span className="px-3 py-1 text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-full flex items-center gap-1.5 w-fit"><AlertTriangle className="w-3.5 h-3.5" />Partial Match</span>;
    return <span className="px-3 py-1 text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/25 rounded-full flex items-center gap-1.5 w-fit"><XCircle className="w-3.5 h-3.5" />Missing</span>;
  };

  const priorityBadge = (p: string) => ({
    Critical: <span className="px-2.5 py-0.5 text-xs font-black bg-rose-950/80 text-rose-300 border border-rose-800 rounded">🔴 Critical</span>,
    High:     <span className="px-2.5 py-0.5 text-xs font-black bg-orange-950/80 text-orange-300 border border-orange-800 rounded">🟠 High</span>,
    Medium:   <span className="px-2.5 py-0.5 text-xs font-black bg-amber-950/80 text-amber-300 border border-amber-800 rounded">🟡 Medium</span>,
  }[p] ?? <span className="px-2.5 py-0.5 text-xs font-black bg-teal-950/80 text-teal-300 border border-teal-800 rounded">🟢 Low</span>);

  return (
    <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1a2236]">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2"><Layers className="w-5 h-5 text-teal-400" />Skill Gap Analysis Matrix</h3>
          <p className="text-xs text-slate-500 mt-1">Semantic job requirement vs. resume coverage breakdown.</p>
        </div>
        <div className="flex items-center bg-[#07090f] p-1 rounded-xl border border-[#1a2236] text-xs gap-0.5">
          {[
            { key: 'all',           label: `All (${skillMatches.length})`,  cls: 'bg-amber-500 text-black'   },
            { key: 'Strong Match',  label: `✅ ${counts.strong}`,            cls: 'bg-teal-500 text-black'    },
            { key: 'Partial Match', label: `⚠️ ${counts.partial}`,           cls: 'bg-amber-500 text-black'   },
            { key: 'Missing Skill', label: `❌ ${counts.missing}`,           cls: 'bg-rose-600 text-white'    },
          ].map(btn => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${filter === btn.key ? btn.cls + ' shadow' : 'text-slate-500 hover:text-white'}`}
            >{btn.label}</button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#07090f] text-[11px] uppercase font-black text-slate-500 border-b border-[#1a2236]">
            <tr>
              <th className="py-3 px-4">Skill</th>
              <th className="py-3 px-4">Requirement</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Candidate Has</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a2236]">
            {filtered.map((item, idx) => {
              const isExp = expanded === item.skill;
              return (
                <React.Fragment key={idx}>
                  <tr onClick={() => setExpanded(isExp ? null : item.skill)} className="hover:bg-[#131c2e] cursor-pointer transition">
                    <td className="py-4 px-4 font-black text-white">
                      <div className="flex items-center gap-2">
                        {item.skill}
                        <span className="text-[10px] px-2 py-0.5 bg-[#07090f] text-slate-500 rounded border border-[#1a2236] capitalize">{item.category.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${item.requirement_type === 'MUST HAVE' ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'bg-[#07090f] text-slate-500'}`}>
                        {item.requirement_type}
                      </span>
                    </td>
                    <td className="py-4 px-4">{statusBadge(item.match_status)}</td>
                    <td className="py-4 px-4 text-xs">
                      {item.matched_with ? <span className="text-teal-400 font-bold">{item.matched_with}</span> : <span className="text-slate-600 italic">Not found</span>}
                    </td>
                    <td className="py-4 px-4">{priorityBadge(item.priority)}</td>
                    <td className="py-4 px-4 text-right text-slate-500">
                      {isExp ? <ChevronUp className="w-5 h-5 ml-auto text-amber-400" /> : <ChevronDown className="w-5 h-5 ml-auto" />}
                    </td>
                  </tr>
                  {isExp && (
                    <tr className="bg-[#07090f] border-b border-[#1a2236]">
                      <td colSpan={6} className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="bg-[#0d1117] p-4 rounded-xl border border-[#1a2236] space-y-2">
                            <h4 className="font-black text-amber-400 flex items-center gap-1.5"><BookOpen className="w-4 h-4" />Why This Matters</h4>
                            <p className="text-slate-400 leading-relaxed">{item.why_it_matters}</p>
                            {item.suggested_project && (
                              <p className="pt-2 border-t border-[#1a2236]">
                                <span className="font-bold text-slate-300">Project: </span>
                                <span className="text-teal-400 font-semibold">{item.suggested_project}</span>
                              </p>
                            )}
                          </div>
                          <div className="bg-[#0d1117] p-4 rounded-xl border border-[#1a2236] space-y-2">
                            <h4 className="font-black text-teal-400">Learning Resources</h4>
                            {item.recommended_resources.map((r, ri) => (
                              <a key={ri} href={r.url} target="_blank" rel="noreferrer"
                                className="p-2.5 bg-[#07090f] hover:bg-[#131c2e] border border-[#1a2236] rounded-lg flex items-center justify-between text-amber-400 font-semibold transition">
                                <span>{r.title}</span><ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
