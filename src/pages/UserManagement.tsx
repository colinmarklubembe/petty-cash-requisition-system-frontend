import { companyApi, authApi } from "../api";
import { UserCompany } from "../types/User";
import { useSessionCheck } from "../hooks";
import { useState, useEffect, useCallback } from "react";
import { InviteUserFormInputs } from "../components/forms/InviteUser";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  Header,
  Sidebar,
  InviteUser,
  ActionsMenu,
  LoadingSpinner,
  UserDetailView,
  ConfirmDeleteDialog,
  SessionExpiredDialog,
  Modal,
} from "../components";

const UserManagementPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserCompany[]>([]);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCompany | null>(null);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [userToRemove, setUserToRemove] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const columns = [
    { key: "name" as keyof UserCompany, label: "Name" },
    { key: "email" as keyof UserCompany, label: "Email" },
    { key: "role" as keyof UserCompany, label: "Role" },
  ];

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.getCompanyUsers();
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  const handleViewUser = (userId: string) => {
    const user = users.find((user) => user.user.id === userId);
    setSelectedUser(user || null);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToRemove(userId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (userToRemove) {
      try {
        const response = await companyApi.removeUserFromCompany(userToRemove);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.user.id !== userToRemove)
        );
        console.log("User removed from company: ", response.message);
        toast.success(response.message);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "Failed to remove user.";
        toast.error(errorMessage);
        console.error("Error: ", error);
      } finally {
        setUserToRemove(null);
        setShowDeleteDialog(false);
        fetchUsers();
      }
    }
  };

  const renderRowActions = (user: UserCompany) => (
    <ActionsMenu
      onDelete={() => handleDeleteUser(user.user.id)}
      onView={() => handleViewUser(user.user.id)}
      isOpen={activeUserId === user.user.id}
      closeMenu={() => setActiveUserId(null)}
    />
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
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
            <LoadingSpinner />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table
              columns={columns}
              data={users}
              renderRowActions={renderRowActions}
              renderCustomCell={(key: any, item) => {
                if (key === "name") {
                  return `${item.user.firstName} ${item.user.lastName}`;
                }
                if (key === "email") {
                  return item.user.email;
                }
                if (key === "role") {
                  return item.role;
                }
                return "";
              }}
            />
          )}
          {selectedUser && (
            <Modal isVisible={true} onClose={() => setSelectedUser(null)}>
              <UserDetailView userCompany={selectedUser} />
            </Modal>
          )}
        </main>
      </div>
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={() => setShowDeleteDialog(false)}
          onConfirmDelete={handleConfirmDelete}
          itemName="this user"
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default UserManagementPage;
