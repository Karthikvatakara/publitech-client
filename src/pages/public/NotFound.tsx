import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-white">404</h1>
        <p className="mb-4 text-lg text-gray-100">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </div>
        <p className="mt-4 text-gray-100">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block px-6 py-3 mt-6 text-sm font-medium leading-6 text-center text-white transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;