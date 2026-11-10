export const createDigitValidator = (base) => (char) => {
    if (char.length !== 1) {
        return false;
    }
    const lowerChar = char.toLowerCase();
    const digits = '0123456789abcdef';
    const validDigits = digits.slice(0, base);
    return validDigits.includes(lowerChar);
};
