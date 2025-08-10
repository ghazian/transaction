import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionStatus, Role } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Transaction amount in decimal format',
    example: 1500.5,
    minimum: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Office supplies purchase',
    minLength: 1,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ApproveTransactionDto {
  @ApiPropertyOptional({
    description: 'Optional approval comment',
    example: 'Approved by manager for Q1 budget',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Transaction unique identifier',
    example: 'clm4x2y1z0001abcd5678efgh',
  })
  id: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 1500.5,
  })
  amount: number;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Office supplies purchase',
  })
  description: string;

  @ApiProperty({
    description: 'Transaction status',
    enum: TransactionStatus,
    example: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @ApiProperty({
    description: 'User who created the transaction',
    example: 'clm4x2y1z0000abcd1234efgh',
  })
  createdBy: string;

  @ApiPropertyOptional({
    description: 'User who approved the transaction',
    example: 'clm4x2y1z0000abcd1234efgi',
  })
  approvedBy?: string;

  @ApiPropertyOptional({
    description: 'Transaction approval timestamp',
    example: '2024-01-15T14:30:00Z',
  })
  approvedAt?: Date;

  @ApiProperty({
    description: 'Transaction creation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Transaction last update timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Creator user details',
    type: 'object',
    properties: {
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      email: { type: 'string', example: 'john.doe@example.com' },
      role: { enum: Role, example: Role.INPUTTER },
    },
  })
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
}

export class TransactionListResponseDto {
  @ApiProperty({
    description: 'List of transactions',
    type: [TransactionResponseDto],
  })
  transactions: TransactionResponseDto[];

  @ApiProperty({
    description: 'Total count of transactions',
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number (1-based)',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;
}
