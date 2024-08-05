import React from "react";
import { Report } from "../../types/Report";
import { Requisition } from "../../types/Requisition";
import { Transaction } from "../../types/Transaction";

interface UserReportProps {
  report: Report;
}

const UserReport: React.FC<UserReportProps> = ({ report }) => {
  const { user, report: reportData } = report;
  const { userMonthlyRequisitions, userMonthlyTransactions } = reportData;
  const { currentMonthRequisitions, totalMonthlyRequisitions } =
    userMonthlyRequisitions;
  const { currentMonthTransactions } = userMonthlyTransactions;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 border-[#202046]">
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
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

export default UserReport;
