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
