import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    ignoreXHeaders?: boolean;
    ignoreErrorStatuses?: number[];
    ignoreAllErrors?: boolean;
    requiresAuth?: boolean;
  }
}
