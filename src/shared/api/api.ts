import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors.ts';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.SERVICE_API as string,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'X-App-Version': import.meta.env.APP_VERSION as string,
    'X-App-Type': import.meta.env.APP_TYPE as string,
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
