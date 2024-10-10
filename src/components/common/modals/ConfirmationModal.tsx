import  { FC } from 'react';

interface ConfirmationModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='bg-white p-6 rounded-lg shadow-lg z-10'>
        <h2 className='text-xl font-bold mb-4'>Confirmation</h2>
        <p className='mb-4'>{message}</p>
        <div className='flex justify-end'>
          <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2' onClick={onCancel}>Cancel</button>
          <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
