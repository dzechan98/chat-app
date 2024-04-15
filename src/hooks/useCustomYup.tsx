import * as yup from "yup";

const INTERNATIONAL_PHONE_REGEX =
  /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

const INTERNATIONAL_PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const useCustomYup = () => {
  yup.setLocale({
    mixed: {
      default: "This field is invalid",
      required: "This field is required",
    },
    string: {
      min: "This field must be at least ${min} characters",
      max: "This field must be at most ${max} characters",
      email: "Please enter a valid email address",
    },
  });

  const messagePhoneNumber = "Invalid phone number";
  const messagePassword =
    "This field must contain at least one digit, one uppercase letter, one lowercase letter and one special character";

  yup.addMethod(yup.string, "phone", function (message = messagePhoneNumber) {
    return this.test("phone", message, (value) => {
      if (value && value.length > 0) {
        return INTERNATIONAL_PHONE_REGEX.test(value);
      }

      return true;
    });
  });

  yup.addMethod(yup.string, "password", function (message = messagePassword) {
    return this.test("password", message, (value) => {
      if (value && value.length > 0) {
        return INTERNATIONAL_PASSWORD_REGEX.test(value);
      }

      return true;
    });
  });
};

export default useCustomYup;
