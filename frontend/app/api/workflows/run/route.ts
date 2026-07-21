import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { workflowId, triggerData = {} } = await request.json();

    if (!workflowId) {
      return NextResponse.json({ error: 'workflowId is required' }, { status: 400 });
    }

    const run = await prisma.workflowRun.create({
      data: {
        workflowId,
        status: 'RUNNING',
        triggerData: JSON.stringify(triggerData),
      }
    });

    // Simulate steps execution
    const steps = [
      `[Trigger] Workflow initialized via event data.`,
      `[Execution] Executing pipeline tasks...`,
      `[Complete] Pipeline executed successfully.`
    ];

    await prisma.workflowRun.create({
      data: {
        id: run.id,
        workflowId,
        status: 'COMPLETED',
        triggerData: JSON.stringify(triggerData),
        logs: JSON.stringify(steps),
        completedAt: new Date(),
      }
    });

    return NextResponse.json({
      status: 'success',
      runId: run.id,
      logs: steps
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
