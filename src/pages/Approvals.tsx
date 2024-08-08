import { Requisition } from "../types/Requisition";
import { useSessionCheck } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { requisitionApi, approvalApi } from "../api";
import React, { useState, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  faCheckCircle as faCheckCircleSolid,
  faTimesCircle as faTimesCircleSolid,
  faPauseCircle as faPauseCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Header,
  Sidebar,
  LoadingSpinner,
  SessionExpiredDialog,
} from "../components";

const ApprovalsPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Requisition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleApprove = async (id: string) => {
    try {
      await approvalApi.approveRequisition(id);
      await fetchApprovals();
      toast.success("Requisition approved successfully!");
    } catch (error: any) {
      console.error("Failed to approve requisition: ", error);
      toast.error("Failed to approve requisition. Please try again.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await approvalApi.rejectRequisition(id);
      await fetchApprovals();
      toast.success("Requisition rejected successfully!");
    } catch (error: any) {
      console.error("Failed to reject requisition: ", error);
      toast.error("Failed to reject requisition. Please try again.");
    }
  };

  const handleStall = async (id: string) => {
    try {
      await approvalApi.stallRequisition(id);
      await fetchApprovals();
      toast.success("Requisition stalled successfully!");
    } catch (error: any) {
      console.error("Failed to stall requisition: ", error);
      toast.error("Failed to stall requisition. Please try again.");
    }
  };

  const fetchApprovals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await requisitionApi.getAllRequisitions();
      const pendingApprovals = response.data.requisitions.filter(
        (requisition: any) => requisition.requisitionStatus !== "APPROVED"
      );
      setApprovals(pendingApprovals);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to fetch approvals. Please try again.";
      setError(errorMessage);
      console.error("Error: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  const columns = [
    { key: "description" as keyof Requisition, label: "Description" },
    { key: "amount" as keyof Requisition, label: "Amount (Ugx)" },
    { key: "requisitionStatus" as keyof Requisition, label: "Status" },
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
    return String(item[key]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <Header pageTitle="Approvals" />

        <main className="p-6 flex flex-col h-full">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex-grow">
              <Table
                columns={columns}
                data={approvals}
                renderCustomCell={renderCustomCell}
                renderRowActions={(approval) => (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleApprove(approval.id)}
                      className="flex items-center justify-center bg-green-100 text-green-800 hover:bg-green-300 border border-green-300 rounded-full px-2 py-1 text-sm transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faCheckCircleSolid} />
                      <span className="hidden sm:inline ml-1">Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(approval.id)}
                      className="flex items-center justify-center bg-red-100 text-red-800 hover:bg-red-300 border border-red-300 rounded-full px-2 py-1 text-sm ml-2 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faTimesCircleSolid} />
                      <span className="hidden sm:inline ml-1">Reject</span>
                    </button>
                    <button
                      onClick={() => handleStall(approval.id)}
                      className="flex items-center justify-center bg-yellow-100 text-yellow-800 hover:bg-yellow-300 border border-yellow-300 rounded-full px-2 py-1 text-sm ml-2 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faPauseCircleSolid} />
                      <span className="hidden sm:inline ml-1">Stall</span>
                    </button>
                  </div>
                )}
              />
            </div>
          )}
        </main>
      </div>
      {showSessionExpiredDialog === true && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ApprovalsPage;
