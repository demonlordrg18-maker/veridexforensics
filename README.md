# Veritas Forensics (Veridex)

Roadmap-aligned MVP for **AI Content Authenticity & Bias Auditor** based on the attached PRD and walkthrough.

## What is now completed

- FastAPI backend foundation with modular forensic analyzers.
- Multi-modal audit APIs:
  - Text (`/audit/text`)
  - Document (`/audit/document` for `.txt`, `.md`, optional `.pdf`/`.docx`)
  - Image (`/audit/image` with EXIF + basic forensic signals)
  - Audio (`/audit/audio` metadata-first forensic pass)
- Legacy compatibility endpoints preserved:
  - `/analyze/text`, `/analyze/bias`, `/analyze/factuality`, `/analyze/image`, `/analyze/audio`
- Verity Index scoring layer (origin + neutrality + factuality + media confidence).
- Forensic traceability:
  - SHA-256 hashes for uploaded artifacts
  - Persistent audit log in SQLite (`backend/veridex.db`)
  - Retrieval APIs: `/audits`, `/audits/{audit_id}`
- Next.js 15 dashboard scaffold (`frontend/`) with Tailwind, Framer Motion dependency, Recharts visualization, and live call to `/audit/text`.
- Test coverage for health, audit flow, list/get, and backward compatibility.

## Project structure

- `backend/main.py`: API app and endpoints.
- `backend/core/detectors.py`: detection logic and verity computation.
- `backend/models/audit_store.py`: SQLite persistence.
- `frontend/`: dashboard scaffold.
- `test_detector.py`: API tests.

## Run backend

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### Enable Phase 2/3 “intelligence” (optional)

The project runs fully offline with deterministic heuristics by default. To enable transformer-based detectors and richer audio/video forensics:

```bash
pip install -r backend/requirements-ml.txt
```

Then set:

- `VERIDEX_ENABLE_ML=1` to enable HF pipelines (text stylometry + multi-dimensional bias via zero-shot)
- `VERIDEX_TEXT_DETECTOR_MODEL` (default: `roberta-base-openai-detector`)
- `VERIDEX_BIAS_ZEROSHOT_MODEL` (default: `typeform/distilbert-base-uncased-mnli`)

### Enable live fact-check (optional)

- `VERIDEX_ENABLE_LIVE_FACTCHECK=1`
- `GOOGLE_FACTCHECK_API_KEY=...` (Google Fact Check Tools API)

### Enterprise / compliance features (optional)

- `VERIDEX_API_KEY=...` to protect enterprise endpoints with `X-API-Key`
- `VERIDEX_ENABLE_LEDGER=1` to enable append-only transparency ledger

Health check:

```bash
curl http://localhost:8000/health
```

## Run frontend dashboard

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run tests

```bash
python -m pytest -q test_detector.py
```

## Roadmap status mapping (from PRD/walkthrough)

- Phase 1 (Foundation): Completed in this repo.
- Phase 2 (Core analyzers): Text, bias, claim extraction, factuality scoring completed as MVP heuristics with extension points for model-backed inference.
- Phase 3 (Multi-modal expansion): Image/audio endpoints and forensic metadata completed as MVP.
- Phase 4 (Traceability/compliance): Audit logging + hash trace completed; external RAG/source APIs intentionally left as pluggable placeholders.

## Notes

- In constrained/offline environments, detectors run deterministic heuristics instead of large model downloads.
- Video auditing uses `ffmpeg` if available on the host/container for frame sampling.
## Frontend analytics and SEO env vars

Set these in your production frontend environment before deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://veridex.ai
NEXT_PUBLIC_API_BASE_URL=https://api.veridex.ai
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-site-verification-token
NEXT_PUBLIC_BING_SITE_VERIFICATION=bing-site-verification-token
```

Notes:
- `NEXT_PUBLIC_GA_ID`: your Google Analytics 4 Measurement ID.
- `NEXT_PUBLIC_CLARITY_ID`: your Microsoft Clarity project ID.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: the verification token from Google Search Console.
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`: the verification token from Bing Webmaster Tools / Microsoft.
- `NEXT_PUBLIC_SITE_URL`: the canonical public site URL used in metadata.
- `NEXT_PUBLIC_API_BASE_URL`: the public backend base URL used by the demo form and audit UI.
