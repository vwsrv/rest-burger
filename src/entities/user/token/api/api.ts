import type {
  TRefreshTokenRequest,
  TRefreshTokenResponse,
} from '@/entities/user/token/models';
import { api } from '@/shared/api';

export const refreshToken = async (
  data: TRefreshTokenRequest
): Promise<TRefreshTokenResponse> => {
  return api
    .post('/api/auth/token', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((res) => {
      return res.data;
    });
};
