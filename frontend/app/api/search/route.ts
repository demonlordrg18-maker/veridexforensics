import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';

  const mocks = [
    { id: 'c1', type: 'case', title: 'OSINT Case: Deepfake Proliferation', subtitle: 'Priority: High • Updated 2h ago' },
    { id: 'c2', type: 'case', title: 'Academic Research Verification', subtitle: 'Priority: Medium • Status: In Progress' },
    { id: 'e1', type: 'evidence', title: 'suspicious_audio_snippet.wav', subtitle: 'Modality: Audio • Size: 2.4MB' },
    { id: 'e2', type: 'evidence', title: 'report_redacted_v3.pdf', subtitle: 'Modality: PDF • Size: 1.1MB' },
    { id: 'r1', type: 'report', title: 'Forensic Audit Report: Deepfake Audio', subtitle: 'Verity Index: 0.12 • Truth Score: 12.5%' },
    { id: 'r2', type: 'report', title: 'Academic Plagiarism Run Logs', subtitle: 'Verity Index: 0.89 • Confidence: 99%' },
    { id: 'd1', type: 'doc', title: 'Metadata Extraction Methodology Guide', subtitle: 'Knowledge Base • 12 references' },
    { id: 'd2', type: 'doc', title: 'Veridex API Key Usage documentation', subtitle: 'Developer Resources • Auth guides' },
  ];

  const filtered = mocks.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(q.toLowerCase()) || item.subtitle.toLowerCase().includes(q.toLowerCase());
    const matchesType = type === 'all' || item.type === type;
    return matchesQuery && matchesType;
  });

  return NextResponse.json({ results: filtered });
}
