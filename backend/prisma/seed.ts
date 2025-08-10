import { PrismaClient, Role, TransactionStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Hash password for demo users
  const plainPassword = 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Create users with different roles
  const inputter = await prisma.user.upsert({
    where: { email: 'inputter@example.com' },
    update: {},
    create: {
      email: 'inputter@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Inputter',
      role: Role.INPUTTER,
    },
  });

  const approver = await prisma.user.upsert({
    where: { email: 'approver@example.com' },
    update: {},
    create: {
      email: 'approver@example.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Approver',
      role: Role.APPROVER,
    },
  });

  const auditor = await prisma.user.upsert({
    where: { email: 'auditor@example.com' },
    update: {},
    create: {
      email: 'auditor@example.com',
      password: hashedPassword,
      firstName: 'Mike',
      lastName: 'Auditor',
      role: Role.AUDITOR,
    },
  });

  console.log('👥 Created users:', {
    inputter: inputter.email,
    approver: approver.email,
    auditor: auditor.email,
  });

  const transactions = [
    {
      amount: 1500.5,
      description: 'Office supplies purchase',
      status: TransactionStatus.PENDING,
      createdBy: inputter.id,
    },
    {
      amount: 2750,
      description: 'Marketing campaign budget',
      status: TransactionStatus.PENDING,
      createdBy: inputter.id,
    },
    {
      amount: 450.25,
      description: 'Software license renewal',
      status: TransactionStatus.APPROVED,
      createdBy: inputter.id,
      approvedBy: approver.id,
      approvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Approved yesterday
    },
    {
      amount: 8900,
      description: 'Equipment purchase',
      status: TransactionStatus.APPROVED,
      createdBy: inputter.id,
      approvedBy: approver.id,
      approvedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // Approved 2 days ago
    },
    {
      amount: 325.75,
      description: 'Travel expenses',
      status: TransactionStatus.REJECTED,
      createdBy: inputter.id,
    },
    {
      amount: 5200,
      description: 'Consulting services',
      status: TransactionStatus.PENDING,
      createdBy: inputter.id,
    },
  ];

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  console.log('💰 Created sample transactions:', transactions.length);
  console.log('✅ Database seeding completed successfully!');
  console.log('📋 Demo Login Credentials:');
  console.log('Inputter: inputter@example.com / password123');
  console.log('Approver: approver@example.com / password123');
  console.log('Auditor: auditor@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(() => {});
