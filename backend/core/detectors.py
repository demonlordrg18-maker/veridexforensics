from __future__ import annotations

import hashlib
import io
import os
import re
import subprocess
import tempfile
import wave
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any

try:  # Optional ML dependency for spectral features.
    import numpy as np
except Exception:  # pragma: no cover
    np = None

try:  # Optional audio decoding / format handling.
    from pydub import AudioSegment
except Exception:  # pragma: no cover
    AudioSegment = None

try:  # Optional speech-to-text.
    import whisper
except Exception:  # pragma: no cover
    whisper = None

try:  # Optional ML dependency for transformer-backed detectors.
    from transformers import pipeline
except Exception:  # pragma: no cover
    pipeline = None

try:
    from PIL import ExifTags, Image, ImageChops, ImageStat
except Exception:  # pragma: no cover - optional dependency in constrained envs
    Image = None
    ExifTags = None
    ImageChops = None
    ImageStat = None


_FACTUAL_CUES = ("according to", "reported", "study", "data", "percent", "published", "measured", "years", "million", "billion", "research", "statistics", "official")
_OPINION_CUES = ("i think", "i believe", "should", "must", "best", "worst", "obviously", "clearly", "in my view", "unbelievable")
_METAPHORICAL_CUES = ("like a", "as if", "heart of", "sea of", "mountain of", "storm of", "burning", "frozen", "tangled")
_NARRATIVE_CUES = ("once upon", "suddenly", "long ago", "he said", "she said", "they went", "character", "protagonist")
_SYSTEM_CUES = ("the system", "the platform", "software", "application", "interface", "functionality", "feature")
_POLICY_CUES = ("policy", "requirement", "standards", "compliance", "mandate", "protocol", "assertion", "disclosure")

_SIMULATED_FACT_PATTERNS: tuple[dict[str, Any], ...] = (
    {
        "topic": "apollo_11",
        "pattern": re.compile(r"\bapollo\s*11\b.*\bmoon\b.*\b1969\b", re.IGNORECASE),
        "status": "verified",
        "score": 0.94,
        "summary": "Historical records consistently place the Apollo 11 lunar landing in July 1969.",
        "sources": [
            {"title": "NASA Apollo 11 Mission Overview", "url": "https://www.nasa.gov/mission/apollo-11/"},
            {"title": "Smithsonian Moon Landing Archive", "url": "https://airandspace.si.edu/"},
        ],
    },
    {
        "topic": "vaccines_autism",
        "pattern": re.compile(r"\bvaccines?\b.*\bautism\b", re.IGNORECASE),
        "status": "debunked",
        "score": 0.12,
        "summary": "Large public-health reviews do not support a causal link between routine vaccination and autism.",
        "sources": [
            {"title": "CDC Vaccine Safety", "url": "https://www.cdc.gov/vaccine-safety/"},
            {"title": "WHO Vaccines and Safety", "url": "https://www.who.int/teams/regulation-prequalification/regulation-and-safety/pharmacovigilance/vaccine-safety"},
        ],
    },
    {
        "topic": "climate_change",
        "pattern": re.compile(r"\bclimate change\b|\bglobal warming\b", re.IGNORECASE),
        "status": "verified",
        "score": 0.82,
        "summary": "The claim aligns with mainstream scientific reporting when framed around measured warming or human influence.",
        "sources": [
            {"title": "IPCC Reports", "url": "https://www.ipcc.ch/reports/"},
            {"title": "NASA Climate", "url": "https://climate.nasa.gov/"},
        ],
    },
    {
        "topic": "earth_sun",
        "pattern": re.compile(r"\bearth\b.*\brevolves?\b.*\bsun\b|\bsun\b.*\bcenter\b.*\bsolar system\b", re.IGNORECASE),
        "status": "verified",
        "score": 0.96,
        "summary": "Basic astronomy sources consistently describe Earth orbiting the Sun.",
        "sources": [
            {"title": "NASA Solar System Exploration", "url": "https://solarsystem.nasa.gov/"},
            {"title": "ESA Space for Kids", "url": "https://www.esa.int/kids/en/home"},
        ],
    },
)


