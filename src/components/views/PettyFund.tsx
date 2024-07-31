import React from "react";
import { PettyFund } from "../../types/PettyFund";

interface PettyFundDetailViewProps {
  fund: PettyFund;
  onClose: () => void;
}

const PettyFundDetailView: React.FC<PettyFundDetailViewProps> = ({
  fund,
  onClose,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Petty Fund Details</h2>
      <div className="mb-4">
        <strong>Name:</strong> {fund.name}
      </div>
      <div className="mb-4">
        <strong>Current Balance (Ugx):</strong> {fund.currentBalance}
      </div>
      <div className="mb-4">
        <strong>Total Spent (Ugx):</strong> {fund.totalSpent ?? "N/A"}
      </div>
      <div className="mb-4">
        <strong>Total Added (Ugx):</strong> {fund.totalAdded ?? "N/A"}
      </div>
      <div className="mb-4">
        <strong>Requisitions:</strong>
        <ul>
          {fund.requisitions && fund.requisitions.length > 0 ? (
            fund.requisitions.map((req: any) => (
              <li key={req.id}>
                {req.description} - {req.amount}
              </li>
            ))
          ) : (
            <li>No requisitions available</li>
          )}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  );
};

export default PettyFundDetailView;
