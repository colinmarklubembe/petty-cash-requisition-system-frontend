import { UserCompany } from "../types/User";
import { reportApi, authApi } from "../api";
import { CompanyReport, UserReport } from "../types/Report";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSessionCheck } from "../hooks";
import {
  Header,
  Sidebar,
  UserReportView,
  LoadingSpinner,
  DownloadButton,
  CompanyReportView,
  SessionExpiredDialog,
} from "../components";

const ReportsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);
  const [users, setUsers] = useState<UserCompany[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [userReport, setUserReport] = useState<UserReport | null>(null);
  const [companyReport, setCompanyReport] = useState<CompanyReport | null>(
    null
  );
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const actionsRef = useRef<HTMLDivElement | null>(null);

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
        setUserReport(response.data);
        setCompanyReport(null); // Ensure company report is cleared
      } else if (reportType === "company") {
        response = await reportApi.getCompanyReport(selectedDate);
        setCompanyReport(response.data);
        setUserReport(null); // Ensure user report is cleared
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
            const response = await authApi.getCompanyUsers();
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

  useEffect(() => {
    if (reportType) {
      if (reportType === "user" && !users.length) {
        const fetchUsers = async () => {
          try {
            const response = await authApi.getCompanyUsers();
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

  const handleClickOutside = (event: MouseEvent) => {
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
        <Header pageTitle="Reports" />

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
              {(userReport || companyReport) && (
                <DownloadButton
                  reportData={
                    (userReport || companyReport) as UserReport | CompanyReport
                  }
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
                        {user.user.firstName}({user.role})
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
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, "0");
                    return (
                      <option key={month} value={month}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex-grow overflow-auto">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : userReport ? (
              <UserReportView report={userReport} />
            ) : companyReport ? (
              <CompanyReportView report={companyReport} />
            ) : (
              <div className="text-center text-gray-500">
                Please select a report type to generate.
              </div>
            )}
          </div>
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

export default ReportsPage;
