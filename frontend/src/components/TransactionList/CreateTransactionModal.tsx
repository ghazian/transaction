import type { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { transactionsService } from "../../services/transactions";
import type { CreateTransactionRequest } from "../../services/transactions";

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTransactionModal: FC<CreateTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [newTransaction, setNewTransaction] =
    useState<CreateTransactionRequest>({
      amount: "",
      description: "",
    });

  const createMutation = useMutation({
    mutationFn: transactionsService.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onClose();
      setNewTransaction({ amount: 0, description: "" });
    },
  });

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newTransaction);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleClose = () => {
    onClose();
    setNewTransaction({ amount: "", description: "" });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Create New Transaction
        </h3>
        <form onSubmit={handleCreateTransaction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Transaction description"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {createMutation.isPending ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransactionModal;
