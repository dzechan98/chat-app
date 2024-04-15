import { Input } from "@/components/Input";
import { InputProps } from "@/components/Input/Input";
import React, { forwardRef } from "react";

interface FieldProps extends InputProps {
  title: string;
  onTogglePassword?: () => void;
}

const Field: React.ForwardRefRenderFunction<HTMLInputElement, FieldProps> = (
  { title, name, error, ...props },
  ref
) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor={name} className="font-medium text-sm cursor-pointer">
        {title}
      </label>
      <Input name={name} error={error} {...props} {...ref} />
      {error && <p className="text-sm text-error mt-[-4px]">{error}</p>}
    </div>
  );
};

export default forwardRef(Field);