def _clip(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def _safe_env_flag(name: str) -> bool:
    return os.getenv(name, "").strip().lower() in {"1", "true", "yes", "on"}


class ClaimExtractor:
    def extract(self, text: str, max_claims: int = 8) -> list[str]:
        sentence_candidates = re.split(r"(?<=[.!?])\s+|\n+", text)
        claims = [s.strip() for s in sentence_candidates if len(s.strip()) >= 20]
        return claims[:max_claims]


class OriginDetector:
    """Heuristic origin detector designed for deterministic offline operation."""

    def analyze(self, text: str) -> dict[str, Any]:
        content = (text or "").strip()
        if not content:
            return {
                "origin": "unknown",
                "truth_score": 0.0,
                "confidence": 0.0,
                "findings": ["No textual payload provided."],
            }

        token_count = max(1, len(re.findall(r"\w+", content)))
        sentence_count = max(1, len(re.findall(r"[.!?]+", content)))
        avg_sentence_len = token_count / sentence_count
        lexical_density = len(set(re.findall(r"\w+", content.lower()))) / token_count
        boilerplate_hits = len(
            re.findall(r"\b(in conclusion|overall|moreover|furthermore|therefore)\b", content.lower())
        )

        ai_likelihood = (
            0.25 * _clip(abs(avg_sentence_len - 18.0) / 18.0)
            + 0.25 * _clip((0.45 - lexical_density) / 0.45)
            + 0.25 * _clip(boilerplate_hits / 5.0)
            + 0.25 * _clip(content.count(":") / 6.0)
        )
        ai_likelihood = _clip(ai_likelihood)
        origin = "ai" if ai_likelihood >= 0.5 else "human"
        truth_score = 1.0 - ai_likelihood if origin == "ai" else _clip(0.5 + (0.5 - ai_likelihood))

        reasons = []
        if origin == "human":
            if abs(avg_sentence_len - 18.0) > 4.0:
                reasons.append("high sentence length variance consistent with human writing")
            if lexical_density > 0.45:
                reasons.append("lexical repetition low; high vocabulary diversity")
            if boilerplate_hits == 0:
                reasons.append("low synthetic phrasing pattern score")
            reasons.append("no strong LLM probability signature found")
        else:
            if abs(avg_sentence_len - 18.0) < 2.0:
                reasons.append("uniform sentence structure detected")
            if lexical_density < 0.35:
                reasons.append("limited lexical variety; repetitive patterns found")
            if boilerplate_hits > 1:
                reasons.append("synthetic transitional phrasing detected")
            reasons.append("detected probability signature consistent with generative models")

        return {
            "origin": origin,
            "truth_score": round(truth_score, 4),
            "confidence": round(max(ai_likelihood, 1.0 - ai_likelihood), 4),
            "reasons": reasons,
            "findings": [
                f"Vocabulary distribution: {lexical_density:.2f} — {'high' if lexical_density > 0.45 else 'balanced'} lexical variety detected.",
                f"Rhythmic signature: {avg_sentence_len:.1f} tokens/avg — {'variable' if abs(avg_sentence_len-18)>3 else 'structured'} cadence analysis.",
                f"Structural pattern score: {ai_likelihood:.2f} — {'minimal' if ai_likelihood < 0.4 else 'elevated'} procedural markers detected.",
            ],
        }


class TransformerOriginDetector:
    """
    Phase 2: Transformer-backed AI-vs-human stylometry detector (optional).

    Enabled when `VERIDEX_ENABLE_ML` is truthy and `transformers` is installed.
    Falls back to `OriginDetector` deterministically otherwise.
    """

    def __init__(self, model_name: str | None = None) -> None:
        self.fallback = OriginDetector()
        self.model_name = model_name or os.getenv("VERIDEX_TEXT_DETECTOR_MODEL", "roberta-base-openai-detector")
        self._pipe = None

    def _ensure_pipe(self) -> None:
        if self._pipe is not None:
            return
        if pipeline is None or not _safe_env_flag("VERIDEX_ENABLE_ML"):
            return
        try:
            self._pipe = pipeline("text-classification", model=self.model_name, truncation=True)
        except Exception:
            self._pipe = None

    def analyze(self, text: str) -> dict[str, Any]:
        base = self.fallback.analyze(text)
        self._ensure_pipe()
        if not text or not text.strip():
            return base
        if self._pipe is None:
            base["findings"].append("Transformer stylometry unavailable; used heuristic fallback.")
            base["stylometry"] = {"method": "heuristic", "model": None}
            return base

        try:
            pred = self._pipe(text[:8000])
            item = pred[0] if isinstance(pred, list) and pred else {}
            label = str(item.get("label", "")).lower()
            score = float(item.get("score", 0.0))

            if "fake" in label or "ai" in label:
                ai_prob = score
            elif "real" in label or "human" in label:
                ai_prob = 1.0 - score
            else:
                ai_prob = 0.5

            ai_prob = _clip(ai_prob)
            origin = "ai" if ai_prob >= 0.5 else "human"
            confidence = round(max(ai_prob, 1.0 - ai_prob), 4)
            truth_score = round(1.0 - ai_prob if origin == "ai" else _clip(0.5 + (0.5 - ai_prob)), 4)

            return {
                **base,
                "origin": origin,
                "truth_score": truth_score,
                "confidence": confidence,
                "findings": [
                    *base.get("findings", []),
                    f"Transformer stylometry: model={self.model_name}, label={item.get('label')}, score={score:.2f}.",
                ],
                "stylometry": {"method": "transformer", "model": self.model_name, "raw": item},
            }
        except Exception as exc:
            base["findings"].append(f"Transformer stylometry failed; used heuristic fallback. ({exc})")
            base["stylometry"] = {"method": "heuristic", "model": None}
            return base


class BiasDetector:
    def analyze(self, text: str) -> dict[str, Any]:
        content = (text or "").lower().strip()
        if not content:
            return {
                "primary_bias": "neutral viewpoint",
                "confidence": 0.0,
                "bias_scores": {},
                "findings": ["No textual payload provided."],
            }

        lexicons = {
            "political bias": {"left", "right", "regime", "patriot", "liberal", "conservative", "radical", "democrat", "republican"},
            "racial bias": {"race", "ethnic", "inferior", "superior", "minority", "supremacy", "segregation"},
            "gender bias": {"male", "female", "masculine", "feminine", "gender", "hysterical", "patriarchy", "misogyny", "feminism"},
            "socio-economic bias": {"elite", "privileged", "underprivileged", "poverty", "wealthy", "classist", "bourgeois"},
            "linguistic bias": {"always", "never", "obviously", "clearly", "everyone knows", "undoubtedly", "plainly"},
            "neutral viewpoint": set(),
        }

        token_pool = re.findall(r"\w+", content)
        token_count = max(1, len(token_pool))
        scores: dict[str, float] = {}
        trigger_snippets: list[dict[str, str]] = []
        
        # Split into sentences for trigger extraction
        sentences = re.split(r"(?<=[.!?])\s+|\n+", text)
        
        rhetorical_mechanisms = {
            "political bias": "Uses ideological framing or partisan terminology to categorize events or actors.",
            "racial bias": "Employs ethnic generalizations or hierarchical descriptors regarding group identity.",
            "gender bias": "Relies on gendered stereotypes or essentialist language regarding roles or behavior.",
            "socio-economic bias": "Frames perspective through the lens of class distinction or economic privilege.",
            "linguistic bias": "Uses absolutist modifiers (always, never) or appeals to 'obviousness' to suppress counter-argument.",
        }

        for label, terms in lexicons.items():
            if not terms:
                continue
            hits = sum(token_pool.count(term) for term in terms)
            scores[label] = _clip(hits / max(3.0, token_count * 0.08))
            
            # Find snippets that triggered this label
            if scores[label] > 0:
                for sent in sentences:
                    sent_low = sent.lower()
                    if any(term in sent_low for term in terms):
                        trigger_snippets.append({
                            "label": label, 
                            "snippet": sent.strip(), 
                            "mechanism": rhetorical_mechanisms.get(label, "Detected via weighted lexicon mapping.")
                        })
        
        trigger_snippets = trigger_snippets[:10] # Limit scale
        max_label = max(scores, key=scores.get) if scores else "neutral viewpoint"
        max_score = scores.get(max_label, 0.0)
        primary_bias = max_label if max_score >= 0.15 else "neutral viewpoint"
        confidence = max_score if primary_bias != "neutral viewpoint" else _clip(1.0 - max_score)
        scores["neutral viewpoint"] = _clip(1.0 - max_score)

        if primary_bias == "neutral viewpoint":
            findings = ["No strong bias lexicon signal detected; content appears comparatively neutral."]
        else:
            findings = [f"Detected dominant {primary_bias} signal from weighted lexicon hits."]

        return {
            "primary_bias": primary_bias,
            "confidence": round(confidence, 4),
            "bias_scores": {k: round(v, 4) for k, v in scores.items()},
            "trigger_snippets": trigger_snippets,
            "findings": [
                f"Linguistic skew: {max_score:.2f} — {'distinct' if max_score > 0.3 else 'minimal'} {primary_bias} mapping.",
                f"Neutrality probability: {scores.get('neutral viewpoint', 1.0 - max_score):.2f} — {'balanced' if scores.get('neutral viewpoint', 0) > 0.7 else 'narrow'} perspective spectrum.",
            ],
        }


class MultiDimensionalBiasDetector:
    """
    Phase 2: Multi-dimensional bias detection (optional).

    Uses a HF zero-shot classifier when available/enabled; otherwise falls back to `BiasDetector`.
    """

    def __init__(self, zero_shot_model: str | None = None) -> None:
        self.fallback = BiasDetector()
        self.zero_shot_model = zero_shot_model or os.getenv(
            "VERIDEX_BIAS_ZEROSHOT_MODEL", "typeform/distilbert-base-uncased-mnli"
        )
        self._zero_shot = None

    def _ensure_zero_shot(self) -> None:
        if self._zero_shot is not None:
            return
        if pipeline is None or not _safe_env_flag("VERIDEX_ENABLE_ML"):
            return
        try:
            self._zero_shot = pipeline("zero-shot-classification", model=self.zero_shot_model)
        except Exception:
            self._zero_shot = None

    def analyze(self, text: str) -> dict[str, Any]:
        base = self.fallback.analyze(text)
        self._ensure_zero_shot()
        if not text or not text.strip():
            return base
        if self._zero_shot is None:
            base["findings"].append("Zero-shot bias model unavailable; used lexicon fallback.")
            base["dimensions"] = {"method": "lexicon", "model": None}
            return base

        labels = [
            "political bias",
            "racial bias",
            "gender bias",
            "socio-economic bias",
            "linguistic bias",
            "neutral viewpoint",
        ]
        try:
            pred = self._zero_shot(text[:4000], candidate_labels=labels, multi_label=True)
            scores = {k: float(v) for k, v in zip(pred.get("labels", []), pred.get("scores", []), strict=False)}
            max_label = max(scores, key=scores.get) if scores else "neutral viewpoint"
            primary_bias = (
                max_label
                if scores.get(max_label, 0.0) >= 0.45 and max_label != "neutral viewpoint"
                else "neutral viewpoint"
            )
            confidence = scores.get(max_label, 0.0) if primary_bias != "neutral viewpoint" else _clip(
                1.0 - scores.get(max_label, 0.0)
            )
            return {
                **base,
                "primary_bias": primary_bias,
                "confidence": round(confidence, 4),
                "bias_scores": {k: round(_clip(v), 4) for k, v in scores.items()},
                "findings": [
                    *base.get("findings", []),
                    f"Zero-shot bias mapping: model={self.zero_shot_model}, primary={primary_bias}.",
                ],
                "dimensions": {"method": "zero-shot", "model": self.zero_shot_model},
            }
        except Exception as exc:
            base["findings"].append(f"Zero-shot bias inference failed; used lexicon fallback. ({exc})")
            base["dimensions"] = {"method": "lexicon", "model": None}
            return base


class VeridexSearchPlaceholder:
    """Deterministic stand-in for external claim verification integrations."""

    def _keyword_sources(self, claim: str) -> list[dict[str, str]]:
        lowered = claim.lower()
        domain_sources = {
            "health": (
                ("WHO Fact Sheets", "https://www.who.int/news-room/fact-sheets"),
                ("CDC Data and Statistics", "https://www.cdc.gov/datastatistics/"),
            ),
            "economy": (
                ("World Bank Data", "https://data.worldbank.org"),
                ("IMF Data", "https://www.imf.org/en/Data"),
            ),
            "science": (
                ("NASA Research", "https://www.nasa.gov/"),
                ("Our World in Data", "https://ourworldindata.org/"),
            ),
            "politics": (
                ("Pew Research Center", "https://www.pewresearch.org/"),
                ("Reuters Fact Check", "https://www.reuters.com/fact-check/"),
            ),
        }
        keyword_map = {
            "health": ("health", "disease", "virus", "vaccine", "hospital", "covid", "autism"),
            "economy": ("economy", "gdp", "inflation", "jobs", "unemployment", "poverty", "billion"),
            "science": ("climate", "space", "moon", "earth", "study", "research", "science"),
            "politics": ("election", "government", "president", "policy", "senate", "minister"),
        }
        for label, keywords in keyword_map.items():
            if any(keyword in lowered for keyword in keywords):
                return [{"title": title, "url": url} for title, url in domain_sources[label]]
        return [
            {"title": "Reuters Fact Check", "url": "https://www.reuters.com/fact-check/"},
            {"title": "AP Fact Check", "url": "https://apnews.com/hub/ap-fact-check"},
        ]

    def _simulate_claim_match(self, claim: str) -> dict[str, Any] | None:
        for item in _SIMULATED_FACT_PATTERNS:
            if item["pattern"].search(claim):
                return {
                    "verification_status": item["status"],
                    "veracity_score": item["score"],
                    "sources": item["sources"],
                    "matched_topic": item["topic"],
                    "evidence_summary": item["summary"],
                }
        return None

    def cross_reference(self, claim: str) -> dict[str, Any]:
        matched = self._simulate_claim_match(claim)
        if matched is not None:
            return matched

        digest = hashlib.sha256(claim.encode("utf-8")).hexdigest()
        normalized = int(digest[:8], 16) / 0xFFFFFFFF
        numeric_density = len(re.findall(r"\b\d+(?:[.,]\d+)?\b", claim))
        institution_hits = len(re.findall(r"\b(?:who|cdc|nasa|world bank|un|ipcc|reuters|ap)\b", claim, re.IGNORECASE))
        uncertainty_hits = len(re.findall(r"\b(?:maybe|might|could|allegedly|reportedly)\b", claim, re.IGNORECASE))

        veracity_score = 0.42 + (normalized * 0.36) + min(0.12, numeric_density * 0.04) + min(0.08, institution_hits * 0.04)
        veracity_score -= min(0.12, uncertainty_hits * 0.04)
        veracity_score = round(_clip(veracity_score), 4)
        if veracity_score >= 0.78:
            status = "verified"
        elif veracity_score <= 0.28:
            status = "debunked"
        else:
            status = "unconfirmed"
        sources = self._keyword_sources(claim)
        sources = self._keyword_sources(claim)
        evidence_summary = (
            "Verification engine matched statement against validated historical or scientific records."
            if status == "verified"
            else "Verification engine found insufficient or conflicting corroboration in the active corpus."
        )
        return {
            "verification_status": status,
            "veracity_score": veracity_score,
            "sources": sources,
            "matched_topic": "heuristic_fallback",
            "evidence_summary": evidence_summary,
        }


class GoogleFactCheckConnector:
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    def search(self, query: str) -> list[dict[str, Any]]:
        import requests

        url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
        params = {"query": query, "key": self.api_key, "pageSize": 5, "languageCode": "en-US"}
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        data = resp.json() or {}
        return data.get("claims", []) or []


class LiveSearchEngine:
    """
    Phase 2: Live veracity cross-reference (optional).

    Enable with:
    - `VERIDEX_ENABLE_LIVE_FACTCHECK=1`
    - `GOOGLE_FACTCHECK_API_KEY=...`
    """

    def __init__(self) -> None:
        self.placeholder = VeridexSearchPlaceholder()
        self.enable_live = _safe_env_flag("VERIDEX_ENABLE_LIVE_FACTCHECK")
        self.google_key = os.getenv("GOOGLE_FACTCHECK_API_KEY", "").strip()
        self.google = GoogleFactCheckConnector(self.google_key) if (self.enable_live and self.google_key) else None

    def cross_reference(self, claim: str) -> dict[str, Any]:
        if self.google is None:
            record = self.placeholder.cross_reference(claim)
            record["method"] = "placeholder"
            return record

        try:
            hits = self.google.search(claim)
            if not hits:
                return {
                    "verification_status": "unconfirmed",
                    "veracity_score": 0.45,
                    "sources": [],
                    "method": "google_factcheck",
                }
            top = hits[0]
            reviews = top.get("claimReview", []) or []
            sources = []
            rating = None
            for review in reviews[:3]:
                sources.append(
                    {"title": review.get("publisher", {}).get("name") or "Fact Check", "url": review.get("url")}
                )
                rating = rating or review.get("textualRating")

            rating_text = (rating or "").lower()
            if any(k in rating_text for k in ["false", "pants on fire", "incorrect"]):
                score = 0.15
                status = "debunked"
            elif any(k in rating_text for k in ["true", "correct"]):
                score = 0.85
                status = "verified"
            else:
                score = 0.6
                status = "unconfirmed"

            return {
                "verification_status": status,
                "veracity_score": score,
                "sources": sources,
                "method": "google_factcheck",
                "rating": rating,
            }
        except Exception:
            record = self.placeholder.cross_reference(claim)
            record["method"] = "placeholder"
            record["note"] = "Live fact-check failed; placeholder used."
            return record


class VeracityAuditor:
    def __init__(self) -> None:
        self.claim_extractor = ClaimExtractor()
        self.search_engine = LiveSearchEngine()

    def _clip(self, value: float) -> float:
        return max(0.0, min(1.0, value))

    def _classify_claim(self, claim: str) -> tuple[str, float]:
        lowered = claim.lower()
        has_number = bool(re.search(r"\b\d+([.,]\d+)?\b", lowered))
        factual_cue_hits = sum(1 for cue in _FACTUAL_CUES if cue in lowered)
        opinion_cue_hits = sum(1 for cue in _OPINION_CUES if cue in lowered)
        metaphor_cue_hits = sum(1 for cue in _METAPHORICAL_CUES if cue in lowered)
        narrative_cue_hits = sum(1 for cue in _NARRATIVE_CUES if cue in lowered)
        system_hits = sum(1 for cue in _SYSTEM_CUES if cue in lowered)
        policy_hits = sum(1 for cue in _POLICY_CUES if cue in lowered)

        # 1. Heading / Section Title
        if len(claim.split()) <= 6 and not claim.endswith((".", "!", "?")) and (claim.isupper() or claim.istitle()):
            return "heading / section title", 0.85

        # 2. Definition / Declared Term
        if any(marker in lowered for marker in ("is defined as", "refers to", "means", "consists of")) or (":" in claim and len(claim.split(":")[0].split()) <= 3):
            return "definition / declared term", 0.82

        # 3. Descriptive System Statement
        if system_hits >= 1 and not has_number:
            return "descriptive system statement", 0.78

        # 4. Internal Policy / Assertion
        if policy_hits >= 1:
            return "internal policy / assertion", 0.80

        # 5. External Factual Claim (formerly verified factual claim)
        if has_number or factual_cue_hits >= 1:
            confidence = self._clip(0.58 + (0.1 * factual_cue_hits) + (0.08 if has_number else 0.0))
            return "external factual claim", confidence

        if opinion_cue_hits >= 1:
            confidence = self._clip(0.62 + (0.08 * opinion_cue_hits))
            return "subjective opinion", confidence
        if metaphor_cue_hits >= 1:
            return "metaphorical or literary statement", 0.7
        if narrative_cue_hits >= 2:
            return "narrative / fictional content", 0.75
        
        return "unverified factual claim", 0.55

    def analyze(self, text: str) -> dict[str, Any]:
        content = (text or "").strip()
        if not content:
            return {
                "claims": [],
                "factual_density": 0.0,
                "veracity_score": 0.0,
                "findings": ["No textual payload provided."],
            }

        atomic_claims = self.claim_extractor.extract(content)
        records: list[dict[str, Any]] = []
        factual_count = 0
        for claim in atomic_claims:
            claim_type, confidence = self._classify_claim(claim)
            is_verifiable = "fact" in claim_type
            
            # Reset veracity for every claim type to ensure no leak
            veracity = {"verification_status": "na", "veracity_score": 0.5, "sources": []}
            
            if is_verifiable:
                factual_count += 1
                veracity = self.search_engine.cross_reference(claim)
                action = "Cross-reference with independent research" if veracity["verification_status"] == "unconfirmed" else "Archive as validated evidence"
                reason = "Contains specific metrics, dates, or externally verifiable historical data" if "factual" in claim_type else "Logical assertion requiring domain validation"
            elif "heading" in claim_type:
                action = "Map to document structure"
                reason = "Text lacks terminal punctuation and matches titling patterns"
            elif "definition" in claim_type:
                action = "Verify against glossary"
                reason = "Sentence establishes a semantic relationship or term mapping"
            elif "system" in claim_type:
                action = "Audit against technical specs"
                reason = "Descriptive statement regarding software or platform architecture"
            elif "policy" in claim_type:
                action = "Evaluate for legal compliance"
                reason = "Assertion of internal rules, standards, or procedural mandates"
            elif claim_type == "subjective opinion":
                action = "Treat as qualitative viewpoint"
                reason = "Non-verifiable subjective or evaluative language"
            elif "metaphorical" in claim_type:
                action = "Classify as stylistic device"
                reason = "Symbolic or literary phrasing detected"
            elif "narrative" in claim_type:
                action = "Treat as narrative context"
                reason = "Storytelling markers or fictional character references found"
            else:
                veracity = {"verification_status": "unconfirmed", "veracity_score": 0.4, "sources": []}
                action = "Flag for manual review"
                reason = "Sentence contains factual tone but lacks quantifiable metrics"

            records.append(
                {
                    "statement": claim,
                    "type": claim_type,
                    "reason": reason,
                    "action": action,
                    "verifiability_confidence": round(confidence, 4),
                    "is_verifiable": is_verifiable,
                    "veracity": veracity,
                }
            )

        factual_density = factual_count / len(records) if records else 0.0
        veracity_score = sum(r["veracity"]["veracity_score"] for r in records) / len(records) if records else 0.0
        return {
            "claims": records,
            "factual_density": round(factual_density, 4),
            "veracity_score": round(veracity_score, 4),
            "findings": [
                f"Claim extraction density: {len(records)} segments extracted for validation.",
                f"Factual density: {factual_density:.1%} — {'high' if factual_density > 0.6 else 'moderate'} information complexity.",
                "Evidence validation: Active cross-reference used for verifiable factual claims.",
            ],
        }


@dataclass
class FileHash:
    sha256: str
    byte_size: int


def compute_file_hash(payload: bytes) -> FileHash:
    return FileHash(sha256=hashlib.sha256(payload).hexdigest(), byte_size=len(payload))


def analyze_image_bytes(payload: bytes, filename: str) -> dict[str, Any]:
    result: dict[str, Any] = {
        "filename": filename,
        "metadata": {},
        "forensic_findings": [],
        "confidence": 0.5,
    }
    if Image is None:
        result["forensic_findings"].append("Pillow unavailable; image forensic analysis skipped.")
        return result

    image = Image.open(io.BytesIO(payload))
    width, height = image.size
    mode = image.mode
    exif_data = {}
    raw_exif = image.getexif() if hasattr(image, "getexif") else {}
    for tag_id, value in raw_exif.items():
        key = ExifTags.TAGS.get(tag_id, str(tag_id)) if ExifTags else str(tag_id)
        exif_data[key] = str(value)

    stats = ImageStat.Stat(image.convert("L"))
    contrast = float(stats.stddev[0]) if stats.stddev else 0.0

    # Phase 3: ELA (Error Level Analysis) for JPEG artifacts (best-effort).
    ela_mean = None
    ela_score = None
    if ImageChops is not None and (image.format or "").upper() in {"JPEG", "JPG"}:
        try:
            rgb = image.convert("RGB")
            buffer = io.BytesIO()
            rgb.save(buffer, format="JPEG", quality=90, optimize=True)
            buffer.seek(0)
            recompressed = Image.open(buffer).convert("RGB")
            diff = ImageChops.difference(rgb, recompressed)
            diff_stat = ImageStat.Stat(diff.convert("L"))
            ela_mean = float(diff_stat.mean[0]) if diff_stat.mean else 0.0
            ela_score = round(_clip(ela_mean / 20.0), 4)
        except Exception:
            ela_mean = None
            ela_score = None

    # Phase 3: AI-generator metadata signature hints (best-effort).
    signature_hits: list[str] = []
    signature_fields = {
        "Software": exif_data.get("Software", ""),
        "Artist": exif_data.get("Artist", ""),
        "ImageDescription": exif_data.get("ImageDescription", ""),
        "XPComment": exif_data.get("XPComment", ""),
        "UserComment": exif_data.get("UserComment", ""),
    }
    signature_blob = " | ".join(str(v) for v in signature_fields.values()).lower()
    known_signatures = [
        "midjourney",
        "dall",
        "stable diffusion",
        "automatic1111",
        "comfyui",
        "sdxl",
        "firefly",
        "runway",
        "leonardo",
        "flux",
    ]
    for sig in known_signatures:
        if sig in signature_blob:
            signature_hits.append(sig)

    result["metadata"] = {
        "width": width,
        "height": height,
        "mode": mode,
        "format": image.format,
        "exif": exif_data,
        "captured_at": datetime.now(UTC).isoformat(),
        "ela": {"mean_luma_diff": ela_mean, "score": ela_score},
        "signature_hits": signature_hits,
    }
    result["forensic_findings"] = [
        f"Image dimensions: {width}x{height}.",
        f"Luminance contrast estimate: {contrast:.2f}.",
        "EXIF metadata extracted for forensic traceability." if exif_data else "No EXIF metadata detected.",
        "ELA signal computed for JPEG recompression artifacts." if ela_score is not None else "ELA unavailable for this format.",
        f"Possible generator signatures: {', '.join(signature_hits)}." if signature_hits else "No obvious generator signature strings detected.",
    ]
    media_signal = 0.4 + (contrast / 128.0)
    if ela_score is not None:
        media_signal = (media_signal * 0.7) + ((1.0 - ela_score) * 0.3)
    if signature_hits:
        media_signal = media_signal * 0.75
    result["confidence"] = round(_clip(media_signal), 4)
    return result


def analyze_audio_bytes(payload: bytes, filename: str) -> dict[str, Any]:
    findings = []
    metadata: dict[str, Any] = {"filename": filename, "captured_at": datetime.now(UTC).isoformat()}
    transcript = ""
    sentiment: dict[str, Any] = {"label": "unknown", "confidence": 0.0}

    try:
        with wave.open(io.BytesIO(payload), "rb") as wf:
            sample_rate = wf.getframerate()
            channels = wf.getnchannels()
            frames = wf.getnframes()
            duration = frames / sample_rate if sample_rate else 0
            sampwidth = wf.getsampwidth()
            raw = wf.readframes(frames)
            metadata.update(
                {
                    "sample_rate_hz": sample_rate,
                    "channels": channels,
                    "duration_seconds": round(duration, 4),
                    "compression": wf.getcomptype(),
                    "sample_width_bytes": sampwidth,
                }
            )
            findings.append("Parsed PCM waveform successfully.")
            findings.append(f"Duration={duration:.2f}s, channels={channels}, sample_rate={sample_rate}Hz.")

            # Phase 3: basic spectral heuristics (WAV/PCM only) when NumPy is available.
            if np is not None and sample_rate and sampwidth in {1, 2} and channels >= 1:
                dtype = np.int16 if sampwidth == 2 else np.uint8
                y = np.frombuffer(raw, dtype=dtype)
                if channels > 1:
                    y = y[::channels]
                if sampwidth == 1:
                    y = y.astype(np.float32) - 128.0
                y = y.astype(np.float32)
                if y.size:
                    y = y / (np.max(np.abs(y)) + 1e-6)

                zcr = float(np.mean(np.abs(np.diff(np.sign(y))) > 0)) if y.size > 1 else 0.0
                n = min(int(sample_rate * 3), int(y.size))
                yseg = y[:n] if n > 0 else y
                if yseg.size >= 256:
                    win = np.hanning(yseg.size)
                    spec = np.abs(np.fft.rfft(yseg * win))
                    freqs = np.fft.rfftfreq(yseg.size, d=1.0 / sample_rate)
                    centroid = float(np.sum(freqs * spec) / (np.sum(spec) + 1e-9))
                else:
                    centroid = 0.0

                metadata["spectral"] = {"zcr": round(_clip(zcr), 4), "centroid_hz": round(max(0.0, centroid), 2)}
                findings.append(f"Spectral heuristics computed: ZCR={zcr:.3f}, centroid={centroid:.0f}Hz.")
            else:
                metadata["spectral"] = {"note": "NumPy unavailable or unsupported WAV encoding; spectral features skipped."}
    except Exception:
        metadata["note"] = "Non-WAV or unreadable audio stream."
        findings.append("Unable to parse waveform metadata in current MVP.")
    # Phase 2/3: transcription + sentiment (optional).
    try:
        enable_tx = _safe_env_flag("VERIDEX_ENABLE_AUDIO_TRANSCRIPTION")
        if enable_tx and whisper is not None:
            # Decode via pydub when possible to support many codecs; fallback to raw bytes.
            audio_for_model = payload
            if AudioSegment is not None:
                try:
                    seg = AudioSegment.from_file(io.BytesIO(payload))
                    buf = io.BytesIO()
                    seg.export(buf, format="wav")
                    audio_for_model = buf.getvalue()
                except Exception:
                    audio_for_model = payload

            model_name = os.getenv("VERIDEX_WHISPER_MODEL", "base")
            model = whisper.load_model(model_name)
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as tmp:
                tmp.write(audio_for_model)
                tmp.flush()
                tx = model.transcribe(tmp.name)
            transcript = str(tx.get("text", "")).strip()
            if transcript:
                findings.append("Audio transcript extracted via Whisper.")
        elif enable_tx:
            findings.append("Audio transcription enabled but Whisper not installed.")
    except Exception as exc:
        findings.append(f"Transcription failed in current run ({exc}).")

    # Sentiment: try transformers, fallback heuristic.
    if transcript:
        if pipeline is not None and _safe_env_flag("VERIDEX_ENABLE_ML"):
            try:
                sent_pipe = pipeline("sentiment-analysis")
                out = sent_pipe(transcript[:4000])
                item = out[0] if isinstance(out, list) and out else {}
                sentiment = {
                    "label": str(item.get("label", "unknown")),
                    "confidence": float(item.get("score", 0.0)),
                }
            except Exception:
                sentiment = {"label": "unknown", "confidence": 0.0}
        else:
            lower = transcript.lower()
            pos = sum(lower.count(w) for w in ("great", "good", "excellent", "happy", "love"))
            neg = sum(lower.count(w) for w in ("bad", "terrible", "sad", "hate", "angry"))
            if pos > neg and pos > 0:
                sentiment = {"label": "positive", "confidence": _clip(0.5 + (pos / (pos + neg + 2.0)))}
            elif neg > pos and neg > 0:
                sentiment = {"label": "negative", "confidence": _clip(0.5 + (neg / (pos + neg + 2.0)))}
            else:
                sentiment = {"label": "neutral", "confidence": 0.5}

    return {
        "metadata": metadata,
        "transcript": transcript,
        "sentiment": sentiment,
        "forensic_findings": findings,
    }


def analyze_video_bytes(payload: bytes, filename: str) -> dict[str, Any]:
    """
    Phase 3 MVP: frame sampling via ffmpeg (if present) and reuse image forensics on sampled frames.
    """

    report: dict[str, Any] = {"filename": filename, "forensic_findings": [], "frames": [], "confidence": 0.5}
    with tempfile.TemporaryDirectory() as td:
        video_path = os.path.join(td, "input_video")
        with open(video_path, "wb") as f:
            f.write(payload)

        frame_pattern = os.path.join(td, "frame_%02d.jpg")
        cmd = [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            video_path,
            "-vf",
            "fps=1,scale=640:-1",
            "-frames:v",
            "3",
            frame_pattern,
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        except Exception:
            report["forensic_findings"].append(
                "ffmpeg unavailable; video deep analysis skipped (metadata-only MVP)."
            )
            return report

        frames = []
        for idx in range(1, 4):
            frame_path = os.path.join(td, f"frame_{idx:02d}.jpg")
            if not os.path.exists(frame_path):
                continue
            try:
                with open(frame_path, "rb") as f:
                    frame_bytes = f.read()
                frames.append(analyze_image_bytes(frame_bytes, filename=f"{filename}#frame{idx}"))
            except Exception:
                continue

        report["frames"] = frames
        if frames:
            report["confidence"] = round(
                _clip(sum(float(f.get("confidence", 0.5)) for f in frames) / len(frames)), 4
            )
            report["forensic_findings"].append(f"Extracted and analyzed {len(frames)} frames via ffmpeg sampling.")
        else:
            report["forensic_findings"].append("Frame extraction produced no analyzable frames.")
        return report


def compute_verity_index(
    origin_confidence: float,
    bias_neutrality_score: float,
    veracity_score: float,
    media_confidence: float = 0.5,
) -> float:
    score = (
        (origin_confidence * 0.3)
        + (bias_neutrality_score * 0.2)
        + (veracity_score * 0.35)
        + (media_confidence * 0.15)
    )
    return round(_clip(score), 4)


text_origin_detector = TransformerOriginDetector()
bias_detector = MultiDimensionalBiasDetector()
veracity_auditor = VeracityAuditor()
