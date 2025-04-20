// This script deletes all Product records whose sellerId does not match any existing User.
// Run it with: node prisma/cleanupOrphanedProducts.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Get all valid user IDs
  const users = await prisma.user.findMany({ select: { id: true } });
  const validUserIds = new Set(users.map(u => u.id));

  // Find all products with invalid sellerId
  const orphanedProducts = await prisma.product.findMany({
    where: {
      sellerId: { notIn: Array.from(validUserIds) },
    },
  });

  if (orphanedProducts.length === 0) {
    console.log('No orphaned products found.');
    return;
  }

  // Delete orphaned products
  const deleted = await prisma.product.deleteMany({
    where: {
      sellerId: { notIn: Array.from(validUserIds) },
    },
  });

  console.log(`Deleted ${deleted.count} orphaned products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
