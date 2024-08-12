import "chart.js/auto";
import { useState, useEffect } from "react";
import { dashboardApi } from "../api";
import { useSessionCheck } from "../hooks";
import { AdminDashboardData, UserDashboardData } from "../types/Dashboard";
import {
  Header,
  Sidebar,
  UserDashboard,
  LoadingSpinner,
  AdminDashboard,
  SessionExpiredDialog,
} from "../components";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<
    AdminDashboardData | UserDashboardData | null
  >(null);
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userRole = localStorage.getItem("userRole");
        if (userRole === "ADMIN") {
          const response = await dashboardApi.getAdminDashboardData();
          setDashboardData(response.data.dashboardData);
        } else {
          const response = await dashboardApi.getUserDashboardData();
          setDashboardData(response.data.dashboardData);
        }
      } catch (err: any) {
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <Header pageTitle="Dashboard" />

        <main className="mt-6 p-6">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : localStorage.getItem("userRole") === "ADMIN" ? (
            <AdminDashboard data={dashboardData as AdminDashboardData} />
          ) : (
            <UserDashboard data={dashboardData as UserDashboardData} />
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

export default Dashboard;
