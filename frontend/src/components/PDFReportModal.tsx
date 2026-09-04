import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import { api } from '../services/api';

interface PDFReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisId: string;
}

export const PDFReportModal: React.FC<PDFReportModalProps> = ({
  isOpen,
  onClose,
  analysisId,
}) => {
  if (!isOpen) return null;

  const pdfUrl = api.getReportPdfUrl(analysisId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative text-center">
        
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-blue-600">
          <FileText className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">Generate Executive PDF Report</h3>
          <p className="text-xs text-slate-500">Export your complete job compatibility analysis, skill gap matrix, ATS metrics, and 30-day roadmap into a printable PDF document.</p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={pdfUrl}
            download={`AI_Skill_Gap_Report_${analysisId.slice(0, 8)}.pdf`}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition"
          >
            Preview in Browser Window
          </a>
        </div>

      </div>
    </div>
  );
};
