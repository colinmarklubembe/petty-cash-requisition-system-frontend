import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faEllipsisH,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FiMenu, FiX, FiBell, FiSettings, FiUser } from "react-icons/fi";
import Sidebar from "../components/ui/SideBar";
import { reportApi } from "../api";
import { Report, ReportFormInputs } from "../types/Report";
import CreateReport from "../components/forms/CreateReport";
import { RingLoader } from "react-spinners";

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<boolean | string>(false); // track loading state for actions
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportApi.getAllReports();
      setReports(response.data.reports);
    } catch (error) {
      setError("Failed to fetch reports. Please try again.");
      console.error("Failed to fetch reports: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCreateReport = async (newReport: ReportFormInputs) => {
    setActionLoading("create"); // Set loading state for creating report
    try {
      const report: Report = {
        id: "",
        title: newReport.title,
        content: newReport.content,
        createdAt: new Date().toISOString(),
      };

      // Simulate a delay or API call
      setReports((prevReports) => [...prevReports, report]);
      setShowCreateReportModal(false);
    } catch (error) {
      setError("Failed to create report. Please try again.");
      console.error("Failed to create report: ", error);
    } finally {
      setActionLoading(false); // Reset action loading state
    }
  };

  const handleEditReport = async (id: string) => {
    setActionLoading(id); // Set loading state for editing report
    try {
      // Simulate an API call to edit the report
    } catch (error) {
      setError("Failed to edit report. Please try again.");
      console.error("Failed to edit report: ", error);
    } finally {
      setActionLoading(false); // Reset action loading state
    }
  };

  const handleDeleteReport = async (id: string) => {
    setActionLoading(id); // Set loading state for deleting report
    try {
      // Simulate an API call to delete the report
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
    } catch (error) {
      setError("Failed to delete report. Please try again.");
      console.error("Failed to delete report: ", error);
    } finally {
      setActionLoading(false); // Reset action loading state
    }
  };

  const handleViewReport = async (id: string) => {
    setActionLoading(id); // Set loading state for viewing report
    try {
      // Simulate an API call to view the report
    } catch (error) {
      setError("Failed to view report. Please try again.");
      console.error("Failed to view report: ", error);
    } finally {
      setActionLoading(false); // Reset action loading state
    }
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
      setActiveReportId(null);
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
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">Reports</h1>
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
            onClick={() => setShowCreateReportModal(true)}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition-colors flex items-center mb-6 self-end"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Report
          </button>
          {showCreateReportModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg relative">
                <button
                  title="Close"
                  onClick={() => setShowCreateReportModal(false)}
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
                <CreateReport
                  onClose={() => setShowCreateReportModal(false)}
                  onCreate={handleCreateReport}
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
                      Title
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Created At
                    </th>
                    <th className="py-3 px-6 bg-gray-100 border-b text-sm uppercase font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-3 px-6 text-gray-600">
                        No reports available. Check back later.
                      </td>
                    </tr>
                  ) : (
                    reports.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b hover:bg-gray-50 transition-colors duration-300"
                      >
                        <td className="py-3 px-6">{report.title}</td>
                        <td className="py-3 px-6">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          className="py-3 px-6 relative"
                          ref={
                            actionsRef as React.RefObject<HTMLTableDataCellElement>
                          }
                        >
                          <button
                            onClick={() =>
                              setActiveReportId(
                                activeReportId === report.id ? null : report.id
                              )
                            }
                            className="focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                          {activeReportId === report.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                              {actionLoading === report.id ? (
                                <div className="flex items-center justify-center p-2">
                                  <RingLoader color="#F05A28" size={30} />
                                </div>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleViewReport(report.id)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="mr-2"
                                    />
                                    View
                                  </button>
                                  <button
                                    onClick={() => handleEditReport(report.id)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="mr-2"
                                    />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteReport(report.id)
                                    }
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashAlt}
                                      className="mr-2"
                                    />
                                    Delete
                                  </button>
                                </>
                              )}
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

export default ReportsPage;
