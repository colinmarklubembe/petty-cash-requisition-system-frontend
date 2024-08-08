import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { pettyCashApi } from "../api";
import { useSessionCheck } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { PettyFund, PettyFundFormInputs } from "../types/PettyFund";
import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Table,
  Header,
  Sidebar,
  ActionsMenu,
  LoadingSpinner,
  EditPettyFundForm,
  PettyFundDetailView,
  CreatePettyFundForm,
  ConfirmDeleteDialog,
  SessionExpiredDialog,
} from "../components";

const PettyFundsPage: React.FC = () => {
  const [funds, setFunds] = useState<PettyFund[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFundId, setActiveFundId] = useState<string | null>(null);
  const [showCreateFundModal, setShowCreateFundModal] = useState(false);
  const [showEditFundModal, setShowEditFundModal] = useState(false);
  const [editFundData, setEditFundData] = useState<PettyFund | null>(null);
  const [selectedFund, setSelectedFund] = useState<PettyFund | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fundToDelete, setFundToDelete] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateFund = (newFundInput: PettyFundFormInputs) => {
    const newFund: PettyFund = {
      id: "",
      name: newFundInput.name,
      currentBalance: newFundInput.amount,
      totalSpent: null,
      totalAdded: null,
      requisitions: null,
    };

    setFunds((prevFunds) => [...prevFunds, newFund]);
    setShowCreateFundModal(false);
  };

  const handleEditFund = (id: string) => {
    const fund = funds.find((fund) => fund.id === id);
    if (fund) {
      setEditFundData(fund);
      setShowEditFundModal(true);
    }
  };

  const handleUpdateFund = (updatedPettyFund: PettyFundFormInputs) => {
    setFunds((prevFunds) =>
      prevFunds.map((fund) =>
        fund.id === editFundData?.id ? { ...fund, ...updatedPettyFund } : fund
      )
    );
    fetchPettyCashFunds();
  };

  const handleDeleteFund = (id: string) => {
    setFundToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (fundToDelete) {
      try {
        const response = await pettyCashApi.deletePettyCashFund(fundToDelete);
        setFunds((prevFunds) =>
          prevFunds.filter((fund) => fund.id !== fundToDelete)
        );
        console.log("Fund deleted: ", response.message);
        toast.success(response.message);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Failed to delete fund.";
        toast.error(errorMessage);
        console.error("Error: ", error);
      } finally {
        setFundToDelete(null);
        setShowDeleteDialog(false);
        fetchPettyCashFunds();
      }
    }
  };

  const handleViewFund = (id: string) => {
    const fund = funds.find((fund) => fund.id === id);
    setSelectedFund(fund || null);
  };

  const fetchPettyCashFunds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pettyCashApi.getPettyCashFunds();
      setFunds(response.data.pettyCashFunds);
    } catch (error) {
      setError("Failed to fetch petty cash funds. Please try again.");
      console.error("Failed to fetch petty cash funds: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPettyCashFunds();
  }, [fetchPettyCashFunds]);

  const renderCell = (value: any) => {
    if (typeof value === "string") {
      return value.trim() === "" ? "N/A" : value;
    }

    if (typeof value === "undefined") {
      return "N/A";
    }
    return value === undefined || value === null ? 0 : value;
  };

  const columns = [
    { key: "name" as keyof PettyFund, label: "Fund" },
    {
      key: "currentBalance" as keyof PettyFund,
      label: "Current Balance (Ugx)",
    },
    { key: "totalAdded" as keyof PettyFund, label: "Total Added (Ugx)" },
    { key: "totalSpent" as keyof PettyFund, label: "Total Spent (Ugx)" },
  ];

  const renderRowActions = (fund: PettyFund) => (
    <ActionsMenu
      onEdit={() => handleEditFund(fund.id)}
      onDelete={() => handleDeleteFund(fund.id)}
      onView={() => handleViewFund(fund.id)}
      isOpen={activeFundId === fund.id}
      closeMenu={() => setActiveFundId(null)}
    />
  );

  const renderCustomCell = (key: keyof PettyFund, item: PettyFund) => {
    return <span>{renderCell(item[key])}</span>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <Header pageTitle="Funds" />
        <main className="mt-6 p-6 flex flex-col h-full">
          <button
            onClick={() => setShowCreateFundModal(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition-colors flex items-center mb-6 self-end"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Petty Fund
          </button>
          {showCreateFundModal && (
            <Modal
              isVisible={showCreateFundModal}
              onClose={() => setShowCreateFundModal(false)}
            >
              <CreatePettyFundForm
                onClose={() => setShowCreateFundModal(false)}
                onCreate={handleCreateFund}
              />
            </Modal>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex-grow">
              <Table
                columns={columns}
                data={funds}
                renderRowActions={renderRowActions}
                renderCustomCell={renderCustomCell}
              />
              {selectedFund && (
                <Modal isVisible={true} onClose={() => setSelectedFund(null)}>
                  <PettyFundDetailView fund={selectedFund} />
                </Modal>
              )}
            </div>
          )}
        </main>
      </div>
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
      {showEditFundModal && editFundData && (
        <Modal isVisible={true} onClose={() => setShowEditFundModal(false)}>
          <EditPettyFundForm
            initialData={editFundData}
            onSubmit={(updatedFund) => {
              handleUpdateFund(updatedFund);
              setShowEditFundModal(false);
            }}
            onClose={() => setShowEditFundModal(false)}
          />
        </Modal>
      )}
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={() => setShowDeleteDialog(false)}
          onConfirmDelete={handleConfirmDelete}
          itemName="this petty fund"
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default PettyFundsPage;
