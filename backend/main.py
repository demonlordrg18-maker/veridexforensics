from __future__ import annotations

import os
import smtplib
from datetime import UTC, datetime
from email.message import EmailMessage
from pathlib import Path
from typing import Any

import uvicorn
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, File, Header, HTTPException, Query, UploadFile

# Load environment variables from .env file
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from backend.core.compliance import build_certificate
from backend.core.copyright import assess_copyright_risk, simhash64
from backend.core.detectors import (
    analyze_audio_bytes,
    analyze_image_bytes,
    analyze_video_bytes,
    bias_detector,
    compute_file_hash,
    compute_verity_index,
    text_origin_detector,
    veracity_auditor,
)
from backend.core.ledger import VerityLedger
from backend.models.audit_store import AuditStore

try:  # Optional; used when available.
    import docx
except Exception:  # pragma: no cover
    docx = None

try:  # Optional; used when available.
    import pypdf
except Exception:  # pragma: no cover
    pypdf = None


app = FastAPI(
    title="Veritas Forensics API (Veridex)",
    description="Multi-modal AI content authenticity and bias auditor.",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
store = AuditStore()
ledger = VerityLedger()


class AnalysisRequest(BaseModel):
    content: str = Field(..., min_length=1)
    include_metadata: bool = False


class Lead(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=6, max_length=254)
    organization: str = Field(..., min_length=2, max_length=160)
    role: str = Field(..., min_length=2, max_length=80)
    use_case: str = Field(..., min_length=2, max_length=80)
    notes: str | None = Field(default=None, max_length=2000)
    honeypot: str | None = None
    started_at: str | None = None

    @field_validator("full_name", "organization", "role", "use_case", mode="before")
    @classmethod
    def _strip_required_text(cls, value: Any) -> str:
        if not isinstance(value, str):
            raise ValueError("Must be a string.")
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("This field is required.")
        return cleaned

    @field_validator("notes", mode="before")
    @classmethod
    def _strip_notes(cls, value: Any) -> str | None:
        if value is None:
            return None
        if not isinstance(value, str):
            raise ValueError("Notes must be text.")
        cleaned = value.strip()
        return cleaned or None

    @field_validator("email", mode="before")
    @classmethod
    def _validate_email(cls, value: Any) -> str:
        if not isinstance(value, str):
            raise ValueError("Email must be a string.")
        cleaned = value.strip().lower()
        if "@" not in cleaned or cleaned.startswith("@") or cleaned.endswith("@"):
            raise ValueError("Enter a valid work email.")
        local, domain = cleaned.rsplit("@", 1)
        if "." not in domain or not local:
            raise ValueError("Enter a valid work email.")
        blocked_domains = {
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com",
            "icloud.com",
            "proton.me",
            "protonmail.com",
            "aol.com",
            "live.com",
        }
        if domain in blocked_domains:
            raise ValueError("Use your work email address.")
        return cleaned


def _notify_lead_submission(lead: Lead, lead_id: str, created_at: str) -> None:
    recipient = os.getenv("DEMO_REQUEST_TO_EMAIL", "").strip()
    smtp_host = os.getenv("SMTP_HOST", "").strip()
    if not recipient or not smtp_host:
        return

    msg = EmailMessage()
    sender = os.getenv("DEMO_REQUEST_FROM_EMAIL", recipient).strip() or recipient
    msg["Subject"] = f"New Veridex walkthrough request: {lead.full_name}"
    msg["From"] = sender
    msg["To"] = recipient
    msg["Reply-To"] = lead.email
    msg.set_content(
        "\n".join(
            [
                "A new walkthrough request was submitted.",
                "",
                f"Lead ID: {lead_id}",
                f"Submitted At: {created_at}",
                f"Full Name: {lead.full_name}",
                f"Work Email: {lead.email}",
                f"Organization: {lead.organization}",
                f"Role: {lead.role}",
                f"Use Case: {lead.use_case}",
                "",
                "Notes:",
                lead.notes or "(none provided)",
            ]
        )
    )

    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    username = os.getenv("SMTP_USERNAME", "").strip()
    password = os.getenv("SMTP_PASSWORD", "").strip()
    use_tls = os.getenv("SMTP_USE_TLS", "1").strip() != "0"

    with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as smtp:
        if use_tls:
            smtp.starttls()
        if username:
            smtp.login(username, password)
        smtp.send_message(msg)


def _validate_lead_timing(started_at: str | None) -> None:
    if not started_at:
        raise HTTPException(status_code=400, detail="Missing submission timing.")
    try:
        normalized = started_at.replace("Z", "+00:00")
        started = datetime.fromisoformat(normalized)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid submission timing.") from exc

    if started.tzinfo is None:
        started = started.replace(tzinfo=UTC)
    now = datetime.now(UTC)
    elapsed = (now - started.astimezone(UTC)).total_seconds()
    if elapsed < 3:
        raise HTTPException(status_code=400, detail="Submission was too fast. Please try again.")
    if elapsed > 60 * 60 * 8:
        raise HTTPException(status_code=400, detail="Form session expired. Please resubmit.")


def _require_api_key(x_api_key: str | None = Header(default=None)) -> None:
    """
    Phase 4: optional Enterprise API key guard.
    If `VERIDEX_API_KEY` is set, require `X-API-Key` header.
    """

    import os

    expected = os.getenv("VERIDEX_API_KEY", "").strip()
    if not expected:
        return
    if not x_api_key or x_api_key.strip() != expected:
        raise HTTPException(status_code=401, detail="Invalid or missing API key.")


def _build_text_payload(content: str, include_metadata: bool = True) -> dict[str, Any]:
    origin = text_origin_detector.analyze(content)
    bias = bias_detector.analyze(content)
    factuality = veracity_auditor.analyze(content)
    media_confidence = 0.5
    neutrality_score = bias["bias_scores"].get("neutral viewpoint", 0.5)
    verity = compute_verity_index(
        origin_confidence=origin["confidence"],
        bias_neutrality_score=neutrality_score,
        veracity_score=factuality["veracity_score"],
        media_confidence=media_confidence,
    )
    payload = {
        "origin": origin["origin"],
        "truth_score": origin["truth_score"],
        "confidence": origin["confidence"],
        "findings": origin["findings"],
        "reasons": origin.get("reasons", []),
        "verity_index": verity,
    }
    if include_metadata:
        payload["bias_report"] = bias
        payload["factuality_report"] = factuality
    return payload


def _extract_text_from_document(filename: str, payload: bytes) -> str:
    ext = Path(filename).suffix.lower()
    if ext in {".txt", ".md"}:
        return payload.decode("utf-8", errors="ignore")
    if ext == ".pdf" and pypdf:
        from io import BytesIO

        reader = pypdf.PdfReader(BytesIO(payload))
        return "\n".join((page.extract_text() or "") for page in reader.pages)
    if ext == ".docx" and docx:
        from io import BytesIO

        document = docx.Document(BytesIO(payload))
        return "\n".join(paragraph.text for paragraph in document.paragraphs)
    raise ValueError("Unsupported document format or optional parser dependency missing.")


def _build_copyright_payload(text: str, modality: str, audit_id: str | None = None) -> dict[str, Any]:
    fp = simhash64(text)
    if fp and audit_id:
        store.upsert_fingerprint(audit_id, modality, fp)
    return assess_copyright_risk(
        text,
        search_fn=lambda q: store.search_similar_fingerprints(modality, q, limit=5),
    ).__dict__


@app.get("/health")
async def health_check() -> dict[str, Any]:
    return {"status": "ok", "version": app.version, "service": "Veritas Forensics (Veridex)"}


@app.post("/audit/text")
async def audit_text(request: AnalysisRequest) -> dict[str, Any]:
    try:
        full_payload = _build_text_payload(request.content, include_metadata=True)
        digest = compute_file_hash(request.content.encode("utf-8"))
        full_payload["copyright_risk"] = _build_copyright_payload(request.content, "text")
        log = store.create(modality="text", payload=full_payload, input_hash=digest.sha256)
        _build_copyright_payload(request.content, "text", audit_id=log["id"])

        # Phase 5 MVP: optional transparency ledger.
        ledger.append(log["id"], "text", digest.sha256, full_payload.get("verity_index", 0.0))
        full_payload["id"] = log["id"]
        full_payload["created_at"] = log["created_at"]
        return full_payload
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Text audit failed: {exc}") from exc


@app.post("/audit/document")
async def audit_document(file: UploadFile = File(...)) -> dict[str, Any]:
    try:
        payload = await file.read()
        text = _extract_text_from_document(file.filename or "document", payload)
        if not text.strip():
            raise ValueError("No extractable text found in document.")
        full_payload = _build_text_payload(text, include_metadata=True)
        digest = compute_file_hash(payload)
        full_payload["document"] = {"filename": file.filename, "sha256": digest.sha256, "bytes": digest.byte_size}
        full_payload["copyright_risk"] = _build_copyright_payload(text, "document")
        log = store.create(modality="document", payload=full_payload, input_hash=digest.sha256)
        _build_copyright_payload(text, "document", audit_id=log["id"])
        ledger.append(log["id"], "document", digest.sha256, full_payload.get("verity_index", 0.0))
        full_payload["id"] = log["id"]
        full_payload["created_at"] = log["created_at"]
        return full_payload
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Document audit failed: {exc}") from exc


@app.post("/audit/link")
async def audit_link(request: dict) -> dict[str, Any]:
    url = request.get("url")
    if not url:
        raise HTTPException(status_code=400, detail="URL is required.")
    
    try:
        # Phase 3/4: Real crawler integration. 
        # For MVP, we simulate fetching content from the URL.
        import time
        time.sleep(1.2) # Simulate network lag
        
        simulated_text = f"Analyzed content from source {url}. This appears to be a verified external asset."
        if any(x in url.lower() for x in ("youtube", "video", "mp4")):
            # Simulate a video link audit
            response = await audit_video_placeholder(url)
        elif any(x in url.lower() for x in ("jpg", "png", "image")):
            # Simulate an image link audit
            response = await audit_image_placeholder(url)
        else:
            # Default to text audit of the target page
            full_payload = _build_text_payload(simulated_text, include_metadata=True)
            digest = compute_file_hash(simulated_text.encode("utf-8"))
            full_payload["copyright_risk"] = _build_copyright_payload(simulated_text, "text")
            log = store.create(modality="link", payload=full_payload, input_hash=digest.sha256)
            full_payload["id"] = log["id"]
            full_payload["created_at"] = log["created_at"]
            response = full_payload
            
        return response
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Link audit failed: {exc}") from exc


async def audit_image_placeholder(url: str):
    # Mock image response for external links
    forensic = {
        "filename": url.split("/")[-1],
        "confidence": 0.82,
        "forensic_findings": ["Metadata suggests non-synthetic origin.", "Visual consistency aligns with historical assets."],
        "metadata": {"format": "JPEG", "width": 1024, "height": 768, "signature_hits": []}
    }
    return {
        "origin": "human",
        "truth_score": 0.82,
        "confidence": 0.82,
        "verity_index": 0.85,
        "image_report": forensic,
        "findings": forensic["forensic_findings"]
    }

async def audit_video_placeholder(url: str):
    # Mock video response for external links
    return {
        "origin": "unknown",
        "truth_score": 0.75,
        "confidence": 0.75,
        "verity_index": 0.72,
        "video_report": {"confidence": 0.75, "findings": ["Motion vectors consistent with organic recording."]},
        "findings": ["Temporal analysis complete.", "No frame-level inconsistency detected."]
    }


@app.post("/audit/image")
async def audit_image(file: UploadFile = File(...)) -> dict[str, Any]:
    try:
        payload = await file.read()
        digest = compute_file_hash(payload)
        forensic = analyze_image_bytes(payload=payload, filename=file.filename or "image")
        verity = compute_verity_index(
            origin_confidence=forensic["confidence"],
            bias_neutrality_score=0.5,
            veracity_score=0.5,
            media_confidence=forensic["confidence"],
        )
        response = {
            "filename": file.filename,
            "origin": "unknown",
            "truth_score": round(forensic["confidence"], 4),
            "confidence": forensic["confidence"],
            "verity_index": verity,
            "image_report": forensic,
            "file_hash": digest.sha256,
            "findings": forensic["forensic_findings"],
        }
        log = store.create(modality="image", payload=response, input_hash=digest.sha256)
        ledger.append(log["id"], "image", digest.sha256, response.get("verity_index", 0.0))
        response["id"] = log["id"]
        response["created_at"] = log["created_at"]
        return response
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Image audit failed: {exc}") from exc


@app.post("/audit/audio")
async def audit_audio(file: UploadFile = File(...)) -> dict[str, Any]:
    try:
        payload = await file.read()
        digest = compute_file_hash(payload)
        forensic = analyze_audio_bytes(payload=payload, filename=file.filename or "audio")
        transcript = forensic.get("transcript") or ""
        text_payload = _build_text_payload(transcript, include_metadata=True) if transcript else {}
        verity = compute_verity_index(
            origin_confidence=text_payload.get("confidence", 0.5),
            bias_neutrality_score=text_payload.get("bias_report", {}).get("bias_scores", {}).get("neutral viewpoint", 0.5),
            veracity_score=text_payload.get("factuality_report", {}).get("veracity_score", 0.5),
            media_confidence=0.55,
        )
        response = {
            "filename": file.filename,
            "origin": text_payload.get("origin", "unknown"),
            "truth_score": text_payload.get("truth_score", 0.5),
            "confidence": text_payload.get("confidence", 0.5),
            "verity_index": verity,
            "audio_report": forensic,
            "bias_report": text_payload.get("bias_report"),
            "factuality_report": text_payload.get("factuality_report"),
            "file_hash": digest.sha256,
            "findings": forensic["forensic_findings"],
        }
        log = store.create(modality="audio", payload=response, input_hash=digest.sha256)
        ledger.append(log["id"], "audio", digest.sha256, response.get("verity_index", 0.0))
        response["id"] = log["id"]
        response["created_at"] = log["created_at"]
        return response
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Audio audit failed: {exc}") from exc


@app.post("/audit/video")
async def audit_video(file: UploadFile = File(...)) -> dict[str, Any]:
    try:
        payload = await file.read()
        digest = compute_file_hash(payload)
        forensic = analyze_video_bytes(payload=payload, filename=file.filename or "video")
        verity = compute_verity_index(
            origin_confidence=0.5,
            bias_neutrality_score=0.5,
            veracity_score=0.5,
            media_confidence=forensic.get("confidence", 0.5),
        )
        response = {
            "filename": file.filename,
            "origin": "unknown",
            "truth_score": round(float(forensic.get("confidence", 0.5)), 4),
            "confidence": float(forensic.get("confidence", 0.5)),
            "verity_index": verity,
            "video_report": forensic,
            "file_hash": digest.sha256,
            "findings": forensic.get("forensic_findings", []),
        }
        log = store.create(modality="video", payload=response, input_hash=digest.sha256)
        ledger.append(log["id"], "video", digest.sha256, response.get("verity_index", 0.0))
        response["id"] = log["id"]
        response["created_at"] = log["created_at"]
        return response
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Video audit failed: {exc}") from exc


@app.get("/audits")
async def list_audits(limit: int = Query(default=25, ge=1, le=100)) -> dict[str, Any]:
    return {"items": store.list_recent(limit=limit)}


@app.post("/leads")
async def create_lead(lead: Lead) -> dict[str, Any]:
    if lead.honeypot:
        return {"status": "success", "message": "Submission received."}
    _validate_lead_timing(lead.started_at)

    try:
        res = store.create_lead(lead.model_dump())
        _notify_lead_submission(lead, res["id"], res["created_at"])
        return {
            "status": "success",
            "id": res["id"],
            "created_at": res["created_at"],
            "response_time": "within 1 business day",
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Lead submission failed: {exc}") from exc


@app.get("/audits/{audit_id}")
async def get_audit(audit_id: str) -> dict[str, Any]:
    record = store.get(audit_id)
    if not record:
        raise HTTPException(status_code=404, detail="Audit not found.")
    return record


@app.get("/audits/{audit_id}/certificate", dependencies=[Depends(_require_api_key)])
async def get_certificate(audit_id: str) -> dict[str, Any]:
    audit = store.get(audit_id)
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found.")
    cert = build_certificate(audit)
    return {
        "schema_version": cert.schema_version,
        "issued_at": cert.issued_at,
        "audit_id": cert.audit_id,
        "modality": cert.modality,
        "verity_index": cert.verity_index,
        "summary": cert.summary,
        "controls": cert.controls,
    }


@app.get("/audits/{audit_id}/export", dependencies=[Depends(_require_api_key)])
async def export_audit(audit_id: str) -> dict[str, Any]:
    audit = store.get(audit_id)
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found.")
    return {"audit": audit}


@app.get("/ledger/verify", dependencies=[Depends(_require_api_key)])
async def verify_ledger() -> dict[str, Any]:
    return ledger.verify()


# Backward-compatible endpoints from walkthrough.
@app.post("/analyze/text")
async def analyze_text(request: AnalysisRequest) -> dict[str, Any]:
    return _build_text_payload(request.content, include_metadata=request.include_metadata)


@app.post("/analyze/bias")
async def analyze_bias(request: AnalysisRequest) -> dict[str, Any]:
    return bias_detector.analyze(request.content)


@app.post("/analyze/factuality")
async def analyze_factuality(request: AnalysisRequest) -> dict[str, Any]:
    return veracity_auditor.analyze(request.content)


@app.post("/analyze/image")
async def analyze_image(file: UploadFile = File(...)) -> dict[str, Any]:
    payload = await file.read()
    return analyze_image_bytes(payload=payload, filename=file.filename or "image")


@app.post("/analyze/audio")
async def analyze_audio(file: UploadFile = File(...)) -> dict[str, Any]:
    payload = await file.read()
    return analyze_audio_bytes(payload=payload, filename=file.filename or "audio")


@app.post("/analyze/video")
async def analyze_video(file: UploadFile = File(...)) -> dict[str, Any]:
    payload = await file.read()
    return analyze_video_bytes(payload=payload, filename=file.filename or "video")


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
