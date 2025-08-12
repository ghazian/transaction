import { authService } from "./auth";

const API_BASE_URL = "http://localhost:3001";

export interface Transaction {
  id: string;
  amount: number | string; // Can be string when coming from backend (Prisma Decimal)
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdBy: string;
  approvedBy?: string | null;
  approvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface CreateTransactionRequest {
  amount: number | string;
  description: string;
}

export interface ApproveTransactionRequest {
  comment?: string;
}

class TransactionsService {
  async getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "GET",
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    const transactions = await response.json();
    return transactions;
  }

  async createTransaction(
    data: CreateTransactionRequest
  ): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    const transaction = await response.json();
    return transaction;
  }

  async approveTransaction(
    id: string,
    data?: ApproveTransactionRequest
  ): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}/approve`, {
      method: "POST",
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(data || {}),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    const transaction = await response.json();
    return transaction;
  }
}

export const transactionsService = new TransactionsService();
