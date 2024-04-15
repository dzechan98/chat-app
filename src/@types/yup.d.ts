import * as yup from "yup";

declare module "yup" {
  interface StringSchema {
    phone(message?: string): StringSchema;
    password(message?: string): StringSchema;
  }
}

export default yup;
