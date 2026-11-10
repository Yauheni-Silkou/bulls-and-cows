export interface GuessResult {
  bulls: number;
  cows: number;
}

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const lowerSecret = secret.toLowerCase();
  const lowerGuess = guess.toLowerCase();

  const guessChars = lowerGuess.split('');

  const bulls = guessChars.filter((char, index) => char === lowerSecret[index]).length;

  const cows = guessChars.filter(
    (char, index) => char !== lowerSecret[index] && lowerSecret.includes(char)
  ).length;

  return { bulls, cows };
};
