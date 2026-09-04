from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from pydantic import BaseModel
from typing import Optional
from app.services.document_parser import document_parser
from app.services.nlp_extractor import nlp_extractor
from app.models.schemas import ParsedJobDescription

router = APIRouter(prefix="/job-description", tags=["job-description"])

class JDTextRequest(BaseModel):
    text: Optional[str] = None

@router.post("/analyze", response_model=ParsedJobDescription)
async def analyze_jd_json(req: JDTextRequest):
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Job description text is empty.")
    try:
        return nlp_extractor.extract_job_description(req.text.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze job description: {str(e)}")

@router.post("/upload", response_model=ParsedJobDescription)
async def upload_jd_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")
    try:
        contents = await file.read()
        extracted_text = document_parser.extract_text_from_bytes(contents, file.filename)
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Uploaded file is empty or could not be read.")
        return nlp_extractor.extract_job_description(extracted_text)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process job description file: {str(e)}")
