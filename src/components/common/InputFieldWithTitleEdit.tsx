import React, { FC, ReactNode } from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputWithIconProps {
  title: string;
  icon: ReactNode; 
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name: string;
  as: string;
}

const InputWithIcon: FC<InputWithIconProps> = ({
  title,
  icon,
  value,
  onChange,
  disabled,
  name,
  as,
}) => {
  return (
    <div className='flex flex-col'>
      <label className='font-semibold'>{title}</label>
      <div className='flex items-center border-b-2 border-gray-300 py-2'>
        <span className='mr-2'>{icon}</span>
        <Field
          value={value}
          onChange={onChange}
          name={name}
          type={as}
          className='bg-transparent border-none focus:outline-none flex-1'
          disabled={disabled}
        />
      </div>
      <ErrorMessage
        className="text-sm text-red-500 mt-1"
        name={name}
        component="span"
      />
    </div>
  );
};

export default InputWithIcon;
