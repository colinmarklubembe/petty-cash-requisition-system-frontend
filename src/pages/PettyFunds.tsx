// pages/PettyFundsPage.tsx
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
import { PettyFund, PettyFundFormInputs } from "../types/PettyFund";
import { pettyCashApi } from "../api";
import CreatePettyFundForm from "../components/forms/CreatePettyFundForm";
import PettyFundDetailView from "../components/views/PettyFund";
import Modal from "../components/ui/Modal";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";

const PettyFundsPage: React.FC = () => {
  const [funds, setFunds] = useState<PettyFund[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeFundId, setActiveFundId] = useState<string | null>(null);
  const [showCreateFundModal, setShowCreateFundModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState<PettyFund | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
    // Logic to edit the petty fund with the given id
  };

  const handleDeleteFund = (id: string) => {
    // Logic to delete the petty fund with the given id
  };

  const handleViewFund = async (id: string) => {
    console.log();
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
      setActiveFundId(null);
    }
  };

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle conditional rendering
  const renderCell = (value: string | number | undefined | null) => {
    if (typeof value === "string") {
      return value.trim() === "" ? "N/A" : value;
    }

    if (typeof value === "undefined") {
      return "N/A";
    }
    return value === undefined || value === null ? 0 : value;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">Petty Funds</h1>
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
                      Fund
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Current Balance(Ugx)
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Total Spent(Ugx)
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Total Added(Ugx)
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {funds.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-3 px-6 text-gray-600">
                        No petty funds found. Create a new petty fund to get
                        started.
                      </td>
                    </tr>
                  ) : (
                    funds.map((fund) => (
                      <tr key={fund.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6">{renderCell(fund.name)}</td>
                        <td className="py-3 px-6">
                          {renderCell(fund.currentBalance)}
                        </td>
                        <td className="py-3 px-6">
                          {renderCell(fund.totalSpent)}
                        </td>
                        <td className="py-3 px-6">
                          {renderCell(fund.totalAdded)}
                        </td>
                        <td
                          className="py-3 px-6 relative"
                          ref={
                            actionsRef as React.RefObject<HTMLTableDataCellElement>
                          }
                        >
                          <button
                            onClick={() =>
                              setActiveFundId(
                                activeFundId === fund.id ? null : fund.id
                              )
                            }
                            className="focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                          {activeFundId === fund.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => handleViewFund(fund.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-2"
                                />
                                View
                              </button>
                              <button
                                onClick={() => handleEditFund(fund.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteFund(fund.id)}
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

        {/* Modal for detailed view */}
        {selectedFund && (
          <Modal
            isVisible={!!selectedFund}
            onClose={() => setSelectedFund(null)}
          >
            <PettyFundDetailView
              fund={selectedFund}
              onClose={() => setSelectedFund(null)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PettyFundsPage;
