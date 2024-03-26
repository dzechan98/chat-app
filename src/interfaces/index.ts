export enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum TypeInput {
  text = "text",
  password = "password",
}

export interface User {
  userId: string;
}

export interface FormData {
  email: string;
  password: string;
}

export interface InputProps {
  id?: string;
  type?: TypeInput;
  value: string;
  placeholder: string;
  error?: string;
  isPassword?: boolean;
  onTogglePassword?: () => void;
  icon?: React.ReactNode;
}
