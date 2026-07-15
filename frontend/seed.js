const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.authorApplication.create({
    data: {
      fullName: 'John Doe',
      mobileNumber: '+1234567890',
      emailId: 'john.doe@example.com',
      address: '123 Test St, Tech City',
      nomineeName: 'Jane Doe',
      relation: 'Spouse',
      holderName: 'John Doe',
      accountNumber: '1234567890',
      ifscCode: 'TEST0001234',
      status: 'Pending'
    }
  });
  console.log('Sample application created!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
