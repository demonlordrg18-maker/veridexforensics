from __future__ import annotations

import hashlib
import json
import os
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


def _sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


@dataclass(frozen=True)
class LedgerAppendResult:
    record_hash: str
    prev_hash: str


class VerityLedger:
    """
    Phase 5 MVP: append-only hash-chained transparency ledger (file-backed).

    Enable with `VERIDEX_ENABLE_LEDGER=1`.
    """

    def __init__(self, path: str = "backend/verity_ledger.jsonl") -> None:
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def enabled(self) -> bool:
        return os.getenv("VERIDEX_ENABLE_LEDGER", "").strip().lower() in {"1", "true", "yes", "on"}

    def _read_last_hash(self) -> str:
        if not self.path.exists():
            return "0" * 64
        try:
            last_line = None
            with self.path.open("rb") as f:
                for line in f:
                    if line.strip():
                        last_line = line
            if not last_line:
                return "0" * 64
            obj = json.loads(last_line.decode("utf-8"))
            return str(obj.get("record_hash") or ("0" * 64))
        except Exception:
            return "0" * 64

    def append(self, audit_id: str, modality: str, input_hash: str | None, verity_index: float) -> LedgerAppendResult | None:
        if not self.enabled():
            return None
        prev = self._read_last_hash()
        payload = {
            "ts": _now_iso(),
            "audit_id": audit_id,
            "modality": modality,
            "input_hash": input_hash,
            "verity_index": round(float(verity_index), 4),
            "prev_hash": prev,
        }
        record_hash = _sha256_hex(json.dumps(payload, sort_keys=True).encode("utf-8"))
        payload["record_hash"] = record_hash
        with self.path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(payload) + "\n")
        return LedgerAppendResult(record_hash=record_hash, prev_hash=prev)

    def verify(self) -> dict[str, Any]:
        if not self.path.exists():
            return {"ok": True, "items": 0, "note": "Ledger file does not exist yet."}
        prev = "0" * 64
        count = 0
        with self.path.open("r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                obj = json.loads(line)
                expected_prev = str(obj.get("prev_hash") or "")
                if expected_prev != prev:
                    return {"ok": False, "items": count, "error": "Hash chain broken.", "at": count + 1}
                record_hash = str(obj.get("record_hash") or "")
                check_obj = dict(obj)
                check_obj.pop("record_hash", None)
                calc = _sha256_hex(json.dumps(check_obj, sort_keys=True).encode("utf-8"))
                if calc != record_hash:
                    return {"ok": False, "items": count, "error": "Record hash mismatch.", "at": count + 1}
                prev = record_hash
                count += 1
        return {"ok": True, "items": count}

