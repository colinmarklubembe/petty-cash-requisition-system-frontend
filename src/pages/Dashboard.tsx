import { useState } from "react";
import Sidebar from "../components/ui/SideBar";
import { FiBell, FiSettings, FiSearch, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-48" : "ml-12"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative text-gray-600">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              />
              <button
                title="Search"
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4 text-gray-600"
              >
                <FiSearch className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="text-gray-700 hover:text-blue-900"
            >
              <FiBell className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Settings"
              className="text-gray-700 hover:text-blue-900"
            >
              <FiSettings className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="User profile"
              className="text-gray-700 hover:text-blue-900 relative"
            >
              <FiUser className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mt-6 p-6">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          {/* Add your dashboard widgets or content here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
