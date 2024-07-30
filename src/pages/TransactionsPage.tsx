import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faEllipsisH,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FiMenu, FiX, FiBell, FiSettings, FiUser } from "react-icons/fi";
import Sidebar from "../components/ui/SideBar";
import { transactionApi } from "../api";
import { Transaction, TransactionFormInputs } from "../types/Transaction";
import CreateTransaction from "../components/forms/CreateTransaction";
import { RingLoader } from "react-spinners"; // Importing a spinner component for loading

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(
    null
  );
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionApi.getAllTransactions();
      setTransactions(response.data.transactions);
    } catch (error) {
      setError("Failed to fetch transactions. Please try again.");
      console.error("Failed to fetch transactions: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCreateTransaction = (newTransaction: TransactionFormInputs) => {
    const transaction: Transaction = {
      id: "",
      type: newTransaction.type,
      amount: newTransaction.amount,
      requisitionId: newTransaction.requisitionId,
      requisition: undefined,
      pettyCashFund: undefined,
    };

    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    setShowCreateTransactionModal(false);
  };

  const handleEditTransaction = (id: string) => {
    // Logic to edit the transaction with the given id
  };

  const handleDeleteTransaction = (id: string) => {
    // Logic to delete the transaction with the given id
  };

  const handleViewTransaction = (id: string) => {
    // Logic to view the transaction with the given id
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
    if (
      actionsRef.current &&
      !actionsRef.current.contains(event.target as Node)
    ) {
      setActiveTransactionId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <header className="bg-[#F05A28] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-2xl font-bold text-[#FFFFFF]">Transactions</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-[#FEE5E0] focus:outline-none"
              aria-label="Menu"
              title="Menu"
            >
              {isDropdownOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg p-4 flex flex-col space-y-2`}
              >
                <button
                  type="button"
                  aria-label="Notifications"
                  title="Notifications"
                  className="flex items-center space-x-2 hover:text-[#F05A28]"
                >
                  <FiBell className="h-6 w-6" />
                  <span className="text-sm">Notifications</span>
                </button>
                <button
                  type="button"
                  aria-label="Settings"
                  title="Settings"
                  className="flex items-center space-x-2 hover:text-[#F05A28]"
                >
                  <FiSettings className="h-6 w-6" />
                  <span className="text-sm">Settings</span>
                </button>
                <button
                  type="button"
                  aria-label="User profile"
                  title="User profile"
                  className="flex items-center space-x-2 hover:text-[#F05A28]"
                >
                  <FiUser className="h-6 w-6" />
                  <span className="text-sm">Profile</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-6 flex flex-col h-full">
          <button
            onClick={() => setShowCreateTransactionModal(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition-colors flex items-center mb-6 self-end"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Transaction
          </button>
          {showCreateTransactionModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg relative">
                <button
                  title="Close"
                  onClick={() => setShowCreateTransactionModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586L3.707 2.293A1 1 0 002.293 3.707L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293a1 1 0 001.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <CreateTransaction
                  onClose={() => setShowCreateTransactionModal(false)}
                  onCreate={handleCreateTransaction}
                />
              </div>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <RingLoader color="#F05A28" size={60} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex-grow">
              <table className="min-w-full bg-white shadow-lg rounded-lg text-center">
                <thead>
                  <tr>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Type
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Fund
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Requisition
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-3 px-6 text-gray-600">
                        No transactions available. Check back later.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-gray-50 transition-colors duration-300"
                      >
                        <td className="py-3 px-6">{transaction.type}</td>
                        <td className="py-3 px-6">{transaction.amount}</td>
                        <td className="py-3 px-6">
                          {transaction.pettyCashFund?.name || "N/A"}
                        </td>
                        <td className="py-3 px-6">
                          {transaction.requisition?.title || "N/A"}
                        </td>
                        <td
                          className="py-3 px-6 relative"
                          ref={
                            actionsRef as React.RefObject<HTMLTableDataCellElement>
                          }
                        >
                          <button
                            onClick={() =>
                              setActiveTransactionId(
                                activeTransactionId === transaction.id
                                  ? null
                                  : transaction.id
                              )
                            }
                            className="focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                          {activeTransactionId === transaction.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                              <button
                                onClick={() =>
                                  handleViewTransaction(transaction.id)
                                }
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-2"
                                />
                                View
                              </button>
                              <button
                                onClick={() =>
                                  handleEditTransaction(transaction.id)
                                }
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteTransaction(transaction.id)
                                }
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="mr-2"
                                />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TransactionsPage;
