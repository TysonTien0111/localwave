const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Vintage Tee', image: '/images/vintage.jpg', price: 24.99, sellerId: 1 },
      { name: 'Denim Jacket', image: '/images/denim.jpg', price: 79.99, sellerId: 2 },
      { name: 'Corduroy Pants', image: '/images/corduroy.jpg', price: 54.50, sellerId: 1 },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
