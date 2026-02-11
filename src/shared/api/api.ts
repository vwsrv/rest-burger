import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {
  errorInterceptor,
  refreshInterceptor,
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

createAuthRefreshInterceptor(api, refreshInterceptor, {
  statusCodes: [401, 403],
  pauseInstanceWhileRefreshing: true,
});

api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
