import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;

    const templates = await prisma.aiPromptTemplate.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: 'desc' }
    });

    // Provide default system templates if database is empty
    const defaults = [
      {
        id: 'p1',
        name: 'Summarize Investigation',
        description: 'Generates a condensed breakdown of facts.',
        promptText: 'Summarize the investigation findings and flag contradictions.',
        category: 'summarization',
      },
      {
        id: 'p2',
        name: 'Identify Contradictions',
        description: 'Locates missing evidence and discrepancies.',
        promptText: 'Find gaps in evidence items and point out logical discrepancies.',
        category: 'triage',
      },
      {
        id: 'p3',
        name: 'Draft Report Introduction',
        description: 'Drafts introductory sections for a case report.',
        promptText: 'Draft a professional introduction summary outlining the key evidence and results.',
        category: 'reporting',
      }
    ];

    return NextResponse.json({ templates: templates.length > 0 ? templates : defaults });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, promptText, category, userId } = await request.json();
    if (!name || !promptText) {
      return NextResponse.json({ error: 'Name and Prompt Text are required' }, { status: 400 });
    }

    const template = await prisma.aiPromptTemplate.create({
      data: { name, description, promptText, category, userId }
    });

    return NextResponse.json({ status: 'success', template });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
