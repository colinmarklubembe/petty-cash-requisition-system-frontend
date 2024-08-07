import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faEllipsisH,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/ui/SideBar";
import { transactionApi } from "../api";
import { Transaction, TransactionFormInputs } from "../types/Transaction";
import CreateTransaction from "../components/forms/CreateTransaction";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import TransactionDetailsView from "../components/views/Transaction";
import Modal from "../components/ui/Modal";
import SessionExpiredDialog from "../components/ui/SessionExpiredDialog";
import Header from "../components/ui/Header";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(
    null
  );
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        setShowSessionExpiredDialog(true);
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

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
    const transaction = transactions.find((t) => t.id === id);
    setSelectedTransaction(transaction || null);
  };

  const handleClickOutside = (event: MouseEvent) => {
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
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <Header pageTitle="Transactions" />

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
                            <div
                              className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                              ref={actionsRef}
                            >
                              <button
                                onClick={() => {
                                  handleViewTransaction(transaction.id);
                                  setActiveTransactionId(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-2"
                                />
                                View
                              </button>
                              <button
                                onClick={() => {
                                  handleEditTransaction(transaction.id);
                                  setActiveTransactionId(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteTransaction(transaction.id);
                                  setActiveTransactionId(null);
                                }}
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
        {/* Transaction Details View */}
        {selectedTransaction && (
          <Modal
            isVisible={!!selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          >
            <TransactionDetailsView transaction={selectedTransaction} />
          </Modal>
        )}
        {showSessionExpiredDialog && (
          <SessionExpiredDialog
            onClose={() => setShowSessionExpiredDialog(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
