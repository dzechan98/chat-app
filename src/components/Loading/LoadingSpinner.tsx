import { Size } from "@/interfaces";
import { cva } from "class-variance-authority";
import React from "react";

interface LoadingSpinnerProps {
  size?: Size;
  color?: "primary" | "normal";
}

const loadingSpinner = cva(
  "border-t-transparent border-4 border-light rounded-full animate-spin",
  {
    variants: {
      size: {
        small: "size-6",
        medium: "size-8",
        large: "size-10",
      },
      color: {
        primary: "border-primary",
        normal: "border-light",
      },
    },
  }
);

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = Size.small,
  color = "normal",
}) => {
  return <div className={loadingSpinner({ size, color })}></div>;
};

export default LoadingSpinner;
