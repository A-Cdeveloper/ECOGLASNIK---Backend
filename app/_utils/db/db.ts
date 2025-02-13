// src/prismaClient.ts
import { getDatabaseUrl } from "@/app/config";
import { PrismaClient } from "@prisma/client";

// Function to create Prisma Client based on a dynamic database URL
const prismaClientSingleton = (databaseUrl: string) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl, // Dynamically set DATABASE_URL
      },
    },
  });
};

// Declare the global object for development
declare const globalThis: {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Get the appropriate DATABASE_URL based on domain or environment
const databaseUrl = getDatabaseUrl();

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL is not set.");
}

// Use cached Prisma client in development or create a new one in production
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton(databaseUrl);

export default prisma;

// Cache the Prisma client instance globally in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
