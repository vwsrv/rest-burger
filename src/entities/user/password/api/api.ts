import type {
  TPasswordRestoreRequest,
  TPasswordRestoreResponse,
} from '@/entities/user/password/models';
import { api } from '@/shared/api';

export const restorePassword = async (
  data: TPasswordRestoreRequest
): Promise<TPasswordRestoreResponse> => {
  return api
    .post('/api/password-reset', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((response) => response.data);
};
