import React from "react";

export enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum TypeInput {
  text = "text",
  password = "password",
  date = "date",
}

export interface User {
  userId?: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  active?: boolean;
  keyword?: string[];
  address?: string;
  description?: string;
  phoneNumber?: string;
  time?: string | null;
  timeStartJoin?: string | null;
  dateOfBirth?: string | null;
}

export interface FormData {
  email: string;
  password?: string;
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

export interface MenuInfoAccordion {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
