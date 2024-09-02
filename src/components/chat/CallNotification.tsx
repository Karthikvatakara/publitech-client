import React from 'react';

interface CallNotificationProps {
  onAccept: () => void;
  onReject: () => void;
}

const CallNotification: React.FC<CallNotificationProps> = ({ onAccept, onReject }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <p className="mb-2">Incoming call</p>
      <div className="flex space-x-2">
        <button 
          onClick={onAccept}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Accept
        </button>
        <button 
          onClick={onReject}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CallNotification;