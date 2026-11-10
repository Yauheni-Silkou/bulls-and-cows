import { describe, test, expect } from 'vitest';
import { generateSecret } from './generateSecret.js';

describe('generateSecret', () => {
  test('should generate a predictable secret using a mocked random source', () => {
    let callCount = 0;
    const mockRandomValues = [0.1, 0.4, 0.2, 0.9, 0.5, 0.3, 0.7, 0.8, 0.0, 0.6];
    const mockRandom = () => mockRandomValues[callCount++] ?? 0;

    const secret = generateSecret(4, 10, mockRandom);

    expect(secret).toBe('4052');
    expect(secret.length).toBe(4);

    const uniqueDigits = new Set(secret.split(''));
    expect(uniqueDigits.size).toBe(4);
  });

  test('should generate valid secret for hex system', () => {
    let callCount = 0;
    const mockRandomValues = Array(16)
      .fill(0)
      .map((_, i) => i / 16);
    const mockRandom = () => mockRandomValues[callCount++] ?? 0;

    const secret = generateSecret(5, 16, mockRandom);

    expect(secret.length).toBe(5);
    const uniqueDigits = new Set(secret.split(''));
    expect(uniqueDigits.size).toBe(5);
  });
});
