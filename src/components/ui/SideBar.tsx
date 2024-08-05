import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuItems = [
    { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { to: "/funds", icon: <FiDatabase />, label: "Funds" },
    { to: "/requisitions", icon: <FiClipboard />, label: "Requisitions" },
    { to: "/approvals", icon: <FiFileText />, label: "Approvals" },
    { to: "/transactions", icon: <FiDollarSign />, label: "Transactions" },
    { to: "/reports", icon: <FiBarChart2 />, label: "Reports" },
    { to: "/settings", icon: <FiSettings />, label: "Settings" },
    { to: "/users", icon: <FiUser />, label: "User Management" },
    { to: "/logout", icon: <FiLogOut />, label: "Logout", onClick: logout },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-[#202046] text-white transition-all duration-300 ${
        isSidebarOpen ? "w-56" : "w-12"
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
          {menuItems.map(({ to, icon, label, onClick }, index) => {
            const isActive = location.pathname === to;
            return (
              <li key={index} className="relative group">
                <Link
                  to={to}
                  className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#FE633D]"
                      : isSidebarOpen
                      ? "hover:bg-transparent hover:border hover:border-white"
                      : "group-hover:border group-hover:border-white"
                  }`}
                  onClick={onClick}
                >
                  <span className="text-xl">{icon}</span>
                  <span
                    className={`ml-3 text-white ${
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
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
