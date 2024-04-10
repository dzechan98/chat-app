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
  userId?: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  active?: boolean;
  keyword?: string[];
  time?: string | null;
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

export interface TypeMessage {
  id: string;
  sender: string;
  displayName: string;
  content: string;
  avatar: string;
  time: string;
  imageURL?: string;
  isDelete?: boolean;
  isEdit?: boolean;
  watched?: boolean;
}

export interface Room {
  roomId: string;
  members: string[];
  messages: TypeMessage[];
}

export type ListImage = { source?: string }[];

export type Theme = "dark" | "light";
