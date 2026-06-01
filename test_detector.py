from fastapi.testclient import TestClient

from backend.core.copyright import assess_copyright_risk
from backend.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"


def test_audit_text() -> None:
    response = client.post(
        "/audit/text",
        json={
            "content": (
                "Apollo 11 landed on the Moon in 1969. "
                "Neil Armstrong and Buzz Aldrin walked on the lunar surface."
            ),
            "include_metadata": True,
        },
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["origin"] in {"human", "ai", "unknown"}
    assert 0.0 <= payload["verity_index"] <= 1.0
    assert "bias_report" in payload
    assert "factuality_report" in payload
    assert payload["factuality_report"]["claims"]
    claim_veracity = payload["factuality_report"]["claims"][0]["veracity"]
    assert "verification_status" in claim_veracity
    assert "sources" in claim_veracity
    assert "evidence_summary" in claim_veracity
    assert "copyright_risk" in payload
    assert "classification" in payload["copyright_risk"]
    assert "external_matches" in payload["copyright_risk"]
    assert payload["id"].startswith("veridex_text_")


def test_backward_compat_analyze_text() -> None:
    response = client.post("/analyze/text", json={"content": "Simple neutral sentence.", "include_metadata": False})
    assert response.status_code == 200
    payload = response.json()
    assert "origin" in payload
    assert "truth_score" in payload


def test_audit_list_and_get() -> None:
    create = client.post("/audit/text", json={"content": "A sample claim with 42 percent data.", "include_metadata": True})
    assert create.status_code == 200
    created = create.json()

    listed = client.get("/audits?limit=5")
    assert listed.status_code == 200
    items = listed.json()["items"]
    assert any(item["id"] == created["id"] for item in items)

    fetched = client.get(f"/audits/{created['id']}")
    assert fetched.status_code == 200
    assert fetched.json()["id"] == created["id"]
    assert "copyright_risk" in fetched.json()


def test_copyright_risk_detects_public_domain_match() -> None:
    text = "To be, or not to be, that is the question whether tis nobler in the mind to suffer."
    report = assess_copyright_risk(text, search_fn=lambda _: [])
    assert report.classification == "public_domain"
    assert report.external_matches
    assert report.external_matches[0]["license"] == "public_domain"


def test_copyright_risk_increases_for_duplicate_proprietary_text() -> None:
    text = "Experience the future of productivity with our seamless premium workflow platform built for modern teams."
    report = assess_copyright_risk(
        text,
        search_fn=lambda _: [{"id": "prior_artifact", "distance": 1}],
    )
    assert report.classification == "proprietary"
    assert report.risk_score > 0.7


def test_homoglyphs_detection() -> None:
    text_with_homoglyph = "We h\u0430ve a special announcement for the team."
    response = client.post("/audit/text", json={"content": text_with_homoglyph, "include_metadata": True})
    assert response.status_code == 200
    payload = response.json()
    assert payload["origin"] == "ai"
    assert payload["verity_index"] < 0.55
    assert any("homoglyphs" in r for r in payload["reasons"])
    assert any("homoglyphs" in f.lower() for f in payload["findings"])


def test_invisible_chars_detection() -> None:
    text_with_zwsp = "It is imp\u200bortant to follow instructions."
    response = client.post("/audit/text", json={"content": text_with_zwsp, "include_metadata": True})
    assert response.status_code == 200
    payload = response.json()
    assert payload["origin"] == "ai"
    assert payload["verity_index"] < 0.55
    assert any("invisible" in r or "zero-width" in r for r in payload["reasons"])
    assert any("invisible" in f.lower() or "zero-width" in f.lower() for f in payload["findings"])


def test_artificial_cadence_bimodal_detection() -> None:
    text = (
        "Short sentence one. "
        "This is a very long sentence that has more than twenty words inside it to trigger the alternating short-long sentence cadence detection. "
        "Short sentence two. "
        "Here is another extremely long sentence containing multiple clauses and detailed descriptions to ensure we exceed the twenty word threshold. "
        "Short sentence three. "
        "And another long sentence that is structured specifically to alternate with the shorter sentences and trigger the cadence flags."
    )
    response = client.post("/audit/text", json={"content": text, "include_metadata": True})
    assert response.status_code == 200
    payload = response.json()
    assert any("cadence" in r or "bimodal" in r for r in payload["reasons"])

