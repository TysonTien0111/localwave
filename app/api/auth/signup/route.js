import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    // Only allow seller role
    const role = "seller";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });
    return new Response(JSON.stringify({ user: { id: user.id, email: user.email, role: user.role } }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Email already in use or invalid data." }), { status: 400 });
  }
}
