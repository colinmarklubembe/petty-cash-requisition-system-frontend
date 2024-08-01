import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisH,
  faEdit,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/ui/SideBar";
import { FiBell, FiSettings, FiUser, FiMenu, FiX } from "react-icons/fi";
import CreateRequisition from "../components/forms/CreateRequisition";
import { Requisition, RequisitionFormInputs } from "../types/Requisition";
import { requisitionApi } from "../api";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";

const RequisitionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeRequisitionId, setActiveRequisitionId] = useState<string | null>(
    null
  );
  const [showCreateRequisitionModal, setShowCreateRequisitionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCreateRequisition = (newRequisition: RequisitionFormInputs) => {
    const requisition: Requisition = {
      id: "",
      title: newRequisition.title,
      description: newRequisition.description,
      amount: newRequisition.amount,
      requisitionStatus: "DRAFTS",
      pettyCashFundId: newRequisition.pettyCashFundId,
      pettyCashFund: null,
    };

    setRequisitions((prevRequisitions) => [...prevRequisitions, requisition]);
    setShowCreateRequisitionModal(false);
  };

  const handleEditRequisition = (id: string) => {
    // Logic to edit the requisition with the given id
  };

  const handleDeleteRequisition = (id: string) => {
    // Logic to delete the requisition with the given id
  };

  const handleViewRequisition = (id: string) => {
    // Logic to view the requisition with the given id
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
      setActiveRequisitionId(null);
    }
  };

  const fetchRequisitions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await requisitionApi.getAllRequisitions();
      setRequisitions(response.data.requisitions);
    } catch (error) {
      setError("Failed to fetch requisitions. Please try again.");
      console.error("Failed to fetch requisitions: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    fetchRequisitions();
  }, [fetchRequisitions]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // // Function to handle conditional rendering
  // const renderCell = (value: string | number | undefined | null) => {
  //   if (typeof value === "string") {
  //     return value.trim() === "" ? "N/A" : value;
  //   }

  //   if (typeof value === "undefined") {
  //     return "N/A";
  //   }
  //   return value === undefined || value === null ? 0 : value;
  // };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">Requisitions</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Menu"
              title="Menu"
            >
              {isDropdownOpen ? (
                <FiX className="h-8 w-8" />
              ) : (
                <FiMenu className="h-8 w-8" />
              )}
            </button>
            <div
              className={`absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg p-4 flex flex-col space-y-2 transition-transform transform ${
                isDropdownOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <button
                type="button"
                aria-label="Notifications"
                title="Notifications"
                className="flex items-center space-x-2 hover:text-[#FE633D] transition-colors"
              >
                <FiBell className="h-6 w-6" />
                <span className="text-sm">Notifications</span>
              </button>
              <button
                type="button"
                aria-label="Settings"
                title="Settings"
                className="flex items-center space-x-2 hover:text-[#FE633D] transition-colors"
              >
                <FiSettings className="h-6 w-6" />
                <span className="text-sm">Settings</span>
              </button>
              <button
                type="button"
                aria-label="User profile"
                title="User profile"
                className="flex items-center space-x-2 hover:text-[#FE633D] transition-colors"
              >
                <FiUser className="h-6 w-6" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 flex flex-col h-full">
          <button
            onClick={() => setShowCreateRequisitionModal(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition-colors flex items-center mb-6 self-end"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Requisition
          </button>
          {showCreateRequisitionModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg relative">
                <button
                  title="Close"
                  onClick={() => setShowCreateRequisitionModal(false)}
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
                <CreateRequisition
                  onClose={() => setShowCreateRequisitionModal(false)}
                  onCreate={handleCreateRequisition}
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
                      Description
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Fund
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requisitions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-3 px-6 text-gray-600">
                        No requisitions found. Create a new requisition to get
                        started.
                      </td>
                    </tr>
                  ) : (
                    requisitions.map((req) => (
                      <tr key={req.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6">{req.description}</td>
                        <td className="py-3 px-6">{req.amount}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`py-1 px-3 rounded-full text-xs ${
                              req.requisitionStatus === "APPROVED"
                                ? "bg-green-200 text-green-800"
                                : req.requisitionStatus === "PENDING"
                                ? "bg-yellow-200 text-yellow-800"
                                : req.requisitionStatus === "DRAFTS"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            {req.requisitionStatus}
                          </span>
                        </td>
                        <td className="py-3 px-6">{req.pettyCashFund?.name}</td>
                        <td
                          className="py-3 px-6 relative"
                          ref={
                            actionsRef as React.RefObject<HTMLTableDataCellElement>
                          }
                        >
                          <button
                            onClick={() =>
                              setActiveRequisitionId(
                                activeRequisitionId === req.id ? null : req.id
                              )
                            }
                            className="focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                          {activeRequisitionId === req.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => handleViewRequisition(req.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-2"
                                />
                                View
                              </button>
                              <button
                                onClick={() => handleEditRequisition(req.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteRequisition(req.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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

export default RequisitionsPage;
