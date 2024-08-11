import "chart.js/auto";
import { dashboardApi } from "../api";
import { Bar, Doughnut } from "react-chartjs-2";
import { useSessionCheck } from "../hooks";
import { AdminDashboardData, UserDashboardData } from "../types/Dashboard";
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
  StatCard,
  ChartCard,
  LoadingSpinner,
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

  // Admin-specific data
  const totalUsers =
    dashboardData && "totalUsers" in dashboardData
      ? dashboardData.totalUsers
      : 0;
  const totalFunds =
    dashboardData && "totalFunds" in dashboardData
      ? dashboardData.totalFunds
      : 0;
  const monthlyRequisitions =
    dashboardData && "monthlyRequisitions" in dashboardData
      ? dashboardData.monthlyRequisitions
      : 0;
  const monthlyTransactions =
    dashboardData && "monthlyTransactions" in dashboardData
      ? dashboardData.monthlyTransactions
      : 0;

  // User-specific data
  const userMonthlyTransactions =
    dashboardData && "userMonthlyTransactions" in dashboardData
      ? dashboardData.userMonthlyTransactions
      : 0;
  const userMonthlyRequisitions =
    dashboardData && "userMonthlyRequisitions" in dashboardData
      ? dashboardData.userMonthlyRequisitions
      : 0;

  // Shared data
  const activeFunds = dashboardData?.totalActiveFunds || 0;

  // Data for charts (Admin)
  const fundBalanceData = {
    labels:
      dashboardData && "companyFunds" in dashboardData
        ? dashboardData.companyFunds.map((fund: any) => fund.name)
        : [],
    datasets: [
      {
        data:
          dashboardData && "companyFunds" in dashboardData
            ? dashboardData.companyFunds.map((fund: any) => fund.currentBalance)
            : [],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const spendingByFundData = {
    labels:
      dashboardData && "spendingByFund" in dashboardData
        ? dashboardData.spendingByFund.map((fund: any) => fund.fund)
        : [],
    datasets: [
      {
        label: "Spending by Fund",
        data:
          dashboardData && "spendingByFund" in dashboardData
            ? dashboardData.spendingByFund.map((fund: any) => fund.totalSpent)
            : [],
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Data for charts (User)
  const userSpendingByFundData = {
    labels:
      dashboardData && "userSpendingByFund" in dashboardData
        ? dashboardData.userSpendingByFund.map((fund: any) => fund.fund)
        : [],
    datasets: [
      {
        label: "Spending by Fund",
        data:
          dashboardData && "userSpendingByFund" in dashboardData
            ? dashboardData.userSpendingByFund.map(
                (fund: any) => fund.totalSpent
              )
            : [],
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
              {localStorage.getItem("userRole") === "ADMIN" ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                    <StatCard
                      icon={FiUsers}
                      label="Total Users"
                      value={totalUsers}
                      iconColor="text-[#FFFFFF]"
                    />
                    <StatCard
                      icon={FiFolder}
                      label="Total Funds"
                      value={totalFunds}
                      iconColor="text-[#FFFFFF]"
                    />
                    <StatCard
                      icon={FiTrendingUp}
                      label="Active Funds"
                      value={activeFunds}
                      iconColor="text-[#FFFFFF]"
                    />
                    <StatCard
                      icon={FiClipboard}
                      label="Monthly Requisitions"
                      value={monthlyRequisitions}
                      iconColor="text-[#FFFFFF]"
                    />
                    <StatCard
                      icon={FiFile}
                      label="Monthly Transactions"
                      value={monthlyTransactions}
                      iconColor="text-[#FFFFFF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <ChartCard
                      icon={FiDollarSign}
                      title="Fund Balance"
                      chartType={Doughnut}
                      data={fundBalanceData}
                      options={chartOptions}
                      iconColor="text-[#FE633D]"
                    />
                    <ChartCard
                      icon={FiTrendingUp}
                      title="Spending by Fund"
                      chartType={Bar}
                      data={spendingByFundData}
                      options={chartOptions}
                      iconColor="text-[#FE633D]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                    <StatCard
                      icon={FiTrendingUp}
                      label="Active Funds"
                      value={activeFunds}
                      iconColor="text-[#FFFFFF]"
                    />
                    <StatCard
                      icon={FiClipboard}
                      label="Monthly Requisitions"
                      value={userMonthlyRequisitions}
                      iconColor="text-[#FFFFFF]"
                    />
                    <StatCard
                      icon={FiFile}
                      label="Monthly Transactions"
                      value={userMonthlyTransactions}
                      iconColor="text-[#FFFFFF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <ChartCard
                      icon={FiTrendingUp}
                      title="User Spending by Fund"
                      chartType={Bar}
                      data={userSpendingByFundData}
                      options={chartOptions}
                      iconColor="text-[#FE633D]"
                    />
                  </div>
                </>
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
    </div>
  );
};

export default Dashboard;
