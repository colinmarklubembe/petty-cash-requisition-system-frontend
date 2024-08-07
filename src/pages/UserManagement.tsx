import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ui/SideBar";
import { FiMoreHorizontal, FiEdit, FiTrash } from "react-icons/fi";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import { userApi } from "../api";
import { UserCompany } from "../types/User";
import InviteUser, {
  InviteUserFormInputs,
} from "../components/forms/InviteUser";
import SessionExpiredDialog from "../components/ui/SessionExpiredDialog";
import Header from "../components/ui/Header";

const UserManagementPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserCompany[]>([]);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);
  const navigate = useNavigate();
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        setShowSessionExpiredDialog(true);
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
      actionsRef.current &&
      !actionsRef.current.contains(event.target as Node)
    ) {
      setActiveUserId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
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

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setShowInviteUserModal(false);
    } catch (error) {
      setError("Failed to invite user. Please try again.");
    }
  };

  const handleEditUser = (userId: string) => {
    alert(`Edit user functionality for user ID ${userId} to be implemented.`);
  };

  const handleDeleteUser = (userId: string) => {
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
        <Header pageTitle="User Management" />

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
            <div className="flex items-center justify-center h-64">
              <RingLoader color="#FE633D" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200 border-b">
                  <tr className="text-center">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.user.id} className="text-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.user.firstName} {user.user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div
                          className="relative inline-block text-center"
                          ref={actionsRef}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveUserId(user.user.id)}
                            className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <FiMoreHorizontal className="h-6 w-6" />
                          </button>
                          {activeUserId === user.user.id && (
                            <div
                              className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48"
                              ref={actionsRef}
                            >
                              <button
                                onClick={() => handleEditUser(user.user.id)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiEdit className="h-5 w-5 mr-2 text-[#FE633D]" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.user.id)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiTrash className="h-5 w-5 mr-2 text-[#FE633D]" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
