// Stub Prisma client for build
// In production, connect to actual database

export const prisma = {
  case: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => ({ ...data, id: 'stub' }),
    update: async (data: any) => ({ ...data, id: 'stub' }),
    delete: async () => ({}),
    count: async () => 0,
  },
  evidence: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => ({ ...data, id: 'stub' }),
    update: async (data: any) => ({ ...data, id: 'stub' }),
    delete: async () => ({}),
    count: async () => 0,
  },
  report: {
    findMany: async () => [],
    count: async () => 0,
  },
  creditTransaction: {
    aggregate: async () => ({ _sum: { creditsUsed: 0 } }),
  },
  creditBalance: {
    findUnique: async () => ({ creditsRemaining: 50 }),
  },
  activityLog: {
    findMany: async () => [],
  },
  aiConversation: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => ({ ...data, id: 'stub-conv' }),
    update: async (data: any) => ({ ...data, id: 'stub-conv' }),
    delete: async () => ({}),
  },
  aiMessage: {
    findMany: async () => [],
    create: async (data: any) => ({ ...data, id: 'stub-msg' }),
  },
  aiPromptTemplate: {
    findMany: async () => [],
    create: async (data: any) => ({ ...data, id: 'stub-prompt' }),
  },
  automationWorkflow: {
    findMany: async () => [],
    create: async (data: any) => ({ ...data, id: 'stub-workflow' }),
    update: async (data: any) => ({ ...data, id: 'stub-workflow' }),
  },
  workflowRun: {
    findMany: async () => [],
    create: async (data: any) => ({ ...data, id: 'stub-run' }),
  },
  featureFlag: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => ({ ...data, id: 'stub-flag' }),
    update: async (data: any) => ({ ...data, id: 'stub-flag' }),
  },
  systemMetric: {
    findMany: async () => [],
    create: async (data: any) => ({ ...data, id: 'stub-metric' }),
  },
  tenantSetting: {
    findUnique: async () => null,
    upsert: async (data: any) => ({ ...data, id: 'stub-tenant' }),
  },
} as any;

