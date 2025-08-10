const API_BASE_URL = "http://localhost:3001";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
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
  amount: number;
  description: string;
}

export interface ApproveTransactionRequest {
  comment?: string;
}

class TransactionsService {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth_token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getTransactions(): Promise<Transaction[]> {
    const token = localStorage.getItem("auth_token");
    console.log(
      "Making request with token:",
      token ? "Token present" : "No token"
    );

    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: this.getAuthHeaders(),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.log("Error response:", error);
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    const data = await response.json();
    console.log("Transactions data:", data);
    return data;
  }

  async createTransaction(
    data: CreateTransactionRequest
  ): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    return response.json();
  }

  async approveTransaction(
    id: string,
    data?: ApproveTransactionRequest
  ): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}/approve`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data || {}),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    return response.json();
  }
}

export const transactionsService = new TransactionsService();
