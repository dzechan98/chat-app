import { useState } from "react";
import { paths } from "@/constants";
import { FormData, Size, TypeInput, User } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { AuthLayout } from "@/layouts/AuthLayout";
import { addUser } from "@/apis";
import defaultUserImage from "@/assets/default-user.png";
import { generateKeywords } from "@/utils";
import { LoadingSpinner } from "@/components/Loading";
import { useTitle } from "@/hooks";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const SignUp = () => {
  useTitle("Sign Up");
  const navigate = useNavigate();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(8).password(),
      })
    ),
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
      const res = await createUserWithEmailAndPassword(
        auth,
        email.toLocaleLowerCase(),
        password as string
      );

      const displayName = email.split("@")[0];

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL: defaultUserImage,
        });

        const dataUser: User = {
          userId: res.user.uid,
          displayName,
          email: res.user.email,
          photoURL: defaultUserImage,
          keyword: generateKeywords(displayName),
          timeStartJoin: moment(new Date()).format(),
        };

        await addUser(dataUser);
        setCurrentUser(res.user);
        navigate(paths.chat);
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
                placeholder="Enter your email"
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
            {isSubmitting ? <LoadingSpinner /> : "Register"}
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
