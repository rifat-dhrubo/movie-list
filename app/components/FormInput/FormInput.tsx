import classNames from "classnames";
import React from "react";
import { HiExclamationCircle } from "react-icons/hi";

type Props = {
  children: React.ReactNode;
  name: string;
  error?: boolean;
  labelText: string;
  errorMessage?: string;
  wrapperClass?: string;
};

const FormInput: React.FC<Props> = ({
  error,
  name,
  errorMessage,
  labelText,
  children,
  wrapperClass = "relative mt-1",
}) => {
  return (
    <div className={wrapperClass}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700"
      >
        {labelText}
      </label>
      {children}
      {error ? (
        <div className="absolute bottom-0 -top-1.5 right-0 flex items-center pr-3 pointer-events-none">
          <HiExclamationCircle className="w-5 h-5 text-red-500" />
        </div>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default FormInput;
