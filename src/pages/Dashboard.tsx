import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ui/SideBar";
import { FiBell, FiSettings, FiUser, FiMenu, FiX } from "react-icons/fi";
import { RingLoader } from "react-spinners";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
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

        <main className="mt-6 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RingLoader color="#FE633D" size={60} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Requisition Overview
                </h3>
                <Pie data={requisitionOverviewData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Fund Balance
                </h3>
                <Doughnut data={fundBalanceData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Monthly Expenditures
                </h3>
                <Line data={monthlyExpendituresData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Monthly Requisitions
                </h3>
                <Bar data={monthlyRequisitionsData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Top Categories
                </h3>
                <Doughnut data={topCategoriesData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Spending by Department
                </h3>
                <Bar data={spendingByDepartmentData} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
