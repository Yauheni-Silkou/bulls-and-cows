import { describe, test, expect } from 'vitest';
import { createDigitValidator } from './createDigitValidator.js';
describe('createDigitValidator', () => {
    test('should validate binary system (base 2)', () => {
        const isBinDigit = createDigitValidator(2);
        expect(isBinDigit('0')).toBe(true);
        expect(isBinDigit('1')).toBe(true);
        expect(isBinDigit('2')).toBe(false);
        expect(isBinDigit('a')).toBe(false);
    });
    test('should validate octal system (base 8)', () => {
        const isOctDigit = createDigitValidator(8);
        expect(isOctDigit('0')).toBe(true);
        expect(isOctDigit('7')).toBe(true);
        expect(isOctDigit('8')).toBe(false);
    });
    test('should validate decimal system (base 10)', () => {
        const isDecDigit = createDigitValidator(10);
        expect(isDecDigit('0')).toBe(true);
        expect(isDecDigit('9')).toBe(true);
        expect(isDecDigit('a')).toBe(false);
    });
    test('should validate hexadecimal system (base 16) case-insensitively', () => {
        const isHexDigit = createDigitValidator(16);
        expect(isHexDigit('0')).toBe(true);
        expect(isHexDigit('9')).toBe(true);
        expect(isHexDigit('a')).toBe(true);
        expect(isHexDigit('F')).toBe(true);
        expect(isHexDigit('g')).toBe(false);
    });
    test('should return false for empty string or long strings', () => {
        const isDecDigit = createDigitValidator(10);
        expect(isDecDigit('')).toBe(false);
        expect(isDecDigit('10')).toBe(false);
    });
});
