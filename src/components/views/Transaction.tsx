import React from "react";
import { Transaction } from "../../types/Transaction";

interface TransactionDetailsViewProps {
  transaction: Transaction;
}

const TransactionDetailsView: React.FC<TransactionDetailsViewProps> = ({
  transaction,
}) => {
  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <div className="flex items-center justify-between">
        <strong className="text-gray-700">Amount (Ugx):</strong>
        <span className="text-gray-900">
          {transaction.amount.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <strong className="text-gray-700">Type:</strong>
        <span className="text-gray-900">{transaction.type}</span>
      </div>
      {transaction.requisition && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Requisition Details:</h3>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Title:</strong>
            <span className="text-gray-900">
              {transaction.requisition.title}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Description:</strong>
            <span className="text-gray-900">
              {transaction.requisition.description}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Amount (Ugx):</strong>
            <span className="text-gray-900">
              {transaction.requisition.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Status:</strong>
            <span className="text-gray-900">
              {transaction.requisition.requisitionStatus}
            </span>
          </div>
        </div>
      )}
      {transaction.pettyCashFund && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Petty Cash Fund Details:
          </h3>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Name:</strong>
            <span className="text-gray-900">
              {transaction.pettyCashFund.name}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Current Balance (Ugx):</strong>
            <span className="text-gray-900">
              {transaction.pettyCashFund.currentBalance.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Total Spent (Ugx):</strong>
            <span className="text-gray-900">
              {transaction.pettyCashFund.totalSpent?.toLocaleString() ?? "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Total Added (Ugx):</strong>
            <span className="text-gray-900">
              {transaction.pettyCashFund.totalAdded?.toLocaleString() ?? "N/A"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetailsView;
