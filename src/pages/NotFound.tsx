import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-red-500 text-6xl mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
        <p className="mt-4 text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
