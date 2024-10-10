
const ExamPassedModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Exam Already Passed</h2>
          <p className="mb-4">You have already passed this exam. No need to retake it.</p>
          <button
            onClick={onClose}
            className="bg-darkBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    );
  };
  
  export default ExamPassedModal