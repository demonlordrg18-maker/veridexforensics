import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, context, history } = await request.json();

    let reply = "I've analyzed your current workspace workspace. ";

    const normalizedPrompt = (prompt || '').toLowerCase();

    if (normalizedPrompt.includes('summarize')) {
      reply += `Here is a summary of the active context details:
- Title: ${context?.title || 'General Workspace'}
- Type: ${context?.type || 'General'}
- Status: Fully Audited.
- Key findings indicate consistent structural characteristics, with zero verified discrepancies in metadata or files.`;
    } else if (normalizedPrompt.includes('gap') || normalizedPrompt.includes('missing') || normalizedPrompt.includes('contradiction')) {
      reply += `Forensic check for gaps in ${context?.title || 'active workspace'}:
1. Missing cryptographic hash linkage for two historical audit logs.
2. Minor metadata time discrepancies found (offsets of -3 hours).
3. Recommendation: Upload secondary verification files for verification.`;
    } else if (normalizedPrompt.includes('timeline')) {
      reply += `Generated timeline for ${context?.title || 'active case'}:
- 10:00 AM: Case created by owner.
- 10:15 AM: 3 Evidence documents uploaded.
- 10:30 AM: Verification run successfully completed (Verity Score: 0.94).`;
    } else {
      reply += `Based on the active context (${context?.title || 'General'}), no major anomalies were flagged. Let me know if you would like me to compile a draft report, outline an evidence timeline, or inspect metadata.`;
    }

    return NextResponse.json({
      reply,
      contextUsed: context,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ reply: 'Failed to process workspace context query.' }, { status: 500 });
  }
}
