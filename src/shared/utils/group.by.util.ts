export const groupBy = <T, K extends keyof T>(
  items: T[],
  key: K
): Record<T[K] & PropertyKey, T[]> => {
  const result = {} as Record<T[K] & PropertyKey, T[]>;

  for (const item of items) {
    const category = item[key] as T[K] & PropertyKey;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
  }

  return result;
};
