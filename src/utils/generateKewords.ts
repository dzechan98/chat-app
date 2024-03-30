export const generateKeywords = (displayName: string): string[] => {
  const name: string[] = displayName
    .toLowerCase()
    .split(" ")
    .filter((word) => word);

  const length: number = name.length;
  const flagArray: boolean[] = [];
  const result: string[] = [];
  const stringArray: string[] = [];

  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: string): string[] => {
    const arrName: string[] = [];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k: number): void {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }
        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords: string[] = stringArray.reduce<string[]>((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
