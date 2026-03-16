from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any


_MOCK_EXTERNAL_CORPUS: tuple[dict[str, Any], ...] = (
    {
        "id": "pd_shakespeare_hamlet",
        "title": "Hamlet",
        "source": "Project Gutenberg",
        "license": "public_domain",
        "excerpt": "To be, or not to be, that is the question whether tis nobler in the mind to suffer.",
    },
    {
        "id": "pd_pride_prejudice",
        "title": "Pride and Prejudice",
        "source": "Project Gutenberg",
        "license": "public_domain",
        "excerpt": "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife.",
    },
    {
        "id": "pd_constitution",
        "title": "United States Constitution",
        "source": "National Archives",
        "license": "public_domain",
        "excerpt": "We the People of the United States in Order to form a more perfect Union establish Justice insure domestic Tranquility.",
    },
    {
        "id": "prop_marketing_copy",
        "title": "Commercial Product Launch Copy",
        "source": "Publisher Archive",
        "license": "proprietary",
        "excerpt": "Experience the future of productivity with our seamless premium workflow platform built for modern teams.",
    },
    {
        "id": "prop_news_feature",
        "title": "Exclusive Investigative Feature",
        "source": "News Syndicate",
        "license": "proprietary",
        "excerpt": "Sources familiar with the matter said the internal review uncovered repeated compliance failures across multiple regions.",
    },
)


def _tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", (text or "").lower())


def _shingles(tokens: list[str], size: int = 4) -> list[str]:
    if len(tokens) < size:
        return [" ".join(tokens)] if tokens else []
    return [" ".join(tokens[i : i + size]) for i in range(0, len(tokens) - size + 1)]


def _hash64(value: str) -> int:
    # Deterministic 64-bit hash from sha256.
    import hashlib

    digest = hashlib.sha256(value.encode("utf-8")).digest()
    return int.from_bytes(digest[:8], "big", signed=False)


def simhash64(text: str) -> int:
    """
    Lightweight text fingerprint suitable for fast similarity search.
    Not a cryptographic hash; designed for near-duplicate detection.
    """

    tokens = _tokenize(text)
    features = _shingles(tokens, size=4)
    if not features:
        return 0

    weights = [0] * 64
    for feat in features:
        h = _hash64(feat)
        for i in range(64):
            bit = (h >> i) & 1
            weights[i] += 1 if bit else -1

    fp = 0
    for i, w in enumerate(weights):
        if w > 0:
            fp |= 1 << i
    return fp


def hamming_distance64(a: int, b: int) -> int:
    return (a ^ b).bit_count()


@dataclass(frozen=True)
class CopyrightRisk:
    risk_score: float
    status: str
    nearest: list[dict]
    classification: str
    external_matches: list[dict]
    heuristics: dict[str, Any]
    analysis: str


def _jaccard_similarity(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def _mock_external_search(text: str, limit: int = 5) -> list[dict[str, Any]]:
    tokens = set(_tokenize(text))
    if not tokens:
        return []

    hits = []
    for record in _MOCK_EXTERNAL_CORPUS:
        excerpt_tokens = set(_tokenize(record["excerpt"]))
        similarity = _jaccard_similarity(tokens, excerpt_tokens)
        if similarity < 0.08:
            continue
        hits.append(
            {
                "id": record["id"],
                "title": record["title"],
                "source": record["source"],
                "license": record["license"],
                "similarity": round(similarity, 4),
                "match_excerpt": record["excerpt"],
            }
        )
    hits.sort(key=lambda item: item["similarity"], reverse=True)
    return hits[:limit]


def _classify_copyright_profile(text: str, external_matches: list[dict[str, Any]]) -> tuple[str, dict[str, Any]]:
    lowered = (text or "").lower()
    public_domain_hits = len(
        re.findall(r"\b(?:shakespeare|jane austen|project gutenberg|public domain|constitution|we the people)\b", lowered)
    )
    proprietary_hits = len(
        re.findall(
            r"\b(?:all rights reserved|copyright|exclusive|confidential|proprietary|licensed|syndicated)\b",
            lowered,
        )
    )
    public_matches = [m for m in external_matches if m.get("license") == "public_domain"]
    proprietary_matches = [m for m in external_matches if m.get("license") == "proprietary"]

    if proprietary_hits or (proprietary_matches and not public_matches):
        classification = "proprietary"
    elif public_domain_hits or public_matches:
        classification = "public_domain"
    else:
        classification = "original_or_unknown"

    heuristics = {
        "public_domain_term_hits": public_domain_hits,
        "proprietary_term_hits": proprietary_hits,
        "public_domain_matches": len(public_matches),
        "proprietary_matches": len(proprietary_matches),
    }
    return classification, heuristics


def assess_copyright_risk(text: str, *, search_fn, max_neighbors: int = 5) -> CopyrightRisk:
    """
    `search_fn(fp:int)->list[dict(id, distance)]` returns nearest fingerprints.
    """

    fp = simhash64(text)
    hits = search_fn(fp) if fp else []
    nearest = []
    for h in hits[:max_neighbors]:
        dist = int(h.get("distance", 64))
        sim = max(0.0, 1.0 - (dist / 64.0))
        nearest.append({"id": h.get("id"), "distance": dist, "similarity": round(sim, 4)})

    external_matches = _mock_external_search(text, limit=max_neighbors)
    classification, heuristics = _classify_copyright_profile(text, external_matches)

    # Risk heuristic: combine local near-duplicate similarity with mock web-search overlap.
    best_sim = max((n["similarity"] for n in nearest), default=0.0)
    best_external = max((m["similarity"] for m in external_matches), default=0.0)
    risk = max(0.0, (best_sim - 0.65) / 0.35)
    risk = max(risk, max(0.0, (best_external - 0.18) / 0.42))

    if classification == "public_domain":
        risk *= 0.45
    elif classification == "proprietary":
        risk = min(1.0, risk + 0.18)

    risk_score = round(min(1.0, risk), 4)
    if risk_score > 0.85:
        status = "Critical citation overlap"
        analysis = "Strong lexical match to protected material. High probability of redistribution risk; review for fair use compliance."
    elif risk_score > 0.6:
        status = "Significant similarity detected"
        analysis = "Extended phrases match known proprietary corpora. Content may require attribution or represent a derivative work risk."
    elif risk_score > 0.3:
        status = "Moderate overlap detected"
        analysis = "Partial overlap with existing records found. Common industry phrasing or template usage likely."
    else:
        status = "Low redistribution risk"
        analysis = "No significant lexical overlap found in the sampling corpus. Content appears to have a unique or low-risk profile."

    return CopyrightRisk(
        risk_score=risk_score,
        status=status,
        nearest=nearest,
        classification=classification,
        external_matches=external_matches,
        heuristics=heuristics,
        analysis=analysis,
    )
