# AI Job & Skill Gap Analyzer Platform

A production-grade, full-stack **AI Job & Skill Gap Analyzer** web application that evaluates candidate resumes against target job descriptions using NLP entity extraction, skill taxonomy normalization, TF-IDF vector cosine similarity semantic matching, weighted match & readiness scoring, ATS compatibility analysis, dynamic 30-day learning roadmap generation, project recommendations, personalized interview preparation, and executive PDF report export.

---

## 🌟 Key Features

1. **Multi-Format Resume Parsing (PDF, DOCX, TXT)**:
   - Resilient section header segmentation for irregular layouts.
   - Extracts structured JSON: Name, Contact Info, Summary, Education, Skills, Programming Languages, Frameworks, Databases, Cloud & DevOps, Tools, Certifications, Work Experience, Projects, Soft Skills, and Achievements.

2. **Job Description Intelligence**:
   - Parses job postings via text upload or direct copy-paste.
   - Categorizes requirements into MUST HAVE vs. GOOD TO HAVE skills, experience levels (0-2y, 2-5y, 5+y), education requirements, and domain knowledge.

3. **Skill Taxonomy & Normalization Engine**:
   - Maps synonyms to canonical skill names (e.g., `"JS"` → `"JavaScript"`, `"Postgres"` → `"PostgreSQL"`, `"ML"` → `"Machine Learning"`, `"AWS"` → `"Amazon Web Services"`).
   - Categorizes skills into Programming, Databases, Frameworks, ML/AI, Cloud/DevOps, Tools, Soft Skills, and Domains.

4. **Semantic Skill Matching & Priority Engine**:
   - Uses TF-IDF vector cosine similarity and taxonomy context matching to evaluate related skills beyond basic string equality.
   - Classifies requirements into 🟢 **Strong Match**, 🟡 **Partial Match**, and 🔴 **Missing Skill**.
   - Assigns priority ratings (🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low) based on JD frequency, importance, and difficulty.

5. **Weighted Scoring & AI Explanation Engine**:
   - Calculates a weighted **Overall Job Match Score** (0–100%):
     - Technical Skills: 40%
     - Experience: 20%
     - Projects: 15%
     - Education: 10%
     - Certifications: 5%
     - Soft Skills: 5%
     - Domain Knowledge: 5%
   - Computes a separate **Job Readiness Score** (0–100%).
   - Generates plain-English AI explanations detailing exact score rationales.

6. **ATS Compatibility & Resume Polish Engine**:
   - Computes ATS Compatibility Score (0–100).
   - Checks standard section headers, formatting structure, missing keyword alerts, and provides action-verb bullet point transformations (before vs. after) without fabricating experience.

7. **Personalized 30-Day Learning Roadmap & Portfolio Projects**:
   - Dynamic 4-week structured schedule targeting high-priority skill gaps.
   - Includes weekly goals, prerequisites, mini-projects, expected outcomes, and a capstone milestone project.
   - Recommends multi-skill portfolio projects tailored to target job requirements.

8. **Personalized Interview Preparation**:
   - Generates interview questions across 5 categories: Technical, Resume-Specific, Project Architecture, Behavioral, and Missing Skill Questions.
   - Includes sample ideal model responses and rationale context.

9. **Executive PDF Report Export**:
   - Multi-page report generated dynamically via ReportLab containing candidate & job summaries, score breakdown tables, skill gap matrices, ATS metrics, and 30-day learning schedules.

10. **1-Click Demo Presets**:
    - Pre-loaded with 3 complete e2e scenarios for instant testing:
      1. Software Engineer (Full-stack dev vs. Senior Cloud Engineer with AWS/Docker gaps)
      2. Data Analyst (SQL/Python/Power BI analyst vs. Snowflake/Tableau role)
      3. Machine Learning Engineer (Scikit-learn/TensorFlow dev vs. PyTorch/MLOps role)

---

## 🏗️ System Architecture

```
                                USER
                                 ↓
                   React + TypeScript Frontend UI
                                 ↓
                         FastAPI API Gateway
                                 ↓
     ┌───────────────────────────┼───────────────────────────┐
     ↓                           ↓                           ↓
Document Parser             NLP Extractor             Skill Normalizer
     ↓                           ↓                           ↓
     └───────────────────────────┼───────────────────────────┘
                                 ↓
                       Semantic Matching Engine
                                 ↓
                     Scoring & Priority Engine
                                 ↓
     ┌───────────────────────────┼───────────────────────────┐
     ↓                           ↓                           ↓
ATS Analyzer            Roadmap Generator            Interview Prep
     ↓                           ↓                           ↓
     └───────────────────────────┼───────────────────────────┘
                                 ↓
                       PDF Executive Report
```

---

## ⚙️ Installation & Setup Guide

### Prerequisites
- **Node.js**: v18+ or v24+
- **Python**: 3.10+

---

### Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend FastAPI web server:
   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```
   *The backend will run on `http://localhost:8000`. Interactive API Docs are available at `http://localhost:8000/docs`.*

---

### Frontend Setup (React + Vite + TypeScript)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🧪 E2E Demo Walkthrough

1. Open `http://localhost:5173` in your browser.
2. Click **"Load Demo Scenarios"** in the top navigation bar.
3. Select **"Full-Stack Software Engineer Scenario"** (or Data Analyst / ML Engineer).
4. View the generated **Job Match Score (78%)**, **Readiness Score**, and category breakdown.
5. Explore the **Skill Gap Matrix** to inspect Strong, Partial, and Missing skills.
6. Click the **"30-Day Roadmap"** tab to view the week-by-week learning plan and capstone project.
7. Check the **"ATS Analysis"** tab to view bullet point transformations and keyword alerts.
8. Click **"Export PDF Report"** to download the printable PDF document.

---

## 🛡️ AI Safety & Ethical Rules

- The system strictly **never fabricates experience**, unearned degrees, or false certifications.
- All scores are explicitly labeled as **AI-generated compatibility estimates**.
- Resume bullet improvements focus purely on syntactic enhancement and quantifiable metrics based on context.
