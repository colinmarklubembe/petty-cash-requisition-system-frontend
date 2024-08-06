import React from "react";
import { CompanyReport } from "../../types/Report";
import { Requisition } from "../../types/Requisition";
import { Transaction } from "../../types/Transaction";

interface CompanyReportProps {
  report: CompanyReport;
}

const CompanyReportView: React.FC<CompanyReportProps> = ({ report }) => {
  const { company, report: reportData } = report;
  const { companyMonthlyRequisitions, companyMonthlyTransactions } = reportData;
  const { currentMonthRequisitions, totalMonthlyRequisitions } =
    companyMonthlyRequisitions;
  const { currentMonthTransactions, totalMonthlyTransactions } =
    companyMonthlyTransactions;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 border-[#202046]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
        <p className="text-gray-600">{company.companyEmail}</p>
        <p className="text-gray-600">{company.phoneNumber}</p>
        <p className="text-gray-600">
          {company.address.street}, {company.address.city},{" "}
          {company.address.state}, {company.address.country}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Monthly Requisitions
        </h3>
        <p className="text-gray-700">
          Total Requisitions: {totalMonthlyRequisitions}
        </p>
        {currentMonthRequisitions.requisitions.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {currentMonthRequisitions.requisitions.map(
              (requisition: Requisition) => (
                <li
                  key={requisition.id}
                  className="border p-4 rounded-lg shadow-sm bg-gray-50"
                >
                  <h4 className="text-md font-medium text-gray-800">
                    {requisition.title}
                  </h4>
                  <p className="text-gray-600">{requisition.description}</p>
                  <p className="text-gray-800">Amount: {requisition.amount}</p>
                  <p className="text-gray-500">
                    Status: {requisition.requisitionStatus}
                  </p>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No requisitions for this month.</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Monthly Transactions
        </h3>
        <p className="text-gray-700">
          Total Transactions: {totalMonthlyTransactions}
        </p>
        {currentMonthTransactions.transactions.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {currentMonthTransactions.transactions.map(
              (transaction: Transaction) => (
                <li
                  key={transaction.id}
                  className="border p-4 rounded-lg shadow-sm bg-gray-50"
                >
                  <h4 className="text-md font-medium text-gray-800">
                    Transaction ID: {transaction.id}
                  </h4>
                  <p className="text-gray-600">Amount: {transaction.amount}</p>
                  <p className="text-gray-800">Type: {transaction.type}</p>
                  <p className="text-gray-500">
                    Requisition ID: {transaction.requisitionId}
                  </p>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No transactions for this month.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyReportView;
