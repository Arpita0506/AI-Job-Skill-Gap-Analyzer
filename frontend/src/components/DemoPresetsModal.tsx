import React from 'react';
import { X, Play, Code, BarChart2, Cpu, Zap } from 'lucide-react';

interface DemoPresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetKey: string) => void;
  loading: boolean;
}

export const DemoPresetsModal: React.FC<DemoPresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  loading,
}) => {
  if (!isOpen) return null;

  const presets = [
    {
      key: 'software_engineer',
      title: 'Full-Stack Software Engineer Scenario',
      role: 'Full-Stack Developer',
      target: 'Senior Cloud & Full-Stack Engineer',
      icon: Code,
      badge: 'AWS & Docker Gaps',
      badgeCls: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Mid-level developer proficient in React, Node, and Python matching against a Senior Cloud role requiring AWS, Docker, Microservices, and CI/CD.'
    },
    {
      key: 'data_analyst',
      title: 'Data Analyst Scenario',
      role: 'Data Analyst',
      target: 'Senior Data Analyst (BI)',
      icon: BarChart2,
      badge: 'Snowflake & Tableau Gaps',
      badgeCls: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Analyst experienced in SQL, Excel, Python, and Power BI evaluating alignment for a Senior BI position emphasizing Snowflake and Tableau.'
    },
    {
      key: 'ml_engineer',
      title: 'Machine Learning Engineer Scenario',
      role: 'ML Developer',
      target: 'Senior ML Engineer (MLOps)',
      icon: Cpu,
      badge: 'PyTorch & MLOps Gaps',
      badgeCls: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'ML practitioner with Scikit-learn and TensorFlow background matching against a production MLOps role requiring PyTorch, Kubernetes, and CUDA.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-600 fill-blue-600" /> Select Demo Preset Scenario
            </h3>
            <p className="text-xs text-slate-500 mt-1">Test the full AI skill matching and gap pipeline with 1-click preset scenarios.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards List */}
        <div className="space-y-4">
          {presets.map((preset) => {
            const Icon = preset.icon;
            return (
              <div
                key={preset.key}
                onClick={() => !loading && onSelectPreset(preset.key)}
                className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-2xl p-5 cursor-pointer transition flex items-start gap-4 group"
              >
                <div className="p-3 bg-blue-100 text-blue-700 rounded-xl group-hover:scale-105 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition">{preset.title}</h4>
                    <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded ${preset.badgeCls}`}>
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{preset.description}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span>Candidate: <b>{preset.role}</b></span>
                    <span>•</span>
                    <span>Job Target: <b className="text-blue-700">{preset.target}</b></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="text-center py-2 text-sm text-blue-700 font-bold animate-pulse flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> Analyzing preset scenario with AI Engine...
          </div>
        )}

      </div>
    </div>
  );
};
