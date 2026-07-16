const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.updateMany({
    where: { email: 'admin@pnpacademy.com' },
    data: { email: 'hi@pnppublication.com' },
  });
  console.log('Admin email updated successfully');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
