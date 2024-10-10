import React from 'react';
import { Link } from 'react-router-dom';

const BlockedUserPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Blocked</h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but your account has been blocked. If you believe this is an error, please contact our support team for assistance.
        </p>
        <div className="space-y-4">
          <Link to="/contact-support" className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Contact Support
          </Link>
          <Link to="/" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlockedUserPage;