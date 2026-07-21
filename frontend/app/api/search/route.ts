import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';

    // 1. Database Queries
    const cases = await prisma.case.findMany({
      where: q ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      } : {},
      take: 10
    });

    const evidence = await prisma.evidence.findMany({
      where: q ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { modality: { contains: q, mode: 'insensitive' } }
        ]
      } : {},
      take: 10
    });

    const reports = await prisma.report.findMany({
      take: 10
    });

    // 2. Map results
    let results: any[] = [
      ...cases.map((c: any) => ({ id: c.id, type: 'case', title: c.title, subtitle: `Priority: ${c.priority} • Status: ${c.status}` })),
      ...evidence.map((e: any) => ({ id: e.id, type: 'evidence', title: e.title, subtitle: `Modality: ${e.modality} • Hash: ${e.fileHash.substring(0, 12)}...` })),
      ...reports.map((r: any) => ({ id: r.id, type: 'report', title: r.title, subtitle: `Verity Index: ${r.verityIndex} • Origin: ${r.origin}` }))
    ];

    // 3. Fallback mock list if database contains no matches or is using empty stubs
    if (results.length === 0) {
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

      results = mocks.filter((item) => {
        const matchesQuery = item.title.toLowerCase().includes(q.toLowerCase()) || item.subtitle.toLowerCase().includes(q.toLowerCase());
        const matchesType = type === 'all' || item.type === type;
        return matchesQuery && matchesType;
      });
    } else {
      // Filter by type if using db results
      if (type !== 'all') {
        results = results.filter(item => item.type === type);
      }
      if (q) {
        results = results.filter(item => item.title.toLowerCase().includes(q.toLowerCase()) || item.subtitle.toLowerCase().includes(q.toLowerCase()));
      }
    }

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
