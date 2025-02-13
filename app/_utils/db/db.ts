import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = (databaseUrl: string) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl, // Dynamically set DATABASE_URL
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const databaseUrl = process.env.DATABASE_URL ?? ""; // Get DATABASE_URL dynamically

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is not set.");
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton(databaseUrl);

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
