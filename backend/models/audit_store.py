from __future__ import annotations

import json
import os
import uuid
from datetime import UTC, datetime, timedelta
from typing import Any

from supabase import create_client, Client

class AuditStore:
    def __init__(self) -> None:
        self.url = os.getenv("SUPABASE_URL")
        self.key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")
        
        if not self.url or not self.key:
            # Fallback or warning - in a real app we'd want this to fail fast if DB is required
            print("Warning: Supabase credentials missing. DB operations will fail.")
            self.client = None
        else:
            self.client: Client = create_client(self.url, self.key)

    def create(self, modality: str, payload: dict[str, Any], input_hash: str | None = None, user_id: str | None = None) -> dict[str, Any]:
        audit_id = f"veridex_{modality}_{uuid.uuid4().hex[:12]}"
        created_at = datetime.now(UTC).isoformat()
        
        row = {
            "id": audit_id,
            "user_id": user_id,
            "modality": modality,
            "input_hash": input_hash,
            "origin": payload.get("origin"),
            "truth_score": payload.get("truth_score"),
            "verity_index": payload.get("verity_index"),
            "payload_json": json.dumps(payload),
            "created_at": created_at,
        }
        
        if self.client:
            self.client.table("audits").insert(row).execute()
        
        return {"id": audit_id, "created_at": created_at}

    def upsert_fingerprint(self, audit_id: str, modality: str, simhash64: int) -> None:
        created_at = datetime.now(UTC).isoformat()
        fp_hex = f"{int(simhash64) & ((1 << 64) - 1):016x}"
        
        row = {
            "audit_id": audit_id,
            "modality": modality,
            "simhash64": fp_hex,
            "created_at": created_at
        }
        
        if self.client:
            self.client.table("fingerprints").upsert(row).execute()

    def search_similar_fingerprints(self, modality: str, simhash64: int, limit: int = 5) -> list[dict[str, Any]]:
        if not self.client:
            return []
            
        # Supabase/Postgres doesn't have a built-in bitwise XOR for similarity directly in a simple query 
        # without a custom function, but we can fetch recent and do it in Python like before.
        res = self.client.table("fingerprints") \
            .select("audit_id, simhash64") \
            .eq("modality", modality) \
            .order("created_at", desc=True) \
            .limit(250) \
            .execute()
            
        candidates = []
        for row in res.data:
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
        if not self.client:
            return None
            
        res = self.client.table("audits").select("*").eq("id", audit_id).maybe_single().execute()
        data = res.data
        if not data:
            return None
            
        payload = json.loads(data["payload_json"])
        payload["id"] = data["id"]
        payload["modality"] = data["modality"]
        payload["created_at"] = data["created_at"]
        payload["input_hash"] = data["input_hash"]
        return payload

    def list_recent(self, limit: int = 25) -> list[dict[str, Any]]:
        if not self.client:
            return []
            
        res = self.client.table("audits") \
            .select("id, modality, origin, truth_score, verity_index, created_at") \
            .order("created_at", desc=True) \
            .limit(limit) \
            .execute()
            
        return res.data

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
        
        if self.client:
            self.client.table("leads").insert(row).execute()
            
        return {"id": lead_id, "created_at": created_at}

    def get_user_by_email(self, email: str) -> dict[str, Any] | None:
        if not self.client:
            return None
            
        res = self.client.table("users").select("*").eq("email", email).maybe_single().execute()
        return res.data

    def find_or_create_user(self, email: str) -> dict[str, Any]:
        user = self.get_user_by_email(email)
        if user:
            return user
        
        user_id = f"user_{uuid.uuid4().hex[:8]}"
        created_at = datetime.now(UTC).isoformat()
        
        row = {
            "id": user_id,
            "email": email,
            "plan": "free",
            "credits": 3,
            "created_at": created_at
        }
        
        if self.client:
            self.client.table("users").insert(row).execute()
            
        return row

    def update_user_plan(self, email: str, plan: str, credits: int) -> None:
        if not self.client:
            return
            
        user = self.get_user_by_email(email)
        if not user:
            self.find_or_create_user(email)
            
        self.client.table("users") \
            .update({"plan": plan, "credits": credits}) \
            .eq("email", email) \
            .execute()

    def deduct_credit(self, user_id: str) -> bool:
        if not self.client:
            return False
            
        # In Supabase/Postgres, we should ideally use an RPC or a clever update
        # For now, we'll do a simple update if credits > 0
        user = self.client.table("users").select("credits").eq("id", user_id).single().execute().data
        if user and user["credits"] > 0:
            self.client.table("users") \
                .update({"credits": user["credits"] - 1}) \
                .eq("id", user_id) \
                .execute()
            return True
        return False

    def get_audit_count_last_30_days(self, user_id: str) -> int:
        if not self.client:
            return 0
            
        thirty_days_ago = (datetime.now(UTC) - timedelta(days=30)).isoformat()
        res = self.client.table("audits") \
            .select("id", count="exact") \
            .eq("user_id", user_id) \
            .gt("created_at", thirty_days_ago) \
            .execute()
            
        return res.count if res.count is not None else 0
