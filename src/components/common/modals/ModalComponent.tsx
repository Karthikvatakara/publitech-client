import React, { FC, ReactNode } from 'react';

interface ModalComponentProps {
  tab: ReactNode;
}

const ModalComponent: FC<ModalComponentProps> = ({ tab }) => {
  return (
    <div className='w-full h-screen bg-slate-900 fixed top-0 left-0 z-20 bg-opacity-40 flex items-center justify-center'>
      { tab }
    </div>
  );
};

export default ModalComponent;
