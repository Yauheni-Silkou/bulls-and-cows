export interface GuessResult {
  bulls: number;
  cows: number;
}

export const evaluateGuess = (_secret: string, _guess: string): GuessResult => {
  return { bulls: 0, cows: 0 };
};
