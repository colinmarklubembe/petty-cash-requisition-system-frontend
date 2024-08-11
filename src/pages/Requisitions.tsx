import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { requisitionApi } from "../api";
import { useSessionCheck } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { Requisition, RequisitionFormInputs } from "../types/Requisition";
import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  Table,
  Header,
  Sidebar,
  ActionsMenu,
  LoadingSpinner,
  CreateRequisition,
  ConfirmDeleteDialog,
  EditRequisitionForm,
  SessionExpiredDialog,
  RequisitionDetailsView,
} from "../components";

const RequisitionsPage: React.FC = () => {
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeRequisitionId, setActiveRequisitionId] = useState<string | null>(
    null
  );
  const [showCreateRequisitionModal, setShowCreateRequisitionModal] =
    useState(false);
  const [selectedRequisition, setSelectedRequisition] =
    useState<Requisition | null>(null);
  const [editRequisitionData, setEditRequisitionData] =
    useState<Requisition | null>(null);
  const [showEditRequisitionModal, setShowEditRequisitionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [requisitionToDelete, setRequisitionToDelete] = useState<string | null>(
    null
  );
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleCreateRequisition = (newRequisition: RequisitionFormInputs) => {
    const requisition: Requisition = {
      id: "",
      title: newRequisition.title,
      description: newRequisition.description,
      amount: newRequisition.amount,
      requisitionStatus: "PENDING",
      pettyCashFundId: newRequisition.pettyCashFundId,
      pettyCashFund: null,
    };

    setRequisitions((prev) => [...prev, requisition]);
    setShowCreateRequisitionModal(false);
    fetchRequisitions();
  };

  const handleEditRequisition = (id: string) => {
    const requisition = requisitions.find(
      (requisition) => requisition.id === id
    );

    if (requisition) {
      setEditRequisitionData(requisition);
      setShowEditRequisitionModal(true);
    }
  };

  const handleUpdateRequisition = (
    updatedRequisition: RequisitionFormInputs
  ) => {
    setRequisitions((prevRequisitions) =>
      prevRequisitions.map((requisition) =>
        requisition.id === editRequisitionData?.id
          ? { ...requisition, ...updatedRequisition }
          : requisition
      )
    );

    fetchRequisitions();
  };

  const handleDeleteRequisition = (id: string) => {
    setRequisitionToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (requisitionToDelete) {
      try {
        const response = await requisitionApi.deleteRequisition(
          requisitionToDelete
        );
        setRequisitions((prevRequisitions) =>
          prevRequisitions.filter(
            (requisition) => requisition.id !== requisitionToDelete
          )
        );
        console.log("Fund deleted: ", response.message);
        toast.success(response.message);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Failed to delete fund.";
        toast.error(errorMessage);
        console.error("Error: ", error);
      } finally {
        setRequisitionToDelete(null);
        setShowDeleteDialog(false);
      }
    }
  };

  const handleViewRequisition = (id: string) => {
    const requisition = requisitions.find((req) => req.id === id) || null;
    setSelectedRequisition(requisition);
    setActiveRequisitionId(null);
  };

  const fetchRequisitions = useCallback(async () => {
    const userRole = localStorage.getItem("userRole");
    setLoading(true);
    setError(null);
    try {
      if (userRole !== "ADMIN") {
        const response = await requisitionApi.getUserRequisitions();
        setRequisitions(response.data.requisitions);
      } else {
        const response = await requisitionApi.getAllRequisitions();
        setRequisitions(response.data.requisitions);
      }
    } catch (error) {
      setError("Failed to fetch requisitions. Please try again.");
      console.error("Failed to fetch requisitions: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequisitions();
  }, [fetchRequisitions]);

  const columns = [
    { key: "title" as keyof Requisition, label: "Title" },
    { key: "amount" as keyof Requisition, label: "Amount (Ugx)" },
    { key: "requisitionStatus" as keyof Requisition, label: "Status" },
    { key: "pettyCashFund" as keyof Requisition, label: "Fund" },
  ];

  const renderCustomCell = (key: keyof Requisition, item: Requisition) => {
    if (key === "requisitionStatus") {
      return (
        <span
          className={`py-1 px-3 rounded-full text-xs font-semibold ${
            item.requisitionStatus === "APPROVED"
              ? "bg-green-100 text-green-800"
              : item.requisitionStatus === "REJECTED"
              ? "bg-red-100 text-red-800"
              : item.requisitionStatus === "DRAFTS"
              ? "bg-gray-100 text-gray-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.requisitionStatus === "APPROVED"
            ? "Approved"
            : item.requisitionStatus === "REJECTED"
            ? "Rejected"
            : item.requisitionStatus === "DRAFTS"
            ? "Drafts"
            : "Pending"}
        </span>
      );
    }
    if (key === "pettyCashFund") {
      return item.pettyCashFund?.name || "N/A";
    }
    return String(item[key]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <Header pageTitle="Requisitions" />
        <main className="mt-6 p-6 flex flex-col h-full">
          <button
            onClick={() => setShowCreateRequisitionModal(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition-colors flex items-center mb-6 self-end"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Requisition
          </button>
          {showCreateRequisitionModal && (
            <Modal
              isVisible={showCreateRequisitionModal}
              onClose={() => setShowCreateRequisitionModal(false)}
            >
              <CreateRequisition
                onClose={() => setShowCreateRequisitionModal(false)}
                onCreate={handleCreateRequisition}
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
                data={requisitions}
                renderCustomCell={renderCustomCell}
                renderRowActions={(requisition) => (
                  <ActionsMenu
                    onEdit={() => handleEditRequisition(requisition.id)}
                    onDelete={() => handleDeleteRequisition(requisition.id)}
                    onView={() => handleViewRequisition(requisition.id)}
                    isOpen={activeRequisitionId === requisition.id}
                    closeMenu={() => setActiveRequisitionId(null)}
                  />
                )}
              />
            </div>
          )}
          {selectedRequisition && (
            <Modal
              isVisible={!!selectedRequisition}
              onClose={() => setSelectedRequisition(null)}
            >
              <RequisitionDetailsView requisition={selectedRequisition} />
            </Modal>
          )}
        </main>
      </div>
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
      {showEditRequisitionModal && editRequisitionData && (
        <Modal
          isVisible={true}
          onClose={() => setShowEditRequisitionModal(false)}
        >
          <EditRequisitionForm
            initialData={editRequisitionData}
            onSubmit={(updatedRequisition) => {
              handleUpdateRequisition(updatedRequisition);
              setShowEditRequisitionModal(false);
            }}
            onClose={() => setShowEditRequisitionModal(false)}
          />
        </Modal>
      )}
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={() => setShowDeleteDialog(false)}
          onConfirmDelete={handleConfirmDelete}
          itemName="this requisition"
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default RequisitionsPage;
