import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Transaction Management System
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Secure role-based transaction processing with approval workflows
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Inputter</h3>
          <p className="text-gray-600">Create and submit new transactions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Approver</h3>
          <p className="text-gray-600">
            Review and approve pending transactions
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Auditor</h3>
          <p className="text-gray-600">View and audit all transactions</p>
        </div>
      </div>
    </div>
  );
}
