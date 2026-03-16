from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


class AuditStore:
    def __init__(self, db_path: str = "backend/veridex.db") -> None:
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_schema()

    def _get_conn(self) -> sqlite3.Connection:
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        return conn

    def _init_schema(self) -> None:
        with self._get_conn() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS audits (
                    id TEXT PRIMARY KEY,
                    modality TEXT NOT NULL,
                    input_hash TEXT,
                    origin TEXT,
                    truth_score REAL,
                    verity_index REAL,
                    payload_json TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
                """
            )
            conn.execute(
                """
                CREATE INDEX IF NOT EXISTS idx_audits_created_at
                ON audits(created_at DESC)
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS fingerprints (
                    audit_id TEXT PRIMARY KEY,
                    modality TEXT NOT NULL,
                    simhash64 TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
                """
            )
            conn.execute(
                """
                CREATE INDEX IF NOT EXISTS idx_fingerprints_modality_created_at
                ON fingerprints(modality, created_at DESC)
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS leads (
                    id TEXT PRIMARY KEY,
                    full_name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    organization TEXT NOT NULL,
                    role TEXT NOT NULL,
                    use_case TEXT NOT NULL,
                    notes TEXT,
                    created_at TEXT NOT NULL
                )
                """
            )
            conn.execute(
                """
                CREATE INDEX IF NOT EXISTS idx_leads_created_at
                ON leads(created_at DESC)
                """
            )

    def create(self, modality: str, payload: dict[str, Any], input_hash: str | None = None) -> dict[str, Any]:
        audit_id = f"veridex_{modality}_{uuid.uuid4().hex[:12]}"
        created_at = datetime.now(UTC).isoformat()
        row = {
            "id": audit_id,
            "modality": modality,
            "input_hash": input_hash,
            "origin": payload.get("origin"),
            "truth_score": payload.get("truth_score"),
            "verity_index": payload.get("verity_index"),
            "payload_json": json.dumps(payload),
            "created_at": created_at,
        }
        with self._get_conn() as conn:
            conn.execute(
                """
                INSERT INTO audits (id, modality, input_hash, origin, truth_score, verity_index, payload_json, created_at)
                VALUES (:id, :modality, :input_hash, :origin, :truth_score, :verity_index, :payload_json, :created_at)
                """,
                row,
            )
        return {"id": audit_id, "created_at": created_at}

    def upsert_fingerprint(self, audit_id: str, modality: str, simhash64: int) -> None:
        created_at = datetime.now(UTC).isoformat()
        # Store as hex string to avoid SQLite signed 64-bit INTEGER overflow.
        fp_hex = f"{int(simhash64) & ((1 << 64) - 1):016x}"
        with self._get_conn() as conn:
            conn.execute(
                """
                INSERT INTO fingerprints (audit_id, modality, simhash64, created_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(audit_id) DO UPDATE SET simhash64=excluded.simhash64
                """,
                (audit_id, modality, fp_hex, created_at),
            )

    def search_similar_fingerprints(self, modality: str, simhash64: int, limit: int = 5) -> list[dict[str, Any]]:
        # Brute-force over recent rows (MVP); upgrade to proper ANN/vector DB in Phase 4+.
        with self._get_conn() as conn:
            rows = conn.execute(
                """
                SELECT audit_id, simhash64
                FROM fingerprints
                WHERE modality = ?
                ORDER BY created_at DESC
                LIMIT 250
                """,
                (modality,),
            ).fetchall()
        candidates = []
        for row in rows:
            raw = row["simhash64"]
            try:
                other = int(str(raw), 16)
            except Exception:
                other = int(raw) if raw is not None else 0
            dist = (int(simhash64) ^ other).bit_count()
            candidates.append({"id": row["audit_id"], "distance": dist})
        candidates.sort(key=lambda x: x["distance"])
        return candidates[:limit]

    def get(self, audit_id: str) -> dict[str, Any] | None:
        with self._get_conn() as conn:
            data = conn.execute("SELECT * FROM audits WHERE id = ?", (audit_id,)).fetchone()
            if not data:
                return None
            payload = json.loads(data["payload_json"])
            payload["id"] = data["id"]
            payload["modality"] = data["modality"]
            payload["created_at"] = data["created_at"]
            payload["input_hash"] = data["input_hash"]
            return payload

    def list_recent(self, limit: int = 25) -> list[dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute(
                """
                SELECT id, modality, origin, truth_score, verity_index, created_at
                FROM audits
                ORDER BY created_at DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [dict(row) for row in rows]

    def create_lead(self, data: dict[str, Any]) -> dict[str, Any]:
        lead_id = f"lead_{uuid.uuid4().hex[:8]}"
        created_at = datetime.now(UTC).isoformat()
        row = {
            "id": lead_id,
            "full_name": data["full_name"],
            "email": data["email"],
            "organization": data["organization"],
            "role": data["role"],
            "use_case": data["use_case"],
            "notes": data.get("notes", ""),
            "created_at": created_at,
        }
        with self._get_conn() as conn:
            conn.execute(
                """
                INSERT INTO leads (id, full_name, email, organization, role, use_case, notes, created_at)
                VALUES (:id, :full_name, :email, :organization, :role, :use_case, :notes, :created_at)
                """,
                row,
            )
        return {"id": lead_id, "created_at": created_at}
