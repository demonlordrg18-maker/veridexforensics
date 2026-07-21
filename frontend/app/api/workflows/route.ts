import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const workflows = await prisma.automationWorkflow.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const defaults = [
      {
        id: 'w1',
        name: 'Auto-Audit Video Evidence',
        triggerType: 'EVIDENCE_UPLOADED',
        enabled: true,
        actions: ['Analyze Modality', 'Deduct Credits', 'Notify Supervisor'],
      },
      {
        id: 'w2',
        name: 'Academic Plagiarism Pre-check',
        triggerType: 'CASE_CREATED',
        enabled: false,
        actions: ['Scan PDF', 'Generate Report Draft'],
      },
    ];

    return NextResponse.json({ workflows: workflows.length > 0 ? workflows : defaults });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, triggerType, actions, enabled = true, userId = 'user_stub' } = body;

    if (!name || !triggerType) {
      return NextResponse.json({ error: 'Name and Trigger Type are required' }, { status: 400 });
    }

    const workflow = await prisma.automationWorkflow.create({
      data: {
        name,
        triggerType,
        actions: actions ? JSON.stringify(actions) : '[]',
        enabled,
        userId
      }
    });

    return NextResponse.json({ status: 'success', workflow });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
