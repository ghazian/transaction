import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, expect, beforeEach, it } from "vitest";
import TransactionsTable from "./TransactionsTable";
import { mockTransactionsList } from "../../tests/mocks/mockTransactions";

vi.mock("../../services/transactions", () => ({
  transactionsService: {
    approveTransaction: vi.fn(),
  },
}));

// Mock the utils functions
vi.mock("../dashboard/utils", () => ({
  getRoleBadge: vi.fn((role: string) => `mocked-role-badge-${role}`),
  getStatusBadge: vi.fn((status: string) => `mocked-status-badge-${status}`),
}));

describe("TransactionsTable", () => {
  let queryClient: QueryClient;

  const mockCurrentUser = {
    role: "APPROVER",
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("renders transaction table", () => {
    renderWithProviders(
      <TransactionsTable
        transactions={mockTransactionsList.slice(0, 1)}
        currentUser={mockCurrentUser}
      />
    );

    expect(screen.getByText("Transaction")).toBeInTheDocument();
  });

  it("displays transaction data", () => {
    const testTransactions = mockTransactionsList.slice(0, 1);
    renderWithProviders(
      <TransactionsTable
        transactions={testTransactions}
        currentUser={mockCurrentUser}
      />
    );

    expect(screen.getByText("Office supplies purchase")).toBeInTheDocument();
    expect(screen.getByText("$1500.50")).toBeInTheDocument();
    expect(screen.getByText("John Inputter")).toBeInTheDocument();
  });
});
