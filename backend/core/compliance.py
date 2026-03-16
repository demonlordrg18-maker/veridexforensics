from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


@dataclass(frozen=True)
class ComplianceCertificate:
    schema_version: str
    issued_at: str
    audit_id: str
    modality: str
    verity_index: float
    summary: dict[str, Any]
    controls: list[dict[str, Any]]


def build_certificate(audit: dict[str, Any]) -> ComplianceCertificate:
    """
    Phase 4 MVP: JSON certificate suitable for compliance workflows.

    This is not a legal certification; it's a structured, reproducible report.
    """

    modality = str(audit.get("modality") or "unknown")
    verity = float(audit.get("verity_index") or 0.0)
    summary = {
        "origin": audit.get("origin", "unknown"),
        "truth_score": audit.get("truth_score"),
        "confidence": audit.get("confidence"),
    }

    # Minimal control set mapping to common AI governance expectations.
    controls = [
        {"id": "TRACE-1", "name": "Forensic traceability", "status": "pass" if audit.get("input_hash") else "partial"},
        {"id": "ORIG-1", "name": "Origin transparency", "status": "pass" if audit.get("origin") else "partial"},
        {
            "id": "FACT-1",
            "name": "Claim veracity assessment",
            "status": "pass" if audit.get("factuality_report") else "partial",
        },
        {"id": "BIAS-1", "name": "Bias mapping", "status": "pass" if audit.get("bias_report") else "partial"},
        {"id": "SCORE-1", "name": "Composite verity index", "status": "pass" if "verity_index" in audit else "fail"},
    ]

    return ComplianceCertificate(
        schema_version="veridex.certificate.v1",
        issued_at=_now_iso(),
        audit_id=str(audit.get("id") or ""),
        modality=modality,
        verity_index=round(verity, 4),
        summary=summary,
        controls=controls,
    )

