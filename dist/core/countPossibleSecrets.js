const cache = new Map();
export const countPossibleSecrets = (length, base) => {
    if (length === 0) {
        return 1;
    }
    const cacheKey = `${length}-${base}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }
    const result = base * countPossibleSecrets(length - 1, base - 1);
    cache.set(cacheKey, result);
    return result;
};
