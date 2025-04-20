import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }
  const { name, image, price } = await req.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id), sellerId: session.user.id },
    data: { name, image, price: parseFloat(price) },
  });
  return Response.json(product);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return new Response("Unauthorized", { status: 401 });
  }
  await prisma.product.delete({
    where: { id: Number(params.id), sellerId: session.user.id },
  });
  return new Response(null, { status: 204 });
}
