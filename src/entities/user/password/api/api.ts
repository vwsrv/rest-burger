import type {
  TPasswordRestoreRequest,
  TPasswordResetRequest,
} from '@/entities/user/password/models';
import { api, type TBaseResponse } from '@/shared/api';

export const restorePassword = async (
  data: TPasswordRestoreRequest
): Promise<TBaseResponse> => {
  return api
    .post('/api/password-reset', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((response) => response.data);
};

export const resetPassword = async (
  data: TPasswordResetRequest
): Promise<TBaseResponse> => {
  return api
    .post('/api/password-reset', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((response) => {
      return response.data;
    });
};
