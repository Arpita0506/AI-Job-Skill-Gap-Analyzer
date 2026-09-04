import React from 'react';
import { Briefcase, Upload, CheckCircle2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { ParsedJobDescription } from '../types';

interface JobDescriptionInputProps { onParsed: (jd: ParsedJobDescription, rawText: string) => void; }

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onParsed }) => {
  const [activeTab, setActiveTab] = React.useState<'paste' | 'upload'>('paste');
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true); setError(null); setFileName(file.name);
    try {
      const parsed = await api.analyzeJobDescription(undefined, file);
      onParsed(parsed, parsed.raw_text);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to parse job description file.');
    } finally { setLoading(false); }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    if (val.trim()) {
      const dummy: ParsedJobDescription = {
        job_title: 'Target Position', required_skills: [], preferred_skills: [], technical_skills: [],
        soft_skills: [], education_requirements: [], experience_requirements: '2-5 years',
        certifications: [], responsibilities: [], tools_and_technologies: [], domain_knowledge: [], raw_text: val
      };
      onParsed(dummy, val);
    }
  };

  return (
    <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-white flex items-center gap-2"><Briefcase className="w-4 h-4 text-teal-400" />② Target Job Description</h3>
        <div className="flex bg-[#07090f] p-0.5 rounded-lg border border-[#1a2236] text-xs">
          {(['paste','upload'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md font-bold transition capitalize ${activeTab === tab ? 'bg-teal-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >{tab === 'paste' ? 'Paste Text' : 'Upload File'}</button>
          ))}
        </div>
      </div>

      {activeTab === 'paste' ? (
        <textarea value={text} onChange={e => handleTextChange(e.target.value)}
          placeholder="Paste job description here (responsibilities, requirements, tech stack)..." rows={7}
          className="w-full bg-[#07090f] border border-[#1a2236] rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-teal-500/60 resize-none font-mono"
        />
      ) : fileName ? (
        <div className="p-4 bg-teal-950/30 border border-teal-800/50 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <p className="text-sm font-black text-white">{fileName}</p>
          </div>
          <button onClick={() => setFileName(null)} className="p-1.5 text-slate-500 hover:text-rose-400 transition"><Trash2 className="w-4 h-4" /></button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-[#1a2236] hover:border-teal-500/50 rounded-xl p-8 flex flex-col items-center text-center cursor-pointer hover:bg-[#131c2e] transition gap-2">
          <Upload className="w-8 h-8 text-teal-400" />
          <span className="text-sm font-black text-white">Upload Job Description</span>
          <span className="text-xs text-slate-500">PDF · DOCX · TXT</span>
          <input type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFile} className="hidden" disabled={loading} />
        </label>
      )}

      {loading && <p className="text-xs text-teal-400 font-bold animate-pulse">Extracting job requirements...</p>}
      {error   && <p className="text-xs text-rose-400 font-bold">{error}</p>}
    </div>
  );
};
