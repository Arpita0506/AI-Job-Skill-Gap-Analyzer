import React from 'react';
import { Upload, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { ParsedResume } from '../types';

interface ResumeUploaderProps { onParsed: (resume: ParsedResume, rawText: string) => void; }

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onParsed }) => {
  const [activeTab, setActiveTab] = React.useState<'upload' | 'paste'>('upload');
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [parsedResume, setParsedResume] = React.useState<ParsedResume | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true); setError(null); setFileName(file.name);
    try {
      const parsed = await api.uploadResume(file);
      setParsedResume(parsed);
      onParsed(parsed, parsed.raw_text);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to parse resume file.');
    } finally { setLoading(false); }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    if (val.trim()) {
      const dummy: ParsedResume = {
        skills: { programming: [], databases: [], frameworks: [], ml_ai: [], cloud_devops: [], tools: [], soft_skills: [], domains: [], other: [] },
        all_extracted_skills: [], normalized_skills: [], education: [], experience: [], projects: [], certifications: [], achievements: [], raw_text: val
      };
      onParsed(dummy, val);
    }
  };

  return (
    <div className="bg-[#0d1117] border border-[#1a2236] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-white flex items-center gap-2"><FileText className="w-4 h-4 text-amber-400" />① Candidate Resume</h3>
        <div className="flex bg-[#07090f] p-0.5 rounded-lg border border-[#1a2236] text-xs">
          {(['upload','paste'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md font-bold transition capitalize ${activeTab === tab ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >{tab === 'upload' ? 'Upload File' : 'Paste Text'}</button>
          ))}
        </div>
      </div>

      {activeTab === 'upload' ? (
        fileName && parsedResume ? (
          <div className="p-4 bg-teal-950/30 border border-teal-800/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <div>
                <p className="text-sm font-black text-white">{fileName}</p>
                <p className="text-xs text-teal-400">{parsedResume.normalized_skills.length} skills · {parsedResume.experience.length} roles extracted</p>
              </div>
            </div>
            <button onClick={() => { setFileName(null); setParsedResume(null); }} className="p-1.5 text-slate-500 hover:text-rose-400 transition"><Trash2 className="w-4 h-4" /></button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-[#1a2236] hover:border-amber-500/50 rounded-xl p-8 flex flex-col items-center text-center cursor-pointer hover:bg-[#131c2e] transition gap-2">
            <Upload className="w-8 h-8 text-amber-400" />
            <span className="text-sm font-black text-white">Upload Resume</span>
            <span className="text-xs text-slate-500">PDF · DOCX · TXT — NLP entity extraction</span>
            <input type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFile} className="hidden" disabled={loading} />
          </label>
        )
      ) : (
        <textarea value={text} onChange={e => handleTextChange(e.target.value)}
          placeholder="Paste resume text here..." rows={7}
          className="w-full bg-[#07090f] border border-[#1a2236] rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-amber-500/60 resize-none font-mono"
        />
      )}

      {loading && <p className="text-xs text-amber-400 font-bold animate-pulse">Extracting skills & entities...</p>}
      {error   && <p className="text-xs text-rose-400 font-bold">{error}</p>}
    </div>
  );
};
