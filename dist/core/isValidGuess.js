import { createDigitValidator } from './createDigitValidator.js';
export const isValidGuess = (guess, length, base) => {
    if (guess.length !== length) {
        return false;
    }
    const lowerGuessChars = guess.toLowerCase().split('');
    const uniqueChars = new Set(lowerGuessChars);
    if (uniqueChars.size !== length) {
        return false;
    }
    const isCharValid = createDigitValidator(base);
    return lowerGuessChars.every(isCharValid);
};
