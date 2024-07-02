import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

/**docs:
 * The globalThis object that contains the PrismaClient instance.
 * This code used to prevent multiple instances of PrismaClient in development mode.
 */
declare const globalThis: {
  prisma: PrismaClient;
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }

  prisma = globalThis.prisma;
}

export default prisma;
