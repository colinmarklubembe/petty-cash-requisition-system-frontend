import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { transactionApi } from "../api";
import { useSessionCheck } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transaction, TransactionFormInputs } from "../types/Transaction";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Modal,
  Table,
  Header,
  Sidebar,
  ActionsMenu,
  LoadingSpinner,
  CreateTransaction,
  SessionExpiredDialog,
  TransactionDetailsView,
} from "../components";

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
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const fetchTransactions = useCallback(async () => {
    const userRole = localStorage.getItem("userRole");
    setLoading(true);
    setError(null);
    try {
      if (userRole !== "ADMIN") {
        const response = await transactionApi.getUserTransactions();
        setTransactions(response.data.transactions);
      } else {
        const response = await transactionApi.getAllTransactions();
        setTransactions(response.data.transactions);
      }
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

  const columns = [
    { key: "type" as keyof Transaction, label: "Type" },
    { key: "amount" as keyof Transaction, label: "Amount (Ugx)" },
    { key: "pettyCashFund.name" as keyof Transaction, label: "Fund" },
    { key: "requisition.title" as keyof Transaction, label: "Requisition" },
    { key: "actions" as keyof Transaction, label: "Actions" },
  ];

  const renderCustomCell = (
    key: keyof Transaction | string,
    item: Transaction
  ) => {
    if (key === "actions") {
      return (
        <div className="flex justify-center items-center">
          <ActionsMenu
            onView={() => handleViewTransaction(item.id)}
            isOpen={activeTransactionId === item.id}
            closeMenu={() => setActiveTransactionId(null)}
          />
        </div>
      );
    }
    if (key === "pettyCashFund.name") {
      return item.pettyCashFund?.name || "N/A";
    }
    if (key === "requisition.title") {
      return item.requisition?.title || "N/A";
    }
    return String(item[key as keyof Transaction]);
  };

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
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex-grow">
              <Table
                columns={columns}
                data={transactions}
                renderCustomCell={renderCustomCell}
              />
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
