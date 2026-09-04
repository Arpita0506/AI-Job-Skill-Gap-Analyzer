import React from 'react';
import { BrainCircuit, PlayCircle, Download, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenPresets: () => void;
  onDownloadReport: () => void;
  hasAnalysis: boolean;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPresets, onDownloadReport, hasAnalysis, onReset }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#07090f]/95 backdrop-blur-xl border-b border-[#1a2236] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
          <div className="p-2.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 rounded-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-xl tracking-tight text-white">
                SkillGap<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-teal-400">AI</span>
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <Zap className="w-3 h-3" /> Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-500">AI Career Match & Gap Intelligence Engine</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPresets}
            className="px-4 py-2 text-sm font-semibold text-slate-300 bg-[#0d1117] hover:bg-[#131c2e] border border-[#1a2236] hover:border-amber-500/30 rounded-xl flex items-center gap-2 transition-all"
          >
            <PlayCircle className="w-4 h-4 text-teal-400" />
            Demo Scenarios
          </button>

          {hasAnalysis && (
            <button
              onClick={onDownloadReport}
              className="px-4 py-2 text-sm font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all glow-amber"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
