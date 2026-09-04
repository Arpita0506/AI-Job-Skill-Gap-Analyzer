import React from 'react';
import { Briefcase, Upload, CheckCircle2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { ParsedJobDescription } from '../types';

interface JobDescriptionInputProps {
  onParsed: (jd: ParsedJobDescription, rawText: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onParsed }) => {
  const [activeTab, setActiveTab] = React.useState<'paste' | 'upload'>('paste');
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const parsed = await api.analyzeJobDescription(undefined, file);
      onParsed(parsed, parsed.raw_text);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to parse job description file.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    if (val.trim()) {
      const dummy: ParsedJobDescription = {
        job_title: 'Target Position',
        required_skills: [],
        preferred_skills: [],
        technical_skills: [],
        soft_skills: [],
        education_requirements: [],
        experience_requirements: '2-5 years',
        certifications: [],
        responsibilities: [],
        tools_and_technologies: [],
        domain_knowledge: [],
        raw_text: val
      };
      onParsed(dummy, val);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" /> 2. Target Job Description
        </h3>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'paste' ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Paste Text
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'upload' ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Upload File
          </button>
        </div>
      </div>

      {activeTab === 'paste' ? (
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Paste target job posting text (responsibilities, required skills, tools)..."
            rows={8}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white resize-none font-mono"
          />
        </div>
      ) : (
        <div>
          {fileName ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-bold text-slate-900">{fileName}</p>
              </div>
              <button
                onClick={() => setFileName(null)}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition text-center space-y-2">
              <Upload className="w-8 h-8 text-indigo-600" />
              <span className="text-sm font-bold text-slate-800">Upload Job Description (PDF, DOCX, TXT)</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFile}
                className="hidden"
                disabled={loading}
              />
            </label>
          )}
        </div>
      )}

      {loading && <p className="text-xs text-indigo-600 font-bold animate-pulse">Extracting job requirements & skills...</p>}
      {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}
    </div>
  );
};
