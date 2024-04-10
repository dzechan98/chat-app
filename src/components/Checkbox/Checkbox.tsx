import React from "react";

interface CheckboxProps {
  title: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<CheckboxProps> = ({ title, checked, setChecked }) => {
  const handleToggleChecked = () => {
    setChecked(!checked);
  };
  return (
    <div className="w-full flex items-center gap-2 mb-6">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggleChecked}
        className="accent-primary"
      />
      <span
        className="text-sm font-medium cursor-pointer"
        onClick={handleToggleChecked}
      >
        {title}
      </span>
    </div>
  );
};

export default Checkbox;
