import React, { useState } from 'react';
import { SkillMatchItem } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, ExternalLink, ChevronDown, ChevronUp, BookOpen, Layers } from 'lucide-react';

interface SkillGapTableProps {
  skillMatches: SkillMatchItem[];
}

export const SkillGapTable: React.FC<SkillGapTableProps> = ({ skillMatches }) => {
  const [filter, setFilter] = useState<'all' | 'Strong Match' | 'Partial Match' | 'Missing Skill'>('all');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const filteredMatches = skillMatches.filter(item => {
    if (filter === 'all') return true;
    return item.match_status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Strong Match':
        return (
          <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Strong Match
          </span>
        );
      case 'Partial Match':
        return (
          <span className="px-3 py-1 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex items-center gap-1.5 w-fit">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Partial Match
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-full flex items-center gap-1.5 w-fit">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Missing Skill
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 rounded">🔴 Critical</span>;
      case 'High':
        return <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded">🟠 High</span>;
      case 'Medium':
        return <span className="px-2.5 py-0.5 text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 rounded">🟡 Medium</span>;
      default:
        return <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded">🟢 Low</span>;
    }
  };

  const counts = {
    all: skillMatches.length,
    strong: skillMatches.filter(s => s.match_status === 'Strong Match').length,
    partial: skillMatches.filter(s => s.match_status === 'Partial Match').length,
    missing: skillMatches.filter(s => s.match_status === 'Missing Skill').length,
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" /> Skill Match & Gap Analysis Matrix
          </h3>
          <p className="text-sm text-slate-500 mt-1">Granular breakdown of job requirements versus resume coverage.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('Strong Match')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${filter === 'Strong Match' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🟢 Matched ({counts.strong})
          </button>
          <button
            onClick={() => setFilter('Partial Match')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${filter === 'Partial Match' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🟡 Partial ({counts.partial})
          </button>
          <button
            onClick={() => setFilter('Missing Skill')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${filter === 'Missing Skill' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🔴 Missing ({counts.missing})
          </button>
        </div>
      </div>

      {/* Skills Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Job Skill Requirement</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Match Status</th>
              <th className="py-3.5 px-4">Candidate Level</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMatches.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No skill requirements found for selected filter.
                </td>
              </tr>
            ) : (
              filteredMatches.map((item, idx) => {
                const isExpanded = expandedSkill === item.skill;
                return (
                  <React.Fragment key={idx}>
                    <tr
                      onClick={() => setExpandedSkill(isExpanded ? null : item.skill)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition ${isExpanded ? 'bg-slate-50' : ''}`}
                    >
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{item.skill}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 capitalize">
                            {item.category.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${item.requirement_type === 'MUST HAVE' ? 'bg-blue-100 text-blue-800 border border-blue-200 font-bold' : 'bg-slate-100 text-slate-600'}`}>
                          {item.requirement_type}
                        </span>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(item.match_status)}</td>
                      <td className="py-4 px-4 text-xs text-slate-600">
                        {item.matched_with ? (
                          <span className="text-emerald-700 font-bold">Demonstrated ({item.matched_with})</span>
                        ) : (
                          <span className="text-slate-400 italic">Not detected</span>
                        )}
                      </td>
                      <td className="py-4 px-4">{getPriorityBadge(item.priority)}</td>
                      <td className="py-4 px-4 text-right text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5 ml-auto text-blue-600" /> : <ChevronDown className="w-5 h-5 ml-auto" />}
                      </td>
                    </tr>

                    {/* Expandable Action Drawer */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b border-slate-200">
                        <td colSpan={6} className="p-5 space-y-4 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                              <h4 className="font-bold text-blue-700 flex items-center gap-1.5 text-sm">
                                <BookOpen className="w-4 h-4 text-blue-600" /> Why This Skill Matters
                              </h4>
                              <p className="text-slate-600 leading-relaxed">{item.why_it_matters}</p>
                              {item.suggested_project && (
                                <div className="pt-2 border-t border-slate-100">
                                  <span className="font-bold text-slate-800">Suggested Action Project: </span>
                                  <span className="text-emerald-700 font-semibold">{item.suggested_project}</span>
                                </div>
                              )}
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                              <h4 className="font-bold text-blue-700 text-sm">Recommended Learning Resources</h4>
                              <div className="space-y-2">
                                {item.recommended_resources.map((res, rIdx) => (
                                  <a
                                    key={rIdx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between text-blue-700 font-semibold transition"
                                  >
                                    <span>{res.title}</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
