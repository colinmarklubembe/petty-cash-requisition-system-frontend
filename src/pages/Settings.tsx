import { Tab } from "@headlessui/react";
import { settingsApi } from "../api";
import { PulseLoader } from "react-spinners";
import { useSessionCheck } from "../hooks";
import { ToastContainer, toast } from "react-toastify";
import { FiBell, FiUser, FiLock } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import {
  LoadingSpinner,
  Header,
  SessionExpiredDialog,
  Sidebar,
} from "../components";
import "react-toastify/dist/ReactToastify.css";

const SettingsPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSessionExpiredDialog, setShowSessionExpiredDialog } =
    useSessionCheck();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { oldPassword, newPassword };

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword === oldPassword) {
      toast.error("New password must be different from old password");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await settingsApi.updatePassword(userData);
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      console.log(response);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          "Failed to update password! Please try again later"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await settingsApi.updateProfile(profile);
      toast.success("Profile updated successfully");
      console.log(response);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          "Failed to update profile! Please try again later"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await settingsApi.getUser();
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Simulate a delay for loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-12"
        }`}
      >
        <Header pageTitle="Settings" />

        <main className="mt-6 p-6">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-6">
              <Tab.Group>
                <Tab.List className="bg-white p-4 rounded-lg shadow-md mb-6 flex space-x-4 border-b border-gray-200">
                  <Tab
                    className={({ selected }) =>
                      `py-2 px-4 text-sm font-medium ${
                        selected
                          ? "text-[#FE633D] border-b-2 border-[#FE633D]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    Update Profile
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `py-2 px-4 text-sm font-medium ${
                        selected
                          ? "text-[#FE633D] border-b-2 border-[#FE633D]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    Notification Settings
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `py-2 px-4 text-sm font-medium ${
                        selected
                          ? "text-[#FE633D] border-b-2 border-[#FE633D]"
                          : "text-gray-600"
                      }`
                    }
                  >
                    Account Security
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                      <FiUser className="mr-2" /> Profile Settings
                    </h2>
                    <form className="space-y-4" onSubmit={handleUpdateProfile}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              firstName: e.target.value,
                            })
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          value={profile.middleName}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              middleName: e.target.value,
                            })
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={profile.phoneNumber}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative bg-[#FE633D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#e45a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE633D]"
                      >
                        <span
                          className={`${
                            isSubmitting ? "opacity-0" : "opacity-100"
                          } transition-opacity duration-300`}
                        >
                          Update Profile
                        </span>
                        {isSubmitting && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PulseLoader color="#ffffff" size={10} margin={4} />
                          </div>
                        )}
                      </button>
                    </form>
                  </Tab.Panel>

                  <Tab.Panel className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                      <FiBell className="mr-2" /> Notification Settings
                    </h2>
                    {/* Notification settings form */}
                  </Tab.Panel>

                  <Tab.Panel className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#202046] flex items-center">
                      <FiLock className="mr-2" /> Change Password
                    </h2>
                    <form className="space-y-4" onSubmit={handleChangePassword}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Old Password
                        </label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative bg-[#FE633D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#e45a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE633D]"
                      >
                        <span
                          className={`${
                            isSubmitting ? "opacity-0" : "opacity-100"
                          } transition-opacity duration-300`}
                        >
                          Change Password
                        </span>
                        {isSubmitting && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PulseLoader color="#ffffff" size={10} margin={4} />
                          </div>
                        )}
                      </button>
                    </form>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          )}
        </main>
      </div>
      <ToastContainer />
      {showSessionExpiredDialog && (
        <SessionExpiredDialog
          onClose={() => setShowSessionExpiredDialog(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;
