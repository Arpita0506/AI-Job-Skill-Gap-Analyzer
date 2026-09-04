import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { DemoPresetsModal } from './components/DemoPresetsModal';
import { PDFReportModal } from './components/PDFReportModal';
import { AnalysisResultResponse } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultResponse | null>(null);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [presetLoading, setPresetLoading] = useState<boolean>(false);

  const handleSelectPreset = async (presetKey: string) => {
    setPresetLoading(true);
    try {
      const result = await api.runMatchAnalysis({ use_demo_preset: presetKey });
      setAnalysisResult(result);
      setIsPresetsOpen(false);
    } catch (err) {
      console.error("Failed to load preset analysis:", err);
    } finally {
      setPresetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar
        onOpenPresets={() => setIsPresetsOpen(true)}
        onDownloadReport={() => setIsPdfOpen(true)}
        hasAnalysis={!!analysisResult}
        onReset={() => setAnalysisResult(null)}
      />

      <main className="flex-1">
        <Dashboard
          analysisResult={analysisResult}
          onAnalysisUpdate={setAnalysisResult}
          onOpenPresets={() => setIsPresetsOpen(true)}
        />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500">
        <p>© 2026 SkillGapAI • Production AI Job & Skill Gap Analyzer Platform • Built with FastAPI & React</p>
      </footer>

      <DemoPresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
        loading={presetLoading}
      />

      {analysisResult && (
        <PDFReportModal
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          analysisId={analysisResult.id}
        />
      )}
    </div>
  );
};

export default App;
