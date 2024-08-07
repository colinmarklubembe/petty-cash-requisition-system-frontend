import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle as faCheckCircleSolid,
  faTimesCircle as faTimesCircleSolid,
  faPauseCircle as faPauseCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/ui/SideBar";
import { requisitionApi, approvalApi } from "../api";
import { Requisition } from "../types/Requisition";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import SessionExpiredDialog from "../components/ui/SessionExpiredDialog";
import Header from "../components/ui/Header";

const ApprovalsPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Requisition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        setShowSessionExpiredDialog(true);
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await approvalApi.approveRequisition(id);
      console.log("Requisition approved: ", response);
      await fetchApprovals();
      toast.success("Requisition approved successfully!");
    } catch (error: any) {
      console.error("Failed to approve requisition: ", error);
      toast.error("Failed to approve requisition. Please try again.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await approvalApi.rejectRequisition(id);
      console.log("Requisition rejected: ", response);
      await fetchApprovals();
      toast.success("Requisition rejected successfully!");
    } catch (error: any) {
      console.error("Failed to reject requisition: ", error);
      toast.error("Failed to reject requisition. Please try again.");
    }
  };

  const handleStall = async (id: string) => {
    try {
      const response = await approvalApi.stallRequisition(id);
      console.log("Requisition stalled: ", response);
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
            <div className="flex items-center justify-center flex-grow">
              <RingLoader color="#FE633D" size={60} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex-grow">
              <table className="min-w-full bg-white shadow-lg rounded-lg text-center">
                <thead>
                  <tr>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Description
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {approvals.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-3 px-6 text-gray-600">
                        No approvals pending. Check back later.
                      </td>
                    </tr>
                  ) : (
                    approvals.map((approval) => (
                      <tr key={approval.id}>
                        <td className="py-4 px-6 border-b">
                          {approval.description}
                        </td>
                        <td className="py-4 px-6 border-b">
                          {approval.amount}
                        </td>
                        <td className="py-4 px-6 border-b">
                          {approval.requisitionStatus === "APPROVED" ? (
                            <FontAwesomeIcon
                              icon={faCheckCircleSolid}
                              className="text-green-500"
                            />
                          ) : approval.requisitionStatus === "REJECTED" ? (
                            <FontAwesomeIcon
                              icon={faTimesCircleSolid}
                              className="text-red-500"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faPauseCircleSolid}
                              className="text-yellow-500"
                            />
                          )}
                        </td>
                        <td className="py-4 px-6 border-b">
                          <button
                            onClick={() => handleApprove(approval.id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(approval.id)}
                            className="text-red-500 hover:text-red-700 ml-4"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleStall(approval.id)}
                            className="text-yellow-500 hover:text-yellow-700 ml-4"
                          >
                            Stall
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>

        <ToastContainer position="bottom-right" />
      </div>
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
    </div>
  );
};

export default ApprovalsPage;
