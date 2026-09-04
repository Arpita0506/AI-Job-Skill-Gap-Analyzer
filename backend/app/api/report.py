import json
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.models.database import get_db, AnalysisDB
from app.services.pdf_generator import pdf_generator

router = APIRouter(prefix="/report", tags=["report"])

@router.get("/pdf/{analysis_id}")
def download_pdf_report(analysis_id: str, db: Session = Depends(get_db)):
    record = db.query(AnalysisDB).filter(AnalysisDB.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")

    analysis_data = json.loads(record.result_json)
    pdf_bytes = pdf_generator.generate_report_bytes(analysis_data)

    filename = f"AI_Skill_Gap_Report_{analysis_id[:8]}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
