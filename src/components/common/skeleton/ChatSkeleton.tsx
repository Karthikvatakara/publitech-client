import React from 'react';

const ChatSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex space-x-4">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;