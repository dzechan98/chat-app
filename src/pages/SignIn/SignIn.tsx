import { useState } from "react";
import { paths } from "@/constants";
import { FormData, Size, TypeInput } from "@/interfaces";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Field } from "@/components/Field";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoadingSpinner } from "@/components/Loading";

const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const validationSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, "Invalid email")
      .required("Please Enter Your Username"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please Enter Your Password"),
  })
  .required();

const SignIn = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const { setCurrentUser } = useAuth();
  const [checked, setChecked] = useState(false);
  const [typePassword, setTypePassword] = useState<TypeInput>(
    TypeInput.password
  );

  const handleToggleTypePassword = () => {
    setTypePassword(
      typePassword === TypeInput.password ? TypeInput.text : TypeInput.password
    );
  };

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(res.user);
    } catch (error) {
      setError("password", {
        type: "custom",
        message: "Wrong email or password.",
      });
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      subTitle="Sign in to continue to Chatvia."
      heading="Don't have an account ?"
      subHeading=" Signup now"
      path={paths.signup}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <Field
                {...field}
                title="Email"
                icon={<MdOutlineMailOutline className="text-main-100" />}
                placeholder="Enter your email address"
                error={errors.email?.message}
              />
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Field
              {...field}
              title="Password"
              type={typePassword}
              isPassword
              onTogglePassword={handleToggleTypePassword}
              icon={<RiLockPasswordLine className="text-main-100" />}
              error={errors.password?.message}
              placeholder="Enter your password"
            />
          )}
        />
        <Checkbox
          title="Remember me"
          checked={checked}
          setChecked={setChecked}
        />
        <Button fullwidth type="submit" size={Size.small} disabled={!isValid}>
          {isSubmitting ? <LoadingSpinner /> : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
