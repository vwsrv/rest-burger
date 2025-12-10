import { api } from '@/shared/api';
import { AxiosError } from 'axios';
import { type PropsWithChildren, useCallback, useEffect } from 'react';

import type { RequestConfig } from '@/shared/error-boundary/types';

const ApiErrorBoundary = ({ children }: PropsWithChildren): React.ReactNode => {
  const errorHandler = useCallback((error: Error) => {
    if (error instanceof AxiosError) {
      const config = error.config as RequestConfig;

      if (config?.ignoreAllErrors) {
        throw error;
      }

      if (config.ignoreErrorStatuses?.length) {
        if (config.ignoreErrorStatuses.includes(error.status!)) {
          throw error;
        }
      }

      throw error;
    }
  }, []);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(undefined, errorHandler);

    return (): void => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [errorHandler]);

  return children;
};

export default ApiErrorBoundary;
