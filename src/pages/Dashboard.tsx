import "chart.js/auto";
import { dashboardApi } from "../api";
import { Bar, Doughnut } from "react-chartjs-2";
import { useSessionCheck } from "../hooks";
import { AdminDashboardData } from "../types/Dashboard";
import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiClipboard,
  FiUsers,
  FiFolder,
  FiFile,
} from "react-icons/fi";
import {
  Header,
  Sidebar,
  LoadingSpinner,
  SessionExpiredDialog,
} from "../components";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(
    null
  );
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardApi.getAdminDashboardData();
        console.log(response.data.dashboardData);
        setDashboardData(response.data.dashboardData);
      } catch (err: any) {
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for cards
  const totalUsers = dashboardData?.totalUsers || 0;
  const totalFunds = dashboardData?.totalFunds || 0;
  const activeFunds = dashboardData?.totalActiveFunds || 0;
  const monthlyRequisitions = dashboardData?.monthlyRequisitions || 0;
  const monthlyTransactions = dashboardData?.monthlyTransactions || 0;

  // Data for charts
  const fundBalanceData = {
    labels: dashboardData?.companyFunds.map((fund: any) => fund.name),
    datasets: [
      {
        data: dashboardData?.companyFunds.map(
          (fund: any) => fund.currentBalance
        ),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const spendingByFundData = {
    labels: dashboardData?.spendingByFund.map((fund: any) => fund.fund),
    datasets: [
      {
        label: "Spending by Fund",
        data: dashboardData?.spendingByFund.map((fund: any) => fund.totalSpent),
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    animation: {
      duration: 2000,
      easing: "easeInOutQuad" as const,
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

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
          ) : (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
                  <FiUsers className="text-2xl text-[#FE633D] mr-2" />
                  <div>
                    <h4 className="text-gray-500 text-sm">Total Users</h4>
                    <h3 className="text-lg font-semibold text-[#202046]">
                      {totalUsers}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
                  <FiFolder className="text-2xl text-[#FE633D] mr-2" />
                  <div>
                    <h4 className="text-gray-500 text-sm">Total Funds</h4>
                    <h3 className="text-lg font-semibold text-[#202046]">
                      {totalFunds}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
                  <FiTrendingUp className="text-2xl text-[#FE633D] mr-2" />
                  <div>
                    <h4 className="text-gray-500 text-sm">Active Funds</h4>
                    <h3 className="text-lg font-semibold text-[#202046]">
                      {activeFunds}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
                  <FiClipboard className="text-2xl text-[#FE633D] mr-2" />
                  <div>
                    <h4 className="text-gray-500 text-sm">
                      Monthly Requisitions
                    </h4>
                    <h3 className="text-lg font-semibold text-[#202046]">
                      {monthlyRequisitions}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
                  <FiFile className="text-2xl text-[#FE633D] mr-2" />
                  <div>
                    <h4 className="text-gray-500 text-sm">
                      Monthly Transactions
                    </h4>
                    <h3 className="text-lg font-semibold text-[#202046]">
                      {monthlyTransactions}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                    <FiDollarSign className="mr-2 text-[#FE633D]" /> Fund
                    Balance
                  </h3>
                  <Doughnut data={fundBalanceData} options={chartOptions} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                    <FiTrendingUp className="mr-2 text-[#FE633D]" /> Spending by
                    Fund
                  </h3>
                  <Bar data={spendingByFundData} options={chartOptions} />
                </div>
              </div>
            </div>
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
