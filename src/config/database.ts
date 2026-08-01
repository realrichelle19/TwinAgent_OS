import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('[Database] Connected to PostgreSQL via Prisma');
  } catch (error) {
    console.error('[Database] Connection failed:', error);
    process.exit(1);
  }
}
