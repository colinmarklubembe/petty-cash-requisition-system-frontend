import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiMenu, FiX, FiBell, FiSettings, FiUser } from "react-icons/fi";
import Sidebar from "../components/ui/SideBar";
import { reportApi, userApi } from "../api";
import { Report } from "../types/Report";
import { UserCompany } from "../types/User";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import UserReport from "../components/views/UserReport";
import DownloadButton from "../components/ui/DownloadReport";

const ReportsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);
  const [users, setUsers] = useState<UserCompany[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  const fetchReports = useCallback(async () => {
    if (!reportType) return;

    setLoading(true);
    setError(null);
    try {
      let response;
      const selectedDate = selectedMonth
        ? `${new Date().getFullYear()}-${selectedMonth}-01`
        : undefined;
      if (reportType === "user" && selectedUserId) {
        response = await reportApi.getUserReport(selectedUserId, selectedDate);
        setReport(response.data);
      } else if (reportType === "company") {
        // response = await reportApi.getCompanyReport(selectedDate);
        // setReport(response.data);
      }
    } catch (error) {
      setError("Failed to fetch reports. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [reportType, selectedUserId, selectedMonth]);

  useEffect(() => {
    if (reportType) {
      if (reportType === "user" && !users.length) {
        const fetchUsers = async () => {
          try {
            const response = await userApi.getCompanyUsers();
            setUsers(response.data);
          } catch (error) {
            setError("Failed to fetch users. Please try again.");
          }
        };
        fetchUsers();
      } else {
        fetchReports();
      }
    }
  }, [fetchReports, reportType, users]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
      // setActiveReportId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenerateReport = (type: string) => {
    setReportType(type);
    setSelectedUserId(null);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-4xl font-bold text-white">Reports</h1>
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
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleGenerateReport("user")}
                className={`py-2 px-6 rounded-full transition-colors ${
                  reportType === "user"
                    ? "bg-[#FE633D] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Generate User Report
              </button>
              <button
                onClick={() => handleGenerateReport("company")}
                className={`py-2 px-6 rounded-full transition-colors ${
                  reportType === "company"
                    ? "bg-[#FE633D] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Generate Company Report
              </button>
              {report && (
                <DownloadButton
                  data={report}
                  fileName={`report_${reportType}_${
                    selectedMonth || "all"
                  }.pdf`}
                />
              )}
            </div>

            <div className="flex items-center space-x-4">
              {reportType === "user" && (
                <div className="flex flex-col">
                  <label htmlFor="userSelect" className="mb-1 text-gray-600">
                    Select a user:
                  </label>
                  <select
                    id="userSelect"
                    value={selectedUserId || ""}
                    onChange={handleUserChange}
                    className="p-2 border rounded-lg bg-white text-gray-700 border-gray-300"
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.user.id} value={user.user.id}>
                        {user.user.firstName} ({user.role})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="monthSelect" className="mb-1 text-gray-600">
                  Select a month(<strong>optional</strong>):
                </label>
                <select
                  id="monthSelect"
                  value={selectedMonth || ""}
                  onChange={handleMonthChange}
                  className="p-2 border rounded-lg bg-white text-gray-700 border-gray-300"
                >
                  <option value="">Select a month</option>
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = (index + 1).toString().padStart(2, "0");
                    return (
                      <option key={month} value={month}>
                        {new Date(0, index).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center flex-1">
                <RingLoader color="#FE633D" />
              </div>
            ) : (
              <div className="overflow-auto flex-1">
                {reportType && report ? (
                  reportType === "user" ? (
                    <UserReport report={report} />
                  ) : (
                    "Company Report"
                  )
                ) : (
                  <div className="text-center text-gray-600">
                    {error ? (
                      <p>{error}</p>
                    ) : (
                      <p>Select a report type and generate a report.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
