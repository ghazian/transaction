import type { FC } from "react";
import type { Transaction } from "../../services/transactions";
import TransactionsTable from "./TransactionsTable";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "./TransactionStates";

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  currentUser: {
    role: string;
  };
}

const TransactionsList: FC<TransactionsListProps> = ({
  transactions,
  isLoading,
  error,
  currentUser,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (Array.isArray(transactions) && transactions.length === 0) {
    return <EmptyState userRole={currentUser.role} />;
  }

  return (
    <TransactionsTable transactions={transactions} currentUser={currentUser} />
  );
};

export default TransactionsList;
