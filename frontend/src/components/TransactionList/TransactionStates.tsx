import type { FC } from "react";

const LoadingState: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading transactions...</p>
    </div>
  );
};

const ErrorState: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <svg
        className="w-12 h-12 text-red-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-red-600 font-medium">Error loading transactions</p>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  );
};

const EmptyState: FC<{ userRole: string }> = ({ userRole }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <svg
        className="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No transactions found
      </h3>
      <p className="text-gray-600">
        {userRole === "INPUTTER"
          ? "Get started by creating your first transaction"
          : "No transactions have been created yet"}
      </p>
    </div>
  );
};

export { LoadingState, ErrorState, EmptyState };
