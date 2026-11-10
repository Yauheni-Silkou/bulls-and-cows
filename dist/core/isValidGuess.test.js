import { describe, test, expect } from 'vitest';
import { isValidGuess } from './isValidGuess.js';
describe('isValidGuess', () => {
    test('should return true for a perfectly valid decimal guess', () => {
        expect(isValidGuess('1234', 4, 10)).toBe(true);
    });
    test('should return false if length is incorrect', () => {
        expect(isValidGuess('123', 4, 10)).toBe(false);
        expect(isValidGuess('12345', 4, 10)).toBe(false);
    });
    test('should return false if digits are duplicated', () => {
        expect(isValidGuess('1123', 4, 10)).toBe(false);
        expect(isValidGuess('1232', 4, 10)).toBe(false);
    });
    test('should return false if characters do not match the base', () => {
        expect(isValidGuess('1289', 4, 8)).toBe(false);
        expect(isValidGuess('123a', 4, 10)).toBe(false);
    });
    test('should validate hex guesses case-insensitively', () => {
        expect(isValidGuess('12aF', 4, 16)).toBe(true);
        expect(isValidGuess('12aG', 4, 16)).toBe(false);
    });
    test('should return true for valid guesses with leading zeros', () => {
        expect(isValidGuess('0123', 4, 10)).toBe(true);
    });
});
