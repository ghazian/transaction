import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3001";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "INPUTTER" | "APPROVER" | "AUDITOR";
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

class AuthService {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    const result = await response.json();
    return result;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(
        Array.isArray(error.message) ? error.message[0] : error.message
      );
    }

    return response.json();
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  setToken(token: string): void {
    localStorage.setItem("access_token", token);
    window.dispatchEvent(new Event("authStatusChanged"));
  }

  removeToken(): void {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("authStatusChanged"));
  }

  getCurrentUser(): AuthResponse["user"] | null {
    const userStr = localStorage.getItem("current_user");
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user: AuthResponse["user"]): void {
    localStorage.setItem("current_user", JSON.stringify(user));
    window.dispatchEvent(new Event("authStatusChanged"));
  }

  removeCurrentUser(): void {
    localStorage.removeItem("current_user");
    window.dispatchEvent(new Event("authStatusChanged"));
  }

  logout(queryClient: QueryClient): void {
    this.removeToken();
    this.removeCurrentUser();
    sessionStorage.clear();
    // Clear all query cache
    queryClient.clear();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
}

export const authService = new AuthService();
