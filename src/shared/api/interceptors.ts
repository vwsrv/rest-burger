import type { RequestConfig } from '@/shared/error-boundary/types';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type ConsoleError = {
  status: number;
  data: unknown;
};

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if ((config as RequestConfig).ignoreXHeaders) {
    config.headers?.set('Authorization', undefined);
    config.headers?.set('X-Token', undefined);
    config.headers?.set('X-App-Version', undefined);
    config.headers?.set('X-App-Type', undefined);
  }

  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
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
    await Promise.reject(error);
  }
};
