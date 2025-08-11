import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    transaction: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const mockTransactions = [
        {
          id: '1',
          amount: 100,
          description: 'Test',
          status: 'PENDING',
          user: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@test.com',
            role: 'INPUTTER',
          },
        },
      ];

      mockPrismaService.transaction.findMany.mockResolvedValue(
        mockTransactions,
      );

      const result = await service.findAll();
      expect(result).toEqual(mockTransactions);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('create', () => {
    it('should create a new transaction', async () => {
      const createDto = { amount: 100, description: 'Test transaction' };
      const userId = 'user-123';
      const mockTransaction = {
        id: '1',
        ...createDto,
        createdBy: userId,
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'INPUTTER',
        },
      };

      mockPrismaService.transaction.create.mockResolvedValue(mockTransaction);

      const result = await service.create(createDto, userId);
      expect(result).toEqual(mockTransaction);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(prismaService.transaction.create).toHaveBeenCalledWith({
        data: { ...createDto, createdBy: userId },
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
    });
  });

  describe('approveTransaction', () => {
    it('should approve a pending transaction', async () => {
      const transactionId = '1';
      const approverId = 'approver-123';
      const mockTransaction = {
        id: transactionId,
        status: 'PENDING',
      };
      const updatedTransaction = {
        ...mockTransaction,
        status: TransactionStatus.APPROVED,
        approvedBy: approverId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        approvedAt: expect.any(Date),
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'INPUTTER',
        },
      };

      mockPrismaService.transaction.findUnique.mockResolvedValue(
        mockTransaction,
      );
      mockPrismaService.transaction.update.mockResolvedValue(
        updatedTransaction,
      );

      const result = await service.approveTransaction(
        transactionId,
        approverId,
      );
      expect(result).toEqual(updatedTransaction);
    });

    it('should throw NotFoundException when transaction not found', async () => {
      mockPrismaService.transaction.findUnique.mockResolvedValue(null);

      await expect(
        service.approveTransaction('1', 'approver-123'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when transaction is not pending', async () => {
      const mockTransaction = {
        id: '1',
        status: 'APPROVED',
      };

      mockPrismaService.transaction.findUnique.mockResolvedValue(
        mockTransaction,
      );

      await expect(
        service.approveTransaction('1', 'approver-123'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
