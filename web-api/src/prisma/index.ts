import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function connect() {
    return prisma.$connect();
}