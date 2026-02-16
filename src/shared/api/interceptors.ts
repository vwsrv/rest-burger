import { deleteCookie, getCookie, setCookie } from '@/entities/user/auth/utils';
import type { RequestConfig } from '@/shared/error-boundary/types';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getItem, removeItem, setItem } from '@/shared/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { refreshToken } from '@/entities/user/token/api/api.ts';

export const AUTH_SESSION_EXPIRED_EVENT = 'auth:session-expired';

const clearAuthStorage = (): void => {
  deleteCookie(ACCESS_TOKEN_KEY);
  removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
};

type ConsoleError = {
  status: number;
  data: unknown;
};

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const requestConfig = config as RequestConfig;

  if (requestConfig.ignoreXHeaders) {
    config.headers?.set('Authorization', undefined);
    config.headers?.set('X-Token', undefined);
    config.headers?.set('X-App-Version', undefined);
    config.headers?.set('X-App-Type', undefined);
    return config;
  }

  if (requestConfig.requiresAuth) {
    const token = getCookie(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers?.set('Authorization', `Bearer ${token}`);
    }
  }

  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = (error: AxiosError): Promise<never> => {
  if (error.response) {
    const errorMessage: ConsoleError = {
      status: error.response.status,
      data: error.response.data,
    };
    console.error(errorMessage);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error('Error', error.message);
  }

  return Promise.reject(error);
};

export const refreshInterceptor = (failedRequest: AxiosError): Promise<void> => {
  const refreshTokenValue = getItem<string>(REFRESH_TOKEN_KEY);

  if (!refreshTokenValue) {
    clearAuthStorage();
    return Promise.reject(failedRequest);
  }

  return refreshToken({ token: refreshTokenValue })
    .then((response) => {
      setCookie(ACCESS_TOKEN_KEY, response.accessToken, 20);
      setItem(REFRESH_TOKEN_KEY, response.refreshToken);

      if (failedRequest.config?.headers) {
        const formattedToken = response.accessToken.startsWith('Bearer ')
          ? response.accessToken.split('Bearer ')[1]
          : response.accessToken;
        failedRequest.config.headers.Authorization = `Bearer ${formattedToken}`;
      }

      return Promise.resolve();
    })
    .catch(() => {
      clearAuthStorage();
      return Promise.reject(failedRequest);
    });
};
