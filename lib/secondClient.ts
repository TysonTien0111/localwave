import { PrismaClient as SecondClient } from "@/prisma/generated/second";

const db2 = new SecondClient();

export default db2;
