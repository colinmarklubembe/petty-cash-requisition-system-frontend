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
import { FiBell, FiMenu, FiSettings, FiUser, FiX } from "react-icons/fi";
import CreateRequisition from "../components/forms/CreateRequisition";
import RequisitionDetailsView from "../components/views/Requisition";
import Modal from "../components/ui/Modal";
import { Requisition, RequisitionFormInputs } from "../types/Requisition";
import { requisitionApi } from "../api";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import SessionExpiredDialog from "../components/ui/SessionExpiredDialog";

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
  const [selectedRequisition, setSelectedRequisition] =
    useState<Requisition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

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

    setRequisitions((prev) => [...prev, requisition]);
    setShowCreateRequisitionModal(false);
  };

  const handleEditRequisition = (id: string) => {
    setDropdownOpen(false);
    setActiveRequisitionId(null);
  };

  const handleDeleteRequisition = (id: string) => {
    setDropdownOpen(false);
    setActiveRequisitionId(null);
  };

  const handleViewRequisition = (id: string) => {
    const requisition = requisitions.find((req) => req.id === id) || null;
    setSelectedRequisition(requisition);
    setDropdownOpen(false);
    setActiveRequisitionId(null);
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
    fetchRequisitions();
  }, [fetchRequisitions]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
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
                      Title
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
                  {requisitions.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-3 px-6 border-b text-sm">
                        {req.title}
                      </td>
                      <td className="py-3 px-6 border-b text-sm">
                        {req.amount}
                      </td>
                      <td className="py-3 px-6 border-b text-sm">
                        <span
                          className={`py-1 px-3 rounded-full text-xs font-semibold ${
                            req.requisitionStatus === "APPROVED"
                              ? "bg-green-100 text-green-800"
                              : req.requisitionStatus === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : req.requisitionStatus === "DRAFTS"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {req.requisitionStatus === "APPROVED"
                            ? "Approved"
                            : req.requisitionStatus === "REJECTED"
                            ? "Rejected"
                            : req.requisitionStatus === "DRAFTS"
                            ? "Drafts"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-6 border-b text-sm">
                        {req.pettyCashFund?.name || "N/A"}
                      </td>
                      <td className="py-3 px-6 border-b text-sm">
                        <div
                          className="relative inline-block text-left"
                          ref={actionsRef}
                        >
                          <button
                            onClick={() =>
                              setActiveRequisitionId(
                                activeRequisitionId === req.id ? null : req.id
                              )
                            }
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                          {activeRequisitionId === req.id && (
                            <div
                              className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48"
                              ref={actionsRef}
                            >
                              <button
                                onClick={() => handleViewRequisition(req.id)}
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-2"
                                />
                                View
                              </button>
                              <button
                                onClick={() => handleEditRequisition(req.id)}
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteRequisition(req.id)}
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="mr-2"
                                />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    </div>
  );
};

export default RequisitionsPage;
