/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { LoadingLogo, LoadingSpinner } from "@/components/Loading";
import { Title } from "@/components/Title";
import { useAuth } from "@/contexts";
import { useFetchUserById, useUploadImage } from "@/hooks";
import { Size, TypeInput } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { updateProfile } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { updateUser } from "@/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants";

interface ProfileState {
  photoURL?: string;
  displayName: string;
  email: string;
  description?: string;
  address: string;
  dateOfBirth: string;
  phoneNumber?: string;
}

const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { loading, infoUser } = useFetchUserById(currentUser?.uid);
  const {
    loadingImage,
    imageURL,
    isSelectImage,
    setImageURL,
    handleFileChange,
  } = useUploadImage();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileState>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object({
        photoURL: yup.string(),
        displayName: yup.string().required(),
        email: yup.string().required().email(),
        description: yup.string(),
        address: yup.string().required(),
        dateOfBirth: yup.string().required(),
        phoneNumber: yup.string().phone(),
      })
    ),
  });

  const onSubmit = async (value: ProfileState) => {
    if (imageURL) {
      setValue("photoURL", imageURL);
    }
    if (!auth.currentUser) {
      return;
    }

    await Promise.all([
      updateUser(infoUser.userId as string, { ...value }),
      updateProfile(auth.currentUser, { ...value }),
    ]);
    toast.success("Update profile successfully");
    navigate(paths.profile);
  };

  return (
    <div className="w-full h-full text-main-100">
      {loading && <LoadingLogo />}
      {!loading && (
        <div className="h-full px-6">
          <Title className="text-xl text-main-100 mb-6">Update profile</Title>
          <form
            className="max-h-[calc(100%-52px)] overflow-y-auto pb-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-2 mb-5">
              <Avatar
                url={imageURL ? imageURL : (infoUser.photoURL as string)}
                size={Size.large}
                overlay={isSelectImage && loadingImage}
              />
              <div className="flex flex-col gap-2">
                <Button size={Size.small}>
                  <span>
                    <FaRegEdit />
                  </span>
                  <span>Change a photo</span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0"
                    onChange={handleFileChange}
                  />
                </Button>
                <Button
                  size={Size.small}
                  intent="outline"
                  disabled={!imageURL}
                  onClick={() => setImageURL("")}
                >
                  <span>
                    <MdDeleteOutline />
                  </span>
                  <span>Remove a photo</span>
                </Button>
              </div>
            </div>
            <Controller
              name="displayName"
              control={control}
              defaultValue={infoUser.displayName ?? ""}
              render={({ field }) => {
                return (
                  <Field
                    {...field}
                    title="Name"
                    placeholder="Enter your name"
                    error={errors.displayName?.message}
                  />
                );
              }}
            />
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={infoUser.dateOfBirth ?? ""}
              render={({ field }) => {
                return (
                  <Field
                    {...field}
                    title="Date of birth"
                    placeholder="Select date"
                    type={TypeInput.date}
                    error={errors.dateOfBirth?.message}
                  />
                );
              }}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={infoUser.email ?? ""}
              render={({ field }) => {
                return (
                  <Field
                    {...field}
                    title="Email"
                    placeholder="Enter your email address"
                    error={errors.email?.message}
                  />
                );
              }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue={infoUser.description ?? ""}
              render={({ field }) => {
                return (
                  <Field
                    {...field}
                    isInput={false}
                    title="Description"
                    placeholder="Enter your description"
                    error={errors.description?.message}
                  />
                );
              }}
            />
            <Controller
              name="address"
              control={control}
              defaultValue={infoUser.address ?? ""}
              render={({ field }) => {
                return (
                  <Field
                    {...field}
                    title="Email"
                    placeholder="Enter your address"
                    error={errors.address?.message}
                  />
                );
              }}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={infoUser.phoneNumber ?? ""}
              render={({ field }) => {
                return (
                  <Field
                    {...field}
                    title="Phone number"
                    placeholder="Enter your phone number"
                    error={errors.phoneNumber?.message}
                  />
                );
              }}
            />
            <Button type="submit" fullwidth size={Size.small}>
              {isSubmitting ? <LoadingSpinner /> : "Save"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
