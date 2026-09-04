import React from 'react';
import { BrainCircuit, PlayCircle, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPresets: () => void;
  onDownloadReport: () => void;
  hasAnalysis: boolean;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPresets,
  onDownloadReport,
  hasAnalysis,
  onReset
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand logo & title */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
                SkillGap<span className="text-blue-600">AI</span>
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" /> Career Pro
              </span>
            </div>
            <p className="text-xs text-slate-500">AI Job Match & Gap Intelligence Platform</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPresets}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center gap-2 transition"
          >
            <PlayCircle className="w-4 h-4 text-blue-600" />
            <span>Load Demo Scenarios</span>
          </button>

          {hasAnalysis && (
            <button
              onClick={onDownloadReport}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF Report</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
