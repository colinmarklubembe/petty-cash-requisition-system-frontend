import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ui/SideBar";
import {
  FiBell,
  FiSettings,
  FiUser,
  FiMenu,
  FiX,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import { userApi } from "../api";
import { UserCompany } from "../types/User";
import InviteUser, {
  InviteUserFormInputs,
} from "../components/forms/InviteUser";

const UserManagementPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserCompany[]>([]);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userApi.getCompanyUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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

  const handleInviteUser = async (newUserInput: InviteUserFormInputs) => {
    try {
      const newUser: UserCompany = {
        user: {
          email: newUserInput.email,
          firstName: newUserInput.firstName,
          middleName: "",
          lastName: newUserInput.lastName,
          id: "",
          userCompanies: undefined,
        },
        userId: "",
        companyId: "",
        role: newUserInput.role,
      };

      // Update the state with the new user
      setUsers((prevUsers: any) => [...prevUsers, newUser]);

      // Close the invite user modal
      setShowInviteUserModal(false);
    } catch (error) {
      setError("Failed to invite user. Please try again.");
    }
  };

  const handleEditUser = (userId: string) => {
    // Implement edit user logic here
    alert(`Edit user functionality for user ID ${userId} to be implemented.`);
  };

  const handleDeleteUser = (userId: string) => {
    // Implement delete user logic here
    alert(`Delete user functionality for user ID ${userId} to be implemented.`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">User Management</h1>
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
          <button
            onClick={() => setShowInviteUserModal(true)}
            className="bg-[#FE633D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#e45a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE633D] mb-6"
          >
            Invite User
          </button>

          {showInviteUserModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg relative">
                <button
                  title="Close"
                  onClick={() => setShowInviteUserModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586L3.707 2.293A1 1 0 002.293 3.707L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293a1 1 0 001.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <InviteUser
                  onClose={() => setShowInviteUserModal(false)}
                  onCreate={handleInviteUser}
                />
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RingLoader color="#FE633D" size={60} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-6">
              <h2 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                <FiUser className="mr-2" /> Manage Users
              </h2>
              <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#202046] text-white">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.user.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-t hover:bg-gray-100`}
                    >
                      <td className="py-2 px-4">{`${user.user.firstName} ${user.user.lastName}`}</td>
                      <td className="py-2 px-4">{user.user.email}</td>
                      <td className="py-2 px-4">{user.role}</td>
                      <td className="py-2 px-4 flex space-x-4">
                        <button
                          onClick={() => handleEditUser(user.user.id)}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FiEdit className="mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.user.id)}
                          className="text-red-600 hover:underline flex items-center"
                        >
                          <FiTrash2 className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserManagementPage;
