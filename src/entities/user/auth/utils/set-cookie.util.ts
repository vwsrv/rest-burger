import { MIN_IN_HOUR, MS_IN_SEC } from '@/shared/constants';

export const setCookie = (name: string, value: string, minutes: number) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * MIN_IN_HOUR * MS_IN_SEC);

  const expires = '; expires=' + date.toUTCString();

  const formattedToken = value.startsWith('Bearer ') ? value.split('Bearer ')[1] : value;

  document.cookie = `${name}=${formattedToken || ''}${expires}; path=/; Secure; SameSite=Strict`;
};
