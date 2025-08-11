import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingState, ErrorState, EmptyState } from "./TransactionStates";

describe("TransactionStates", () => {
  describe("LoadingState", () => {
    it("renders loading message", () => {
      render(<LoadingState />);
      expect(screen.getByText("Loading transactions...")).toBeInTheDocument();
    });
  });

  describe("ErrorState", () => {
    it("renders error message", () => {
      const errorMessage = "Network connection failed";
      render(<ErrorState message={errorMessage} />);
      expect(
        screen.getByText("Error loading transactions")
      ).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  describe("EmptyState", () => {
    it("renders empty state for INPUTTER role", () => {
      render(<EmptyState userRole="INPUTTER" />);
      expect(screen.getByText("No transactions found")).toBeInTheDocument();
    });

    it("renders empty state for APPROVER role", () => {
      render(<EmptyState userRole="APPROVER" />);
      expect(screen.getByText("No transactions found")).toBeInTheDocument();
    });
  });
});
