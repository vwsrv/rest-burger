import type {
  TUserInfoRequest,
  TUserInfoResponse,
} from '@/entities/user/profile/models/types';
import { api } from '@/shared/api';

export const getUserInfo = async (): Promise<TUserInfoResponse> => {
  return api
    .get('/api/auth/user', {
      baseURL: import.meta.env.SERVICE_BURGER_API,
      requiresAuth: true,
    })
    .then((res) => {
      return res.data;
    });
};

export const editUserInfo = async (
  data: TUserInfoRequest
): Promise<TUserInfoResponse> => {
  return api
    .patch('/api/auth/user', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
      requiresAuth: true,
    })
    .then((res) => {
      return res.data;
    });
};
