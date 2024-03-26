import { Input } from "@/components/Input";
import { InputProps } from "@/interfaces";
import React, { forwardRef } from "react";

interface FieldProps extends InputProps {
  title: string;
  onTogglePassword?: () => void;
}

const Field: React.ForwardRefRenderFunction<HTMLInputElement, FieldProps> = (
  {
    title,
    id,
    type,
    placeholder,
    value,
    error,
    icon,
    onTogglePassword,
    ...props
  },
  ref
) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor={id} className="font-medium text-sm cursor-pointer">
        {title}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        error={error}
        icon={icon}
        placeholder={placeholder}
        onTogglePassword={onTogglePassword}
        {...props}
        {...ref}
      />
      {error && (
        <p className="text-sm text-error mt-[-4px] capitalize">{error}</p>
      )}
    </div>
  );
};

export default forwardRef(Field);
