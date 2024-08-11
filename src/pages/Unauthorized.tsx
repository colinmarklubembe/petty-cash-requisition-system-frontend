import React from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/Unauthorized.css";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const text = "Unauthorized!";

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#202046] to-[#FE633D]">
      <div className="text-center bg-white p-12 rounded-lg shadow-2xl max-w-4xl w-full">
        <h1
          className="text-7xl font-extrabold text-gray-800 drop-shadow-lg unauthorized-animation"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {text.split("").map((letter, index) => (
            <span key={index} className="letter">
              {letter}
            </span>
          ))}
        </h1>
        <p className="text-xl text-gray-600 mt-4 tracking-wide">
          <strong>403</strong> - You don't have permission to access this page.
        </p>
        <p className="mt-4 text-gray-500">
          Please contact your administrator if you believe this is an error, or
          return to the dashboard.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 inline-block bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-orange-600 focus:outline-none font-semibold text-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
