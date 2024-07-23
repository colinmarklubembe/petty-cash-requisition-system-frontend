import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png"; // Path to your logo

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-blue-900 text-white w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <img src={logo} alt="Logo" className="h-10" />
          <button
            type="button" // Specify the type attribute
            aria-label="Toggle sidebar" // Descriptive text for screen readers
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-10">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-white hover:bg-blue-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-white hover:bg-blue-700"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-white hover:bg-blue-700"
              >
                Settings
              </Link>
            </li>
            {/* Add more sidebar items here */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              aria-label="Notifications" // Descriptive text for screen readers
              className="text-gray-700 hover:text-blue-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Settings" // Descriptive text for screen readers
              className="text-gray-700 hover:text-blue-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="User profile" // Descriptive text for screen readers
              className="text-gray-700 hover:text-blue-900"
            >
              <img
                src="path-to-user-avatar.png"
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mt-6 p-6">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          {/* Add your dashboard widgets or content here */}
        </main>
      </div>

      {/* Floating Button to Toggle Sidebar */}
      {!isSidebarOpen && (
        <button
          type="button"
          aria-label="Open sidebar" // Descriptive text for screen readers
          onClick={toggleSidebar}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-3-3v6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Dashboard;
