import React, { FC, useState } from "react";
import { Field, FieldProps, ErrorMessage } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}

const PasswordInputField: FC<InputFieldProps> = ({
  name,
  placeholder,
  icon,
  className,
  style,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`input-field ${className}`}>
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
            <div className="flex grow items-center">
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="grow bg-transparent h-6"
                style={style}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="focus:outline-none ml-2"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          )}
        </Field>
      </label>
      <ErrorMessage name={name} component="div" className="text-red-600 font-bold" />
    </div>
  );
};

export default PasswordInputField;
