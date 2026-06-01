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
        
        self._local_audits: dict[str, dict[str, Any]] = {}
        self._local_fingerprints: dict[str, dict[str, Any]] = {}
        self._local_users: dict[str, dict[str, Any]] = {}
        self._local_leads: dict[str, dict[str, Any]] = {}
        
        if not self.url or not self.key:
            print("Warning: Supabase credentials missing. DB operations will use local in-memory fallback.")
            self.client = None
        else:
            try:
                self.client: Client | None = create_client(self.url, self.key)
            except Exception as e:
                print(f"Warning: Supabase client initialization failed: {e}. DB operations will use local in-memory fallback.")
                self.client = None

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
            try:
                self.client.table("audits").insert(row).execute()
            except Exception:
                self._local_audits[audit_id] = row
        else:
            self._local_audits[audit_id] = row
        
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
            try:
                self.client.table("fingerprints").upsert(row).execute()
            except Exception:
                self._local_fingerprints[audit_id] = row
        else:
            self._local_fingerprints[audit_id] = row

    def search_similar_fingerprints(self, modality: str, simhash64: int, limit: int = 5) -> list[dict[str, Any]]:
        data = []
        if self.client:
            try:
                res = self.client.table("fingerprints") \
                    .select("audit_id, simhash64") \
                    .eq("modality", modality) \
                    .order("created_at", desc=True) \
                    .limit(250) \
                    .execute()
                data = res.data
            except Exception:
                data = list(self._local_fingerprints.values())
        else:
            data = list(self._local_fingerprints.values())
            
        candidates = []
        for row in data:
            if row.get("modality") == modality:
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
        row = None
        if self.client:
            try:
                res = self.client.table("audits").select("*").eq("id", audit_id).maybe_single().execute()
                row = res.data
            except Exception:
                row = self._local_audits.get(audit_id)
        else:
            row = self._local_audits.get(audit_id)
            
        if not row:
            return None
            
        payload = json.loads(row["payload_json"])
        payload["id"] = row["id"]
        payload["modality"] = row["modality"]
        payload["created_at"] = row["created_at"]
        payload["input_hash"] = row["input_hash"]
        return payload

    def list_recent(self, limit: int = 25) -> list[dict[str, Any]]:
        if self.client:
            try:
                res = self.client.table("audits") \
                    .select("id, modality, origin, truth_score, verity_index, created_at") \
                    .order("created_at", desc=True) \
                    .limit(limit) \
                    .execute()
                return res.data
            except Exception:
                pass
        
        sorted_audits = sorted(self._local_audits.values(), key=lambda x: x["created_at"], reverse=True)
        return [
            {
                "id": a["id"],
                "modality": a["modality"],
                "origin": a["origin"],
                "truth_score": a["truth_score"],
                "verity_index": a["verity_index"],
                "created_at": a["created_at"]
            }
            for a in sorted_audits[:limit]
        ]

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
            try:
                self.client.table("leads").insert(row).execute()
            except Exception:
                self._local_leads[lead_id] = row
        else:
            self._local_leads[lead_id] = row
            
        return {"id": lead_id, "created_at": created_at}

    def get_user_by_email(self, email: str) -> dict[str, Any] | None:
        if self.client:
            try:
                res = self.client.table("users").select("*").eq("email", email).maybe_single().execute()
                return res.data
            except Exception:
                pass
        return self._local_users.get(email)

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
            try:
                self.client.table("users").insert(row).execute()
            except Exception:
                self._local_users[email] = row
        else:
            self._local_users[email] = row
            
        return row

    def update_user_plan(self, email: str, plan: str, credits: int) -> None:
        user = self.get_user_by_email(email)
        if not user:
            user = self.find_or_create_user(email)
            
        user["plan"] = plan
        user["credits"] = credits
        
        if self.client:
            try:
                self.client.table("users") \
                    .update({"plan": plan, "credits": credits}) \
                    .eq("email", email) \
                    .execute()
            except Exception:
                self._local_users[email] = user
        else:
            self._local_users[email] = user

    def deduct_credit(self, user_id: str) -> bool:
        user = None
        if self.client:
            try:
                user = self.client.table("users").select("credits, email").eq("id", user_id).single().execute().data
            except Exception:
                pass
                
        if not user:
            for u in self._local_users.values():
                if u["id"] == user_id:
                    user = u
                    break
        
        if user and user["credits"] > 0:
            user["credits"] -= 1
            if self.client:
                try:
                    self.client.table("users") \
                        .update({"credits": user["credits"]}) \
                        .eq("id", user_id) \
                        .execute()
                    return True
                except Exception:
                    for k, u in self._local_users.items():
                        if u["id"] == user_id:
                            self._local_users[k]["credits"] = user["credits"]
                            break
                    return True
            else:
                for k, u in self._local_users.items():
                    if u["id"] == user_id:
                        self._local_users[k]["credits"] = user["credits"]
                        break
                return True
        return False

    def get_audit_count_last_30_days(self, user_id: str) -> int:
        if self.client:
            try:
                thirty_days_ago = (datetime.now(UTC) - timedelta(days=30)).isoformat()
                res = self.client.table("audits") \
                    .select("id", count="exact") \
                    .eq("user_id", user_id) \
                    .gt("created_at", thirty_days_ago) \
                    .execute()
                return res.count if res.count is not None else 0
            except Exception:
                pass
                
        thirty_days_ago = (datetime.now(UTC) - timedelta(days=30))
        count = 0
        for a in self._local_audits.values():
            if a["user_id"] == user_id:
                try:
                    created = datetime.fromisoformat(a["created_at"])
                    if created.tzinfo is None:
                        created = created.replace(tzinfo=UTC)
                    if created > thirty_days_ago:
                        count += 1
                except Exception:
                    pass
        return count
