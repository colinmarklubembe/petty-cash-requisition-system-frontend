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

const UserManagementPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUsers([
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
          },
          // Add more users as needed
        ]);
      } catch (err: any) {
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

  const handleInviteUser = (e: any) => {
    e.preventDefault();
    // Implement invite user logic here
    alert("Invite user functionality to be implemented.");
  };

  const handleEditUser = (userId: any) => {
    // Implement edit user logic here
    alert(`Edit user functionality for user ID ${userId} to be implemented.`);
  };

  const handleDeleteUser = (userId: any) => {
    // Implement delete user logic here
    alert(`Delete user functionality for user ID ${userId} to be implemented.`);
  };

  const handleAssignRole = (userId: any, newRole: any) => {
    // Implement assign role logic here
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    alert(`Role assigned successfully to user ID ${userId}.`);
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
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <RingLoader color="#FE633D" size={60} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-6">
                <h2 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Invite User
                </h2>
                <form onSubmit={handleInviteUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#FE633D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#e45a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE633D]"
                  >
                    Invite User
                  </button>
                </form>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                  <FiUser className="mr-2" /> Manage Users
                </h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Role</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleAssignRole(user.id, e.target.value)
                            }
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                          >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEditUser(user.id)}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit"
                            title="Edit"
                          >
                            <FiEdit className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete"
                            title="Delete"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserManagementPage;
