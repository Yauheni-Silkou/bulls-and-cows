export const evaluateGuess = (secret, guess) => {
    const lowerSecret = secret.toLowerCase();
    const lowerGuess = guess.toLowerCase();
    const guessChars = lowerGuess.split('');
    const bulls = guessChars.filter((char, index) => char === lowerSecret[index]).length;
    const cows = guessChars.filter((char, index) => char !== lowerSecret[index] && lowerSecret.includes(char)).length;
    return { bulls, cows };
};
