require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.adminUser.upsert({
    where: { email: 'admin@pnpacademy.com' },
    update: {},
    create: {
      email: 'admin@pnpacademy.com',
      password: 'admin'
    }
  });
  console.log('Admin seeded');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
