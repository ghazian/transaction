import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transactions.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @Roles(Role.INPUTTER)
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @Get()
  @Roles(Role.AUDITOR, Role.APPROVER, Role.INPUTTER)
  async findAll() {
    return this.transactionsService.findAll();
  }

  @Post(':id/approve')
  @Roles(Role.APPROVER)
  async approve(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.transactionsService.approveTransaction(id, req.user.id);
  }
}
