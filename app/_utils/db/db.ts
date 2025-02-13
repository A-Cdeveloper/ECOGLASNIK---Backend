import { DATABASE_URL } from "@/app/config";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

process.env.DATABASE_URL = DATABASE_URL; // Set DATABASE_URL before Prisma initializes

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
