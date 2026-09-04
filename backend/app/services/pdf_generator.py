import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from typing import Dict, Any

class PDFReportGenerator:
    def generate_report_bytes(self, analysis_data: Dict[str, Any]) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )
        
        styles = getSampleStyleSheet()
        
        # Unique Palette matching Cyber Violet-Cyan Theme
        primary_color = colors.HexColor("#090d16")
        brand_violet = colors.HexColor("#7c3aed")
        brand_cyan = colors.HexColor("#0284c7")
        accent_emerald = colors.HexColor("#059669")
        bg_light = colors.HexColor("#f8fafc")
        
        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=22,
            leading=26,
            textColor=primary_color,
            spaceAfter=6
        )
        
        subtitle_style = ParagraphStyle(
            'DocSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=11,
            leading=14,
            textColor=colors.HexColor("#64748b"),
            spaceAfter=15
        )

        h2_style = ParagraphStyle(
            'Heading2Custom',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=14,
            leading=18,
            textColor=brand_violet,
            spaceBefore=12,
            spaceAfter=8
        )
        
        body_style = ParagraphStyle(
            'BodyCustom',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#334155")
        )

        story = []
        
        # Header Section
        story.append(Paragraph("AI Skill Gap & Career Executive Report", title_style))
        job_title = analysis_data.get("parsed_jd", {}).get("job_title", "Target Position")
        company = analysis_data.get("parsed_jd", {}).get("company", "Target Company")
        cand_name = analysis_data.get("parsed_resume", {}).get("name", "Candidate")
        story.append(Paragraph(f"Candidate: <b>{cand_name}</b> | Position: <b>{job_title} ({company})</b>", subtitle_style))
        story.append(HRFlowable(width="100%", thickness=1.5, color=brand_violet, spaceAfter=15))

        # Overall Match Summary Box
        match_score = analysis_data.get("overall_match_score", 0)
        readiness_score = analysis_data.get("job_readiness_score", 0)
        ats_score = analysis_data.get("ats_analysis", {}).get("ats_score", 0)
        
        summary_table_data = [
            [
                Paragraph(f"<b>Overall Match Score</b><br/><font size=18 color='#7c3aed'><b>{match_score}%</b></font>", body_style),
                Paragraph(f"<b>Job Readiness Score</b><br/><font size=18 color='#059669'><b>{readiness_score}%</b></font>", body_style),
                Paragraph(f"<b>ATS Compatibility</b><br/><font size=18 color='#0284c7'><b>{ats_score}%</b></font>", body_style)
            ]
        ]
        summary_table = Table(summary_table_data, colWidths=[180, 180, 180])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), bg_light),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
            ('PADDING', (0,0), (-1,-1), 10)
        ]))
        story.append(summary_table)
        story.append(Spacer(1, 15))

        # AI Explanation
        story.append(Paragraph("Executive Assessment & AI Rationale", h2_style))
        ai_exp = analysis_data.get("ai_explanation", "")
        story.append(Paragraph(ai_exp, body_style))
        story.append(Spacer(1, 15))

        # Score Breakdown Table
        story.append(Paragraph("Category Score Breakdown", h2_style))
        breakdown = analysis_data.get("score_breakdown", {})
        bd_data = [["Category", "Match Score", "Weight"]]
        weight_labels = {
            "technical_skills": ("Technical Skills", "40%"),
            "experience": ("Experience", "20%"),
            "projects": ("Projects", "15%"),
            "education": ("Education", "10%"),
            "certifications": ("Certifications", "5%"),
            "soft_skills": ("Soft Skills", "5%"),
            "domain_knowledge": ("Domain Knowledge", "5%")
        }
        for k, (label, w) in weight_labels.items():
            score_val = breakdown.get(k, 0)
            bd_data.append([label, f"{score_val}%", w])
            
        bd_table = Table(bd_data, colWidths=[240, 150, 150])
        bd_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), brand_violet),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0,0), (-1,0), 6),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light]),
            ('PADDING', (0,0), (-1,-1), 6)
        ]))
        story.append(bd_table)
        story.append(Spacer(1, 15))

        # Skill Gap Analysis Table
        story.append(Paragraph("Key Skill Gap Analysis & Priority", h2_style))
        skill_matches = analysis_data.get("skill_matches", [])[:10]
        sg_data = [["Skill Name", "Requirement", "Status", "Priority"]]
        for item in skill_matches:
            status = item.get("match_status", "Missing")
            color_hex = "#059669" if status == "Strong Match" else ("#d97706" if status == "Partial Match" else "#dc2626")
            sg_data.append([
                item.get("skill", ""),
                item.get("requirement_type", ""),
                Paragraph(f"<font color='{color_hex}'><b>{status}</b></font>", body_style),
                item.get("priority", "Medium")
            ])
            
        sg_table = Table(sg_data, colWidths=[160, 130, 130, 120])
        sg_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), brand_cyan),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light]),
            ('PADDING', (0,0), (-1,-1), 5)
        ]))
        story.append(sg_table)
        story.append(Spacer(1, 15))

        # 4-Week Learning Roadmap
        story.append(Paragraph("Personalized 30-Day Learning Roadmap Summary", h2_style))
        weeks = analysis_data.get("learning_roadmap", {}).get("weeks", [])
        for w in weeks:
            story.append(Paragraph(f"<b>Week {w.get('week', 1)}: {w.get('title', '')}</b>", body_style))
            story.append(Paragraph(f"• <b>Focus:</b> {', '.join(w.get('skills_focus', []))}", body_style))
            story.append(Paragraph(f"• <b>Project Goal:</b> {w.get('mini_project', '')}", body_style))
            story.append(Spacer(1, 4))

        doc.build(story)
        pdf_data = buffer.getvalue()
        buffer.close()
        return pdf_data

pdf_generator = PDFReportGenerator()
