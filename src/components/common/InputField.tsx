import React, { FC } from "react";
import { Field, FieldProps, ErrorMessage } from 'formik';

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  icon?: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}

const InputField: FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  icon,
  className,
  style,
}) => {
  return (
    <div className={`input-field ${className} items-center justify-center`}>
      <label className={`input input-bordered border border-primary flex items-center m-3 w-full ${className}`}>
        {icon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 text-primary opacity-70"
          >
            {icon}
          </svg>
        )}
        <Field name={name}>
          {({ field }: FieldProps) => (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className="grow bg-transparent h-6"
              style={style}
            />
          )}
        </Field>
      </label>
      <ErrorMessage  name={name} component="div" className="text-red-600 font-semibold " />
    </div>
  );
};

export default InputField;
