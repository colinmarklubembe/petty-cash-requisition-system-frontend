import React from "react";
import { useNavigate } from "react-router-dom";
import "../../srcz/styles/NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#202046] to-[#FE633D]">
      <div className="text-center bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
        <h1
          className="text-9xl font-extrabold text-gray-800 drop-shadow-lg oops-animation"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          <span className="letter">O</span>
          <span className="letter">o</span>
          <span className="letter">p</span>
          <span className="letter">s</span>
          <span className="letter">!</span>
        </h1>
        <p className="text-2xl text-gray-600 mt-4 tracking-wide">
          404 - The Page Can't Be Found
        </p>
        <p className="mt-4 text-gray-500">
          The page you are looking for does not exist or has been moved. Please
          check the URL or go back to the previous page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 inline-block bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-orange-600 focus:outline-none font-semibold text-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
