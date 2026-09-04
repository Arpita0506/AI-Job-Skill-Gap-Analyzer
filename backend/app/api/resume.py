from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.document_parser import document_parser
from app.services.nlp_extractor import nlp_extractor
from app.models.schemas import ParsedResume

router = APIRouter(prefix="/resume", tags=["resume"])

@router.post("/upload", response_model=ParsedResume)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")
        
    try:
        contents = await file.read()
        extracted_text = document_parser.extract_text_from_bytes(contents, file.filename)
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="File is empty or could not be read.")
            
        parsed_data = nlp_extractor.extract_resume(extracted_text)
        return parsed_data
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process resume file: {str(e)}")
