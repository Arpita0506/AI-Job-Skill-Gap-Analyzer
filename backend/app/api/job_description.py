from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from typing import Optional
from app.services.document_parser import document_parser
from app.services.nlp_extractor import nlp_extractor
from app.models.schemas import ParsedJobDescription

router = APIRouter(prefix="/job-description", tags=["job-description"])

@router.post("/analyze", response_model=ParsedJobDescription)
async def analyze_jd(
    text: Optional[str] = Body(None, embed=True),
    file: Optional[UploadFile] = File(None)
):
    jd_text = ""
    if file:
        contents = await file.read()
        jd_text = document_parser.extract_text_from_bytes(contents, file.filename)
    elif text:
        jd_text = text.strip()

    if not jd_text:
        raise HTTPException(status_code=400, detail="Please provide a job description as text or file.")

    try:
        parsed_data = nlp_extractor.extract_job_description(jd_text)
        return parsed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze job description: {str(e)}")
