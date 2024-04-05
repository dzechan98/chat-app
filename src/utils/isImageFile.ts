export const isImageFile = (fileName: string) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

  const extension = fileName.split(".").pop()?.toLowerCase();

  return imageExtensions.includes(String(extension));
};
