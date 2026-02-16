import type {
  TRefreshTokenRequest,
  TRefreshTokenResponse,
} from '@/entities/user/token/models';
import axios from 'axios';

export const refreshToken = (
  data: TRefreshTokenRequest
): Promise<TRefreshTokenResponse> => {
  return axios
    .post<TRefreshTokenResponse>(
      `${import.meta.env.SERVICE_BURGER_API}/api/auth/token`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((res) => res.data);
};
