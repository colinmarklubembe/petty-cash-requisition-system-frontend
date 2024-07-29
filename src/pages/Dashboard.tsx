import { useState } from "react";
import Sidebar from "../components/ui/SideBar";
import { FiBell, FiSettings, FiUser, FiMenu, FiX } from "react-icons/fi";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <header className="bg-gradient-to-r from-[#F05A28] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="relative">
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
                className="flex items-center space-x-2 hover:text-[#F05A28] transition-colors"
              >
                <FiBell className="h-6 w-6" />
                <span className="text-sm">Notifications</span>
              </button>
              <button
                type="button"
                aria-label="Settings"
                title="Settings"
                className="flex items-center space-x-2 hover:text-[#F05A28] transition-colors"
              >
                <FiSettings className="h-6 w-6" />
                <span className="text-sm">Settings</span>
              </button>
              <button
                type="button"
                aria-label="User profile"
                title="User profile"
                className="flex items-center space-x-2 hover:text-[#F05A28] transition-colors"
              >
                <FiUser className="h-6 w-6" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mt-6 p-6">
          <h2 className="text-3xl font-bold mb-6 text-[#3886CE]">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#202046]">
                Total Sales
              </h3>
              <p className="text-3xl font-bold text-[#F05A28]">$12,345</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#202046]">
                New Users
              </h3>
              <p className="text-3xl font-bold text-[#F05A28]">123</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#202046]">
                Active Users
              </h3>
              <p className="text-3xl font-bold text-[#F05A28]">456</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#202046]">
                Pending Orders
              </h3>
              <p className="text-3xl font-bold text-[#F05A28]">78</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#202046]">
                Revenue
              </h3>
              <p className="text-3xl font-bold text-[#F05A28]">$45,678</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#202046]">
                Expenses
              </h3>
              <p className="text-3xl font-bold text-[#F05A28]">$9,876</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
