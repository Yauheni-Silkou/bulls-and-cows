import { describe, test, expect } from 'vitest';
import { evaluateGuess } from './evaluateGuess.js';
describe('evaluateGuess', () => {
    test('should return 4 bulls for an exact match', () => {
        const result = evaluateGuess('1234', '1234');
        expect(result).toEqual({ bulls: 4, cows: 0 });
    });
    test('should return 4 cows if all digits are correct but in wrong positions', () => {
        const result = evaluateGuess('1234', '4321');
        expect(result).toEqual({ bulls: 0, cows: 4 });
    });
    test('should correctly count a mix of bulls and cows', () => {
        const result = evaluateGuess('1234', '1432');
        expect(result).toEqual({ bulls: 2, cows: 2 });
    });
    test('should return zeros if there are no matches at all', () => {
        const result = evaluateGuess('1234', '5678');
        expect(result).toEqual({ bulls: 0, cows: 0 });
    });
    test('should evaluate guess case-insensitively for hex system', () => {
        const result = evaluateGuess('12aF', '12Af');
        expect(result).toEqual({ bulls: 4, cows: 0 });
    });
    test('should correctly count mixed case cows in hex system', () => {
        const result = evaluateGuess('12aF', 'Ffa2');
        expect(result).toEqual({ bulls: 1, cows: 3 });
    });
});
