import axios from 'axios';
import { AnalysisResultResponse, ParsedResume, ParsedJobDescription } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const api = {
  uploadResume: async (file: File): Promise<ParsedResume> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE_URL}/resume/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  analyzeJobDescription: async (text?: string, file?: File): Promise<ParsedJobDescription> => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API_BASE_URL}/job-description/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } else {
      const response = await axios.post(`${API_BASE_URL}/job-description/analyze`, { text });
      return response.data;
    }
  },

  runMatchAnalysis: async (payload: {
    resume_text?: string;
    job_description_text?: string;
    use_demo_preset?: string;
  }): Promise<AnalysisResultResponse> => {
    const response = await axios.post(`${API_BASE_URL}/analysis/match`, payload);
    return response.data;
  },

  getReportPdfUrl: (analysisId: string): string => {
    return `${API_BASE_URL}/report/pdf/${analysisId}`;
  }
};
