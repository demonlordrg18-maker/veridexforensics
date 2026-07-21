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
    findUnique: async () => ({ creditsRemaining: 0 }),
  },
  activityLog: {
    findMany: async () => [],
  },
} as any;
