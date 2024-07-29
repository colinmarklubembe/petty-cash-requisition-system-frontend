import { Link } from "react-router-dom";
import {
  FiHome,
  FiDatabase,
  FiUser,
  FiSettings,
  FiLogOut,
  FiFileText,
  FiClipboard,
  FiDollarSign,
  FiBarChart2,
  FiArrowRight,
  FiArrowLeft,
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
      className={`fixed inset-y-0 left-0 bg-[#202046] text-white transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      } flex flex-col border-r border-[#F05A28]`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="text-white text-lg focus:outline-none"
        >
          {isSidebarOpen ? <FiArrowLeft /> : <FiArrowRight />}
        </button>
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          {[
            { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
            { to: "/funds", icon: <FiDatabase />, label: "Funds" },
            {
              to: "/requisitions",
              icon: <FiClipboard />,
              label: "Requisitions",
            },
            { to: "/approvals", icon: <FiFileText />, label: "Approvals" },
            {
              to: "/transactions",
              icon: <FiDollarSign />,
              label: "Transactions",
            },
            { to: "/reports", icon: <FiBarChart2 />, label: "Reports" },
            { to: "/settings", icon: <FiSettings />, label: "Settings" },
            {
              to: "/user-management",
              icon: <FiUser />,
              label: "User Management",
            },
            {
              to: "/logout",
              icon: <FiLogOut />,
              label: "Logout",
              onClick: logout,
            },
          ].map(({ to, icon, label, onClick }, index) => (
            <li key={index} className="relative group">
              <Link
                to={to}
                className="flex items-center px-4 py-3 rounded-md hover:bg-[#F05A28] transition-colors"
                onClick={onClick}
              >
                {icon}
                <span
                  className={`ml-4 text-white ${
                    isSidebarOpen ? "block" : "hidden"
                  }`}
                >
                  {label}
                </span>
              </Link>
              {!isSidebarOpen && (
                <div className="absolute left-full ml-2 w-max hidden group-hover:block bg-white border border-[#202046] text-[#202046] rounded-lg p-2 shadow-lg whitespace-nowrap">
                  {label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
