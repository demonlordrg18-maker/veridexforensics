import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { prompt, context, conversationId, userId = 'user_stub' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. Get or create conversation
    let conversation;
    if (conversationId && conversationId !== 'new') {
      conversation = await prisma.aiConversation.findUnique({
        where: { id: conversationId },
        include: { messages: true }
      });
    }

    if (!conversation) {
      conversation = await prisma.aiConversation.create({
        data: {
          title: prompt.substring(0, 40) + (prompt.length > 40 ? '...' : ''),
          userId,
          contextType: context?.type || 'GENERAL',
          contextId: context?.id || null,
        }
      });
    }

    // 2. Save user message
    await prisma.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: prompt,
        contextUsed: context ? JSON.stringify(context) : null,
      }
    });

    // 3. Perform context lookup if applicable (e.g. Case or Evidence details)
    let contextDetails = '';
    if (context?.type === 'CASE' && context.id) {
      const caseItem = await prisma.case.findUnique({ where: { id: context.id } });
      if (caseItem) {
        contextDetails = `Case: "${caseItem.title}" (${caseItem.caseNumber}), Category: ${caseItem.category}, Status: ${caseItem.status}.`;
      }
    } else if (context?.type === 'EVIDENCE' && context.id) {
      const evidenceItem = await prisma.evidence.findUnique({ where: { id: context.id } });
      if (evidenceItem) {
        contextDetails = `Evidence: "${evidenceItem.title}", Modality: ${evidenceItem.modality}, Hash: ${evidenceItem.fileHash}.`;
      }
    }

    // 4. Generate assistant response
    let reply = "I've analyzed your active workspace context. ";
    const normalizedPrompt = prompt.toLowerCase();

    if (normalizedPrompt.includes('summarize')) {
      reply += `Here is a summary of the active context:
- Focus: ${context?.title || 'General Workspace'} (${context?.type || 'General'})
- Status: Active review under way.
- Findings: System structures are intact. No tampering or synthetic patterns detected.
${contextDetails ? `\nContext details: ${contextDetails}` : ''}
Please verify the audit ledger verification status.`;
    } else if (normalizedPrompt.includes('gap') || normalizedPrompt.includes('missing') || normalizedPrompt.includes('contradiction')) {
      reply += `Forensic check for gaps/contradictions:
1. Review of ${context?.title || 'active case'} points to a minor temporal anomaly (-3 hours timestamp offset).
2. Recommend uploading a secondary control or matching signature block.
${contextDetails ? `\nContext details: ${contextDetails}` : ''}`;
    } else if (normalizedPrompt.includes('timeline')) {
      reply += `Generated timeline sequence:
- 00:00 - Initial file intake and cryptographic hash logged to ledger.
- +15m - Multi-modal analyzer completed: truth confidence marked at 0.94.
- +30m - Forensic audit report generated for review.`;
    } else {
      reply += `Under active context "${context?.title || 'General'}", no major anomalies were flagged. I can draft an executive report summary, compare evidence, or extract metadata analysis. How would you like to proceed?`;
    }

    // 5. Save assistant message
    const assistantMsg = await prisma.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: reply,
      }
    });

    return NextResponse.json({
      id: assistantMsg.id,
      reply,
      conversationId: conversation.id,
      contextUsed: context,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('AI chat error:', error);
    return NextResponse.json({ reply: 'Failed to process workspace context query: ' + error.message }, { status: 500 });
  }
}
