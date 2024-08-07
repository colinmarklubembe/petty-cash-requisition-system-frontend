import "chart.js/auto";
import { useSessionCheck } from "../hooks";
import { useState, useEffect } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  FiDollarSign,
  FiTrendingUp,
  FiClipboard,
  FiFileText,
  FiPieChart,
  FiBriefcase,
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
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err: any) {
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Detailed data for charts
  const requisitionOverviewData = {
    labels: ["Pending", "Approved", "Rejected", "Under Review"],
    datasets: [
      {
        data: [15, 35, 10, 5],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
        hoverBackgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  const fundBalanceData = {
    labels: [
      "Initial Amount",
      "Current Balance",
      "Total Expenditures",
      "Available Balance",
    ],
    datasets: [
      {
        data: [2000, 1500, 400, 1000],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const monthlyExpendituresData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Expenditures",
        data: [250, 300, 200, 400, 350, 450, 300, 500, 400, 600, 550, 700],
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const monthlyRequisitionsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Requisitions",
        data: [20, 25, 30, 40, 35, 50, 45, 60, 55, 70, 65, 80],
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const topCategoriesData = {
    labels: [
      "Office Supplies",
      "Travel",
      "Meals",
      "Entertainment",
      "Miscellaneous",
    ],
    datasets: [
      {
        label: "Top Categories",
        data: [500, 300, 200, 150, 100],
        backgroundColor: [
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#4BC0C0",
          "#8E5EA2",
        ],
      },
    ],
  };

  const spendingByDepartmentData = {
    labels: ["HR", "Finance", "IT", "Marketing", "Sales"],
    datasets: [
      {
        label: "Spending by Department",
        data: [2000, 1500, 1800, 1700, 1600],
        backgroundColor: [
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#4BC0C0",
          "#8E5EA2",
        ],
      },
    ],
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                  <FiDollarSign className="mr-2 text-[#FE633D]" /> Fund Balance
                </h3>
                <Doughnut data={fundBalanceData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                  <FiTrendingUp className="mr-2 text-[#FE633D]" /> Monthly
                  Expenditures
                </h3>
                <Line data={monthlyExpendituresData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                  <FiClipboard className="mr-2 text-[#FE633D]" /> Requisition
                  Overview
                </h3>
                <Pie data={requisitionOverviewData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                  <FiFileText className="mr-2 text-[#FE633D]" /> Monthly
                  Requisitions
                </h3>
                <Bar data={monthlyRequisitionsData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                  <FiPieChart className="mr-2 text-[#FE633D]" /> Top Categories
                </h3>
                <Doughnut data={topCategoriesData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-4 text-[#202046] flex items-center">
                  <FiBriefcase className="mr-2 text-[#FE633D]" /> Spending by
                  Department
                </h3>
                <Bar data={spendingByDepartmentData} />
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
