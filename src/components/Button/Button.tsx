import { Size } from "@/interfaces";
import { cva } from "class-variance-authority";
import React from "react";

interface ButtonProps {
  type?: "button" | "submit";
  intent?: "primary" | "outline" | "text";
  text?: "primary" | "secondary";
  size?: Size;
  rounded?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullwidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const button = cva("relative center transition-all font-medium gap-1", {
  variants: {
    intent: {
      primary: "bg-primary text-light border border-primary",
      outline: "border border-primary text-primary",
      text: "text-primary",
    },
    text: {
      primary: "text-primary",
      secondary: "text-secondary",
    },
    size: {
      small: "py-1 px-2 text-md",
      medium: "py-2 px-4 text-lg",
      large: "py-4 px-8 text-xl",
    },
    disabled: {
      true: "opacity-40 select-none hover:opacity-40 cursor-not-allowed",
    },
    loading: {
      true: "opacity-40 select-none hover:opacity-40",
    },
    rounded: {
      small: "rounded",
      medium: "rounded-md",
      large: "rounded-[10px]",
    },
    fullwidth: {
      true: "w-full",
    },
  },
});

const Button: React.FC<ButtonProps> = ({
  type = "button",
  size = Size.medium,
  disabled,
  intent = "primary",
  loading,
  rounded = Size.small,
  text,
  fullwidth,
  children,
  onClick,
}) => {
  return (
    <button
      className={button({
        size,
        disabled,
        intent,
        loading,
        text,
        rounded,
        fullwidth,
      })}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
