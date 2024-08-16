import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiBell, FiSettings, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#202046] to-[#FE633D] shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-3xl font-bold text-white">{pageTitle}</h1>
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
            isDropdownOpen
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 pointer-events-none"
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
            onClick={() => navigate("/settings")}
          >
            <FiSettings className="h-6 w-6" />
            <span className="text-sm">Settings</span>
          </button>
          <button
            type="button"
            aria-label="User profile"
            title="User profile"
            className="flex items-center space-x-2 hover:text-[#FE633D] transition-colors"
            onClick={() => navigate("/settings")}
          >
            <FiUser className="h-6 w-6" />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
