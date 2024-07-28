import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";

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
                Home
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Home
                </span>
              )}
            </Link>
          </li>
          <li className="group">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiUser className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Profile
              </span>
              {!isSidebarOpen && (
                <span className="ml-4 opacity-0 group-hover:opacity-100">
                  Profile
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
              to="/logout"
              className="flex items-center px-4 py-2 text-white hover:bg-blue-700 rounded-md"
            >
              <FiLogOut className="mr-3" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={logout}
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
