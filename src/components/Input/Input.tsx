import React from "react";
import { cva } from "class-variance-authority";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { InputProps, TypeInput } from "@/interfaces";

const inputWrap = cva("w-full flex items-stretch overflow-hidden");

const Input: React.FC<InputProps> = ({
  id,
  type = TypeInput.text,
  value,
  error,
  icon,
  placeholder,
  onTogglePassword,
  isPassword,
  ...props
}) => {
  return (
    <div className={inputWrap()}>
      <div className="py-2 px-4 border border-r-0 border-light-200 center rounded-s-md">
        {icon}
      </div>
      <div className="w-full py-2 px-4 border relative rounded-e-md border-light-200">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`w-full outline-none bg-transparent ${
            error ? "pr-6" : ""
          }`}
          {...props}
        />
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
