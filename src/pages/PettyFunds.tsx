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
import { PettyFund, PettyFundFormInputs } from "../types/PettyFund";
import { pettyCashApi } from "../api";
import CreatePettyFundForm from "../components/forms/CreatePettyFundForm";
import PettyFundDetailView from "../components/views/PettyFund";
import Modal from "../components/ui/Modal";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import SessionExpiredDialog from "../components/ui/SessionExpiredDialog";
import EditPettyFundForm from "../components/forms/EditPettyFund";
import Header from "../components/ui/Header";

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
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);
  const navigate = useNavigate();

  const actionsRef = useRef<HTMLDivElement | null>(null);

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

  const handleDeleteFund = (id: string) => {};

  const handleViewFund = (id: string) => {
    const fund = funds.find((fund) => fund.id === id);
    setSelectedFund(fund || null);
  };

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
                      Total Added
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Total Spent
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((fund) => (
                    <tr key={fund.id} className="hover:bg-gray-100">
                      <td className="py-4 px-6 border-b">{fund.name}</td>
                      <td className="py-4 px-6 border-b">
                        {renderCell(fund.currentBalance)}
                      </td>
                      <td className="py-4 px-6 border-b">
                        {renderCell(fund.totalAdded)}
                      </td>
                      <td className="py-4 px-6 border-b">
                        {renderCell(fund.totalSpent)}
                      </td>
                      <td className="py-4 px-6 border-b">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setActiveFundId(
                                activeFundId === fund.id ? null : fund.id
                              )
                            }
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                          {activeFundId === fund.id && (
                            <div
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                              ref={actionsRef}
                            >
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <button
                                  onClick={() => {
                                    handleEditFund(fund.id);
                                    setActiveFundId(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                  role="menuitem"
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="mr-2"
                                  />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteFund(fund.id);
                                    setActiveFundId(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                  role="menuitem"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className="mr-2"
                                  />
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    handleViewFund(fund.id);
                                    setActiveFundId(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                  role="menuitem"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="mr-2"
                                  />
                                  View
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    </div>
  );
};

export default PettyFundsPage;
