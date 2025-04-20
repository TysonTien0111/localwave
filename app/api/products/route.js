import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }
  const products = await prisma.product.findMany({
    where: { sellerId: session.user.id },
    orderBy: { id: "desc" },
  });
  return Response.json(products);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }
  const { name, image, price } = await req.json();
  const product = await prisma.product.create({
    data: {
      name,
      image: image && image.trim() !== "" ? image : null, // Use null if blank
      price: parseFloat(price),
      sellerId: session.user.id,
    },
  });
  return Response.json(product);
}
