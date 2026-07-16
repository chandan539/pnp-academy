const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const passwordHash = await bcrypt.hash('adminpassword123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'hi@pnppublication.com' },
    update: {},
    create: {
      email: 'hi@pnppublication.com',
      name: 'Super Admin',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  const salesManager = await prisma.user.upsert({
    where: { email: 'sales@pnpacademy.com' },
    update: {},
    create: {
      email: 'sales@pnpacademy.com',
      name: 'Sales Manager',
      password: passwordHash,
      role: 'SALES_MANAGER',
    },
  });

  console.log({ admin, salesManager });
  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
