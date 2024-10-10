import  { FC } from 'react';

interface InstructorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructor: any;
}

const InstructorDetailsModal: FC<InstructorDetailsModalProps> = ({ isOpen, onClose, instructor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 mx-4 sm:mx-0">
        <h3 className="font-bold text-2xl mb-4 text-center">Instructor Details</h3>
        <div className="space-y-4">
          <div>
            <strong className="block text-gray-700">Username:</strong> 
            <p className="text-gray-900">{instructor?.username}</p>
          </div>
          <div>
            <strong className="block text-gray-700">Email:</strong> 
            <p className="text-gray-900">{instructor?.email}</p>
          </div>
          <div>
            <strong className="block text-gray-700">Role:</strong> 
            <p className="text-gray-900">{instructor?.role}</p>
          </div>
          <div>
            <strong className="block text-gray-700">Reject Reason:</strong> 
            <p className="text-gray-900">{instructor?.rejectreason}</p>
          </div>
          <div>
            <strong className="block text-gray-700">Github:</strong> 
            <a href={instructor?.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{instructor?.githubLink}</a>
          </div>
          <div>
            <strong className="block text-gray-700">LinkedIn:</strong> 
            <a href={instructor?.linkedinLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{instructor?.linkedinLink}</a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetailsModal;
