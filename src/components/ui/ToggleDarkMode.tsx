import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const DarkModeToggle: React.FC = () => {
  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.removeItem("darkMode");
    } else {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  };

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      <FontAwesomeIcon
        icon={isDarkMode ? faSun : faMoon}
        className="text-gray-900 dark:text-gray-100"
      />
    </button>
  );
};

export default DarkModeToggle;
