import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { authService } from "../services/auth";
import { transactionsService } from "../services/transactions";
import DashboardHeader from "../components/Dashboard/header";
import TransactionsList from "../components/TransactionList/TransactionsList";
import CreateTransactionModal from "../components/TransactionList/CreateTransactionModal";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsService.getTransactions,
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            Please log in to access the dashboard
          </p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Transactions
            </h2>
            <p className="text-gray-600">
              View and manage financial transactions
            </p>
          </div>
          {currentUser.role === "INPUTTER" && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
            >
              Create Transaction
            </button>
          )}
        </div>

        {/* Create Transaction Modal */}
        <CreateTransactionModal
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
        />

        {/* Transactions List */}
        <TransactionsList
          transactions={transactions}
          isLoading={isLoading}
          error={error}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
