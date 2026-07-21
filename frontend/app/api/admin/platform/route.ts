import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'all';

    if (action === 'metrics') {
      const dbMetrics = await prisma.systemMetric.findMany({
        take: 20,
        orderBy: { timestamp: 'desc' }
      });
      return NextResponse.json({ metrics: dbMetrics });
    }

    if (action === 'flags') {
      const flags = await prisma.featureFlag.findMany();
      return NextResponse.json({ flags });
    }

    // Default: return metrics summary, flags, and active tenant settings
    const flags = await prisma.featureFlag.findMany();
    const defaults = [
      { key: 'flag-ai-summarizer-beta', description: 'Enable Next-gen GPT-4o hybrid extraction models.', enabled: true },
      { key: 'flag-academic-modality-academic', description: 'Show university-specific plagiarism controls.', enabled: true },
      { key: 'flag-legal-discovery-indexing', description: 'Automatic indexing for legal metadata scans.', enabled: false },
      { key: 'flag-government-multitenant-isolation', description: 'Enforce separate high-security workspace sandboxes.', enabled: true },
    ];

    const actualFlags = flags.length > 0 ? flags : defaults;

    const mockMetrics = [
      { label: 'System Health', value: '99.98% uptime', status: 'normal' },
      { label: 'Avg API Latency', value: '42ms', status: 'normal' },
      { label: 'AI Token Load', value: '1.2M tokens / hr', status: 'normal' },
      { label: 'Queue Backlog', value: '3 items', status: 'normal' },
      { label: 'Storage Used', value: '4.8TB / 10TB', status: 'warning' },
    ];

    return NextResponse.json({
      flags: actualFlags,
      metrics: mockMetrics,
      tenant: {
        isolationLevel: 'High Sandbox',
        retentionDays: 365,
        complianceScope: 'GDPR / SOC-2 Ready',
        rtlSupport: true
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, key, enabled, orgId, industry, locale, retentionDays } = body;

    if (action === 'toggle-flag') {
      if (!key) return NextResponse.json({ error: 'Key is required' }, { status: 400 });
      const flag = await prisma.featureFlag.upsert({
        where: { key },
        update: { enabled },
        create: { key, enabled }
      });
      return NextResponse.json({ status: 'success', flag });
    }

    if (action === 'update-tenant') {
      if (!orgId) return NextResponse.json({ error: 'orgId is required' }, { status: 400 });
      const tenant = await prisma.tenantSetting.upsert({
        where: { orgId },
        update: { industry, locale, retentionDays },
        create: { orgId, industry, locale, retentionDays }
      });
      return NextResponse.json({ status: 'success', tenant });
    }

    if (action === 'log-metric') {
      const { metricType, value, dimensions } = body;
      const metric = await prisma.systemMetric.create({
        data: {
          metricType,
          value,
          dimensions: dimensions ? JSON.stringify(dimensions) : null
        }
      });
      return NextResponse.json({ status: 'success', metric });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
