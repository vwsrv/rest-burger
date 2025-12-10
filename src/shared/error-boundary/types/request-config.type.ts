import type { AxiosRequestConfig } from 'axios';

export type RequestConfig = AxiosRequestConfig & {
  ignoreXHeaders?: boolean;
  ignoreErrorStatuses?: number[];
  ignoreAllErrors?: boolean;
};
