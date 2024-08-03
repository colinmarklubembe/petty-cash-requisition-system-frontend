import React from "react";
import { Requisition } from "../../types/Requisition";

interface RequisitionDetailsViewProps {
  requisition: Requisition;
}

const RequisitionDetailsView: React.FC<RequisitionDetailsViewProps> = ({
  requisition,
}) => {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{requisition.title}</h2>
      <p className="text-gray-700 mb-4">{requisition.description}</p>
      <div className="flex items-center justify-between mb-4">
        <strong className="text-gray-600">Amount (Ugx):</strong>
        <span className="text-gray-900">
          {requisition.amount.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <strong className="text-gray-600">Status:</strong>
        <span className="text-gray-900">{requisition.requisitionStatus}</span>
      </div>
      {requisition.pettyCashFund && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Petty Cash Fund Details:
          </h3>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Name:</strong>
            <span className="text-gray-900">
              {requisition.pettyCashFund.name}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Current Balance (Ugx):</strong>
            <span className="text-gray-900">
              {requisition.pettyCashFund.currentBalance.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Total Spent (Ugx):</strong>
            <span className="text-gray-900">
              {requisition.pettyCashFund.totalSpent?.toLocaleString() ?? "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-600">Total Added (Ugx):</strong>
            <span className="text-gray-900">
              {requisition.pettyCashFund.totalAdded?.toLocaleString() ?? "N/A"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequisitionDetailsView;
