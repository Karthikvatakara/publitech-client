import React from 'react';

const SkeletonStudentDashboardCards= () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow animate-pulse">
      <div className="w-full h-32 bg-gray-300 rounded mb-2 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
      <div className="mt-2 bg-gray-300 rounded-full h-6 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonStudentDashboardCards;