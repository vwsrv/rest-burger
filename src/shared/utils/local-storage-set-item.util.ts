export const setItem = <T = unknown>(key: string, value: T): void => {
  if (!window.localStorage) return;

  const stringValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringValue);
};
