import React from 'react';
import { Link } from 'react-router-dom';

const UnderConstruction: React.FC = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Oops! We are under construction</h1>
      <p className="text-lg mb-8">We will be back soon.</p>
      <Link to="/">
        <button className="bg-darkBlue hover:bg-darkBlueHover text-white font-semibold py-2 px-4 rounded">
          Return Back to Home
        </button>
      </Link>
    </div>
  );
};

export default UnderConstruction;
