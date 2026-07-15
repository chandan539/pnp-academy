import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const authorCount = await prisma.author.count();
  const authorId = `PNP-AUTH-${String(authorCount + 1).padStart(3, '0')}`;

  console.log('Creating author with ID:', authorId);

  const author = await prisma.author.create({
    data: {
      authorId,
      status: 'SUBMITTED',
      fullName: 'Johnathan Test Doe',
      emailId: 'johntest@example.com',
      mobileNumber: '+1 555 123 4567',
      address: '123 Fake Street',
      city: 'Test City',
      country: 'USA',
      nomineeName: 'Jane Test Doe',
      relation: 'Spouse',
      holderName: 'John Test Doe',
      accountNumber: '1234567890',
      ifscCode: 'TEST0001234',
      bankName: 'Test Bank',
      branch: 'Main Branch',
      termsAccepted: true,
      privacyAccepted: true
    }
  });

  console.log('Successfully created author:', author);

  const count = await prisma.author.count();
  console.log('Total authors in DB now:', count);

  process.exit(0);
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
