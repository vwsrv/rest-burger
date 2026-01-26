export const removeItem = (key: string): void => {
  if (!window.localStorage) return;

  window.localStorage.removeItem(key);
};
