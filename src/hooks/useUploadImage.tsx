import { uploadImageWithFirebase } from "@/apis";
import { isImageFile } from "@/utils";
import React, { useState } from "react";
import Swal from "sweetalert2";

const useUploadImage = () => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      if (isImageFile(files[0].name)) {
        setLoadingImage(true);
        setIsSelectImage(true);
        uploadImageWithFirebase(files[0])
          .then((res) => {
            setLoadingImage(false);
            setImageURL(res);
          })
          .catch((error) => console.log(error));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select the file as an image!",
        });
      }
    }
  };
  return {
    loadingImage,
    imageURL,
    isSelectImage,
    setIsSelectImage,
    setLoadingImage,
    setImageURL,
    handleFileChange,
  };
};

export default useUploadImage;
