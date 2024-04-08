export const showTitleSplit = (title: string, length: number) => {
  if (title.length > length) {
    return `${title.slice(0, length - 1)}...`;
  }
  return title;
};
