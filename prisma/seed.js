const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  // Clean up existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create only sellers
  const passwordHash = await bcrypt.hash('password123', 10);
  const seller1 = await prisma.user.create({
    data: {
      email: 'seller1@example.com',
      password: passwordHash,
      role: 'seller',
    },
  });
  const seller2 = await prisma.user.create({
    data: {
      email: 'seller2@example.com',
      password: passwordHash,
      role: 'seller',
    },
  });

  // Create products with valid sellerId
  await prisma.product.createMany({
    data: [
      { name: 'Vintage Tee', image: '/images/vintage.jpg', price: 24.99, sellerId: seller1.id },
      { name: 'Denim Jacket', image: '/images/denim.jpg', price: 79.99, sellerId: seller2.id },
      { name: 'Corduroy Pants', image: '/images/corduroy.jpg', price: 54.50, sellerId: seller1.id },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
