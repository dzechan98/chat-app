import React from "react";
import { cva } from "class-variance-authority";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { TypeInput } from "@/interfaces";

const inputWrap = cva("w-full flex items-stretch overflow-hidden");

export interface InputProps {
  name?: string;
  type?: TypeInput;
  value?: string;
  placeholder: string;
  error?: string;
  isPassword?: boolean;
  onTogglePassword?: () => void;
  icon?: React.ReactNode;
  isInput?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  type = TypeInput.text,
  error,
  icon,
  onTogglePassword,
  isPassword,
  isInput = true,
  ...props
}) => {
  return (
    <div className={inputWrap()}>
      {icon && (
        <div className="hidden md:flex py-2 px-4 border border-r-0 border-light-200 center rounded-s-md">
          {icon}
        </div>
      )}
      <div className="w-full py-2 px-4 border relative rounded-md md:rounded-s-none border-light-200">
        {isInput ? (
          <input
            id={name}
            type={type}
            className="w-full outline-none bg-transparent pr-6"
            {...props}
          />
        ) : (
          <textarea
            id={name}
            rows={5}
            {...props}
            className={`w-full outline-none bg-transparent ${
              error ? "pr-6" : ""
            }`}
          />
        )}
        {isPassword && (
          <span
            className="absolute top-1/2 right-2 translate-x-[-50%] translate-y-[-50%] text-lg cursor-pointer"
            onClick={onTogglePassword}
          >
            {type === TypeInput.password ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
        {!isPassword && error && (
          <span className="absolute top-1/2 right-2 translate-x-[-50%] translate-y-[-50%] text-error text-lg">
            <IoMdInformationCircleOutline />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
