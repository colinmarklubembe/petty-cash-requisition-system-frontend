import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle as faCheckCircleSolid,
  faTimesCircle as faTimesCircleSolid,
  faPauseCircle as faPauseCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FiMenu, FiX, FiBell, FiSettings, FiUser } from "react-icons/fi";
import Sidebar from "../components/ui/SideBar";
import { requisitionApi, approvalApi } from "../api";
import { Requisition } from "../types/Requisition";
import { RingLoader } from "react-spinners"; // Importing a spinner component for loading

const ApprovalsPage: React.FC = () => {
  const [approvals, setApprovals] = useState<Requisition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
      setError("Failed to approve requisition. Please try again.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await approvalApi.rejectRequisition(id);
      console.log("Requisition rejected: ", response);
      setApprovals((prevApprovals) =>
        prevApprovals.filter((approval) => approval.id !== id)
      );
    } catch (error: any) {
      console.error("Failed to reject requisition: ", error);
      setError("Failed to reject requisition. Please try again.");
    }
  };

  const handleStall = async (id: string) => {
    // Implement stall logic
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
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
          <h1 className="text-2xl font-bold text-[#FFFFFF]">Approvals</h1>
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
                      <tr
                        key={approval.id}
                        className="border-b hover:bg-gray-50"
                      >
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
          )}
        </main>
      </div>
    </div>
  );
};

export default ApprovalsPage;
