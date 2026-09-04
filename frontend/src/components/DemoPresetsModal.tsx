import React from 'react';
import { X, Play, Code, BarChart2, Cpu, Zap } from 'lucide-react';

interface DemoPresetsModalProps {
  isOpen: boolean; onClose: () => void;
  onSelectPreset: (k: string) => void; loading: boolean;
}

const PRESETS = [
  { key: 'software_engineer', title: 'Full-Stack Software Engineer',   role: 'Full-Stack Developer',  target: 'Senior Cloud Engineer',    icon: Code,      badge: 'AWS & Docker Gaps',    badgeCls: 'bg-amber-950/80 text-amber-300 border-amber-800', desc: 'React/Node.js developer vs. Senior Cloud role requiring AWS, Docker, Kubernetes & CI/CD.' },
  { key: 'data_analyst',      title: 'Data Analyst',                   role: 'Data Analyst',           target: 'Senior BI Analyst',        icon: BarChart2, badge: 'Snowflake & Tableau Gaps', badgeCls: 'bg-teal-950/80 text-teal-300 border-teal-800', desc: 'SQL/Python/Power BI analyst vs. Senior BI role emphasizing Snowflake and Tableau.' },
  { key: 'ml_engineer',       title: 'Machine Learning Engineer',      role: 'ML Developer',           target: 'Senior MLOps Engineer',    icon: Cpu,       badge: 'PyTorch & MLOps Gaps', badgeCls: 'bg-rose-950/80 text-rose-300 border-rose-800', desc: 'Scikit-learn / TensorFlow practitioner vs. Production MLOps role with PyTorch, Kubernetes, CUDA.' },
];

export const DemoPresetsModal: React.FC<DemoPresetsModalProps> = ({ isOpen, onClose, onSelectPreset, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07090f]/80 backdrop-blur-sm">
      <div className="bg-[#0d1117] border border-[#1a2236] rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1a2236] pb-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2"><Play className="w-5 h-5 text-amber-400 fill-amber-400" />Select Demo Scenario</h3>
            <p className="text-xs text-slate-500 mt-1">Test the complete AI pipeline instantly with pre-loaded resume + job data.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white rounded-xl hover:bg-[#131c2e] transition"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3">
          {PRESETS.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.key} onClick={() => !loading && onSelectPreset(p.key)}
                className="bg-[#07090f] hover:bg-[#131c2e] border border-[#1a2236] hover:border-amber-500/30 rounded-2xl p-5 cursor-pointer transition flex items-start gap-4 group"
              >
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 group-hover:scale-105 transition shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-black text-white group-hover:text-amber-400 transition">{p.title}</h4>
                    <span className={`px-2.5 py-0.5 border text-[10px] font-black rounded whitespace-nowrap ${p.badgeCls}`}>{p.badge}</span>
                  </div>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                  <p className="text-[11px] text-slate-600 pt-0.5">
                    <span className="text-slate-400">{p.role}</span> → <span className="text-amber-400 font-bold">{p.target}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="text-center py-2 text-sm text-amber-400 font-black animate-pulse flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> Running AI Analysis Engine...
          </div>
        )}
      </div>
    </div>
  );
};
