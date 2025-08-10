import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/transactions.dto';
import { Role, Transaction, TransactionStatus } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export interface TransactionWithUser extends Transaction {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
}

export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async create(
    createTransaction: CreateTransactionDto,
    userId: string,
  ): Promise<TransactionWithUser> {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...createTransaction,
        createdBy: userId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return transaction;
  }

  async approveTransaction(
    id: string,
    approverId: string,
  ): Promise<TransactionWithUser> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.status !== 'PENDING') {
      throw new BadRequestException(
        `Transaction cannot be approved with status ${transaction.status}`,
      );
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: {
        status: TransactionStatus.APPROVED,
        approvedBy: approverId,
        approvedAt: new Date(),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return updatedTransaction;
  }
}
