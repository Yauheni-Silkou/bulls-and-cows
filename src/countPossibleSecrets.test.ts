import { describe, test, expect } from 'vitest';
import { countPossibleSecrets } from './countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  test('should return 1 if length is 0 (base case)', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  test('should correctly calculate combinations for binary system (2, 2)', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  test('should correctly calculate combinations for decimal system (4, 10)', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  test('should correctly calculate combinations for hex system (3, 16)', () => {
    expect(countPossibleSecrets(3, 16)).toBe(3360);
  });

  test('should use memoization cache for repeated calls', () => {
    const firstCall = countPossibleSecrets(5, 10);
    const secondCall = countPossibleSecrets(5, 10);
    expect(firstCall).toBe(30240);
    expect(secondCall).toBe(30240);
  });
});
