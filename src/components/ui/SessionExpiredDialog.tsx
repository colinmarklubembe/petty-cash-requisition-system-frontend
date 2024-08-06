import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SessionExpiredDialogProps {
  onClose: () => void;
}

const SessionExpiredDialog: React.FC<SessionExpiredDialogProps> = ({
  onClose,
}) => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleRedirect = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        handleRedirect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, [handleRedirect]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg relative"
      >
        <button
          title="Close"
          onClick={onClose}
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
        <h2 className="text-lg font-semibold mb-4">Session Expired</h2>
        <p className="mb-6">
          Your session has expired. Please log in again to continue.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-[#FE633D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#e45a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE633D]"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredDialog;
