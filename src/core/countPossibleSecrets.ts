const cache = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  if (length === 0) {
    return 1;
  }

  const cacheKey = `${length}-${base}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const result = base * countPossibleSecrets(length - 1, base - 1);
  cache.set(cacheKey, result);

  return result;
};
