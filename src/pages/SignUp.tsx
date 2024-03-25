import { useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { paths } from "@/constants";
import { FormData, Size, TypeInput } from "@/interfaces";
import AuthLayout from "@/layouts/AuthLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { validationSchema } from "@/pages/SignIn";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
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
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = email.split("@")[0];

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
        });
        setCurrentUser(res.user);
      }
    } catch (error) {
      const errorMessage =
        "Oh no, this email address is unavailable! Please try a different address.";
      setError("email", { type: "custom", message: errorMessage });
    }
  };

  return (
    <AuthLayout
      title="Sign up"
      subTitle="Get your Chatvia account now."
      heading="Already have an account ?"
      subHeading="Signin"
      path={paths.signin}
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
        <div className="my-6">
          <Button fullwidth type="submit" size={Size.small} disabled={!isValid}>
            {isSubmitting ? <Loading /> : "Register"}
          </Button>
        </div>
        <p className="text-center text-sm text-main-200">
          By registering you agree to the Chatvia{" "}
          <span className="text-primary cursor-pointer">Terms of Use</span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
