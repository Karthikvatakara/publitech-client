import React from 'react';

function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
        </div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;