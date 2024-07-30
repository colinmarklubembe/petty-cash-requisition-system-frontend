import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle as faCheckCircleSolid,
  faTimesCircle as faTimesCircleSolid,
  faPauseCircle as faPauseCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../components/ui/SideBar";
import { requisitionApi, approvalApi } from "../api";
import { Requisition } from "../types/Requisition";

const ApprovalsPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Requisition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await approvalApi.approveRequisition(id);
      console.log("Requisition approved: ", response);
      setApprovals((prevApprovals) =>
        prevApprovals.filter((approval) => approval.id !== id)
      );
    } catch (error: any) {
      console.error("Failed to approve requisition: ", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await approvalApi.rejectRequisition(id);
      console.log("Requisition approved: ", response);
      setApprovals((prevApprovals) =>
        prevApprovals.filter((approval) => approval.id !== id)
      );
    } catch (error: any) {
      console.error("Failed to approve requisition: ", error);
    }
  };

  const handleStall = (id: string) => {
    // Implement stall logic
  };

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await requisitionApi.getAllRequisitions();

        const pendingApprovals = response.data.requisitions.filter(
          (requisition: any) => requisition.requisitionStatus !== "APPROVED"
        );

        setApprovals(pendingApprovals);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Signup failed. Please try again.";
        console.error("Error: ", errorMessage);
      }
    };

    fetchApprovals();
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
          <h1 className="text-2xl font-bold text-[#FFFFFF]">Approvals</h1>
          <div className="relative">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-[#FEE5E0] focus:outline-none"
              aria-label="Menu"
              title="Menu"
            >
              {isSidebarOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </header>

        <main className="p-6 flex flex-col h-full">
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
                    <tr key={approval.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6">{approval.description}</td>
                      <td className="py-3 px-6">{approval.amount}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`py-1 px-3 rounded-full text-xs ${
                            approval.requisitionStatus === "DRAFTS"
                              ? "bg-gray-200 text-gray-600"
                              : approval.requisitionStatus === "PENDING"
                              ? "bg-yellow-200 text-yellow-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {approval.requisitionStatus}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove(approval.id)}
                            className="flex items-center px-3 py-1 border border-green-300 text-green-700 rounded-full bg-green-100 hover:bg-green-200 text-sm"
                          >
                            <FontAwesomeIcon
                              icon={faCheckCircleSolid}
                              className="text-base"
                            />
                            <span className="ml-1">Approve</span>
                          </button>
                          <button
                            onClick={() => handleStall(approval.id)}
                            className="flex items-center px-3 py-1 border border-yellow-300 text-yellow-700 rounded-full bg-yellow-100 hover:bg-yellow-200 text-sm"
                          >
                            <FontAwesomeIcon
                              icon={faPauseCircleSolid}
                              className="text-base"
                            />
                            <span className="ml-1">Stall</span>
                          </button>
                          <button
                            onClick={() => handleReject(approval.id)}
                            className="flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-full bg-red-100 hover:bg-red-200 text-sm"
                          >
                            <FontAwesomeIcon
                              icon={faTimesCircleSolid}
                              className="text-base"
                            />
                            <span className="ml-1">Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApprovalsPage;
