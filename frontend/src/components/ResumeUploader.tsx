import React from 'react';
import { Upload, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { ParsedResume } from '../types';

interface ResumeUploaderProps {
  onParsed: (resume: ParsedResume, rawText: string) => void;
}

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

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const parsed = await api.uploadResume(file);
      setParsedResume(parsed);
      onParsed(parsed, parsed.raw_text);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to parse resume file.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (val: string) => {
    setText(val);
    if (val.trim()) {
      const dummy: ParsedResume = {
        skills: { programming: [], databases: [], frameworks: [], ml_ai: [], cloud_devops: [], tools: [], soft_skills: [], domains: [], other: [] },
        all_extracted_skills: [],
        normalized_skills: [],
        education: [],
        experience: [],
        projects: [],
        certifications: [],
        achievements: [],
        raw_text: val
      };
      onParsed(dummy, val);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" /> 1. Candidate Resume
        </h3>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'upload' ? 'bg-white text-blue-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'paste' ? 'bg-white text-blue-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div>
          {fileName && parsedResume ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{fileName}</p>
                  <p className="text-xs text-emerald-700 font-semibold">
                    Parsed {parsedResume.normalized_skills.length} skills & {parsedResume.experience.length} roles cleanly.
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setFileName(null); setParsedResume(null); }}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition text-center space-y-2">
              <Upload className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-bold text-slate-800">Upload Resume (PDF, DOCX, TXT)</span>
              <span className="text-xs text-slate-400">Automatic NLP extraction of skills, experience, & projects</span>
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
      ) : (
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Paste your raw resume text here..."
            rows={8}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white resize-none font-mono"
          />
        </div>
      )}

      {loading && <p className="text-xs text-blue-600 font-bold animate-pulse">Extracting resume entities & skills...</p>}
      {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}
    </div>
  );
};
