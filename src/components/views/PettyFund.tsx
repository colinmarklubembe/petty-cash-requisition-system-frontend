import React from "react";
import { PettyFund } from "../../types/PettyFund";

interface PettyFundDetailViewProps {
  fund: PettyFund;
}

const PettyFundDetailView: React.FC<PettyFundDetailViewProps> = ({ fund }) => {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg mx-auto">
      <svg
        className="w-7 h-7 text-gray-500 mb-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
      </svg>
      <div className="mb-4">
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900">
          Fund Details
        </h5>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Name:</strong>
          <span className="text-gray-900">{fund.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Current Balance (Ugx):</strong>
          <span className="text-gray-900">{fund.currentBalance}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Total Spent (Ugx):</strong>
          <span className="text-gray-900">{fund.totalSpent ?? "N/A"}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-gray-700">Total Added (Ugx):</strong>
          <span className="text-gray-900">{fund.totalAdded ?? "N/A"}</span>
        </div>
      </div>
      <a
        href="/requisitions"
        className="inline-flex items-center mt-4 font-medium text-blue-600 hover:underline"
      >
        See all requisitions
        <svg
          className="w-3 h-3 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </a>
    </div>
  );
};

export default PettyFundDetailView;
