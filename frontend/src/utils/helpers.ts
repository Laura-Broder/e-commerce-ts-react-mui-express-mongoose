export const getRandomCharacter = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export const deepCopy = (original: any): any => {
  return JSON.parse(JSON.stringify(original));
};
