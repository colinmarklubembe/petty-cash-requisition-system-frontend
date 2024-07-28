import { Link } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiFileText,
  FiClipboard,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-blue-600 text-white transition-width duration-300 ${
        isSidebarOpen ? "w-48" : "w-12"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="group">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiHome className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Dashboard
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Dashboard
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/requisitions"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiClipboard className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Requisitions
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Requisitions
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/approvals"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiFileText className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Approvals
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Approvals
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/transactions"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiDollarSign className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Transactions
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Transactions
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/reports"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiBarChart2 className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Reports
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Reports
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiSettings className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Settings
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Settings
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/user-management"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiUser className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                User Management
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  User Management
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/logout"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
              onClick={logout}
            >
              <FiLogOut className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Logout
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Logout
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
