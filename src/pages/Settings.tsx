import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/ui/SideBar";
import {
  FiBell,
  FiSettings,
  FiUser,
  FiMenu,
  FiX,
  FiLock,
} from "react-icons/fi";
import { Tab } from "@headlessui/react";
import { RingLoader, PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { isSessionExpired } from "../utils/session";
import settingsApi from "../api/settings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingsPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

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

    setIsSubmitting(true); // Set loading state to true

    try {
      const response = await settingsApi.updatePassword(userData);
      toast.success("Password changed successfully");
      setOldPassword(""); // Clear input fields
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
      setIsSubmitting(false); // Reset loading state
    }
  };

  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        localStorage.clear();
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simulate a delay for loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate 2 seconds loading time
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
        <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
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
              <RingLoader color="#F05A28" size={60} />
            </div>
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
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#3886CE] focus:border-[#3886CE]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#FE633D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#e45a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE633D]"
                      >
                        Update Profile
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
                        disabled={isSubmitting} // Disable button when submitting
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
    </div>
  );
};

export default SettingsPage;
