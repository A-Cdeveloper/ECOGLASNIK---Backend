import { DATABASE_URL } from "@/app/config";
import { PrismaClient } from "@prisma/client";

// ✅ Ensure DATABASE_URL is set before Prisma initializes
process.env.DATABASE_URL = DATABASE_URL;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// ✅ Reuse Prisma instance in development, use fresh instance in production
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
