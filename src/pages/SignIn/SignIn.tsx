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
import { useTitle } from "@/hooks";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
      const res = await signInWithEmailAndPassword(
        auth,
        email.toLocaleLowerCase(),
        password as string
      );
      setCurrentUser(res.user);
      navigate(paths.chat);
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
        <div className="w-full mb-3 sm:mb-5">
          <Checkbox
            title="Remember me"
            checked={checked}
            setChecked={setChecked}
          />
        </div>
        <Button fullwidth type="submit" size={Size.small} disabled={!isValid}>
          {isSubmitting ? <LoadingSpinner /> : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
