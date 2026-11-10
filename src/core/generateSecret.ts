export const generateSecret = (length: number, base: number, random = Math.random): string => {
  const alphabet = Array.from({ length: base }, (_, index) => index.toString(base));

  for (let i = alphabet.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = alphabet[i];
    alphabet[i] = alphabet[j];
    alphabet[j] = temp;
  }

  return alphabet.slice(0, length).join('');
};
