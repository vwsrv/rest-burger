import type {
  TLoginRequest,
  TLoginResponse,
  TLogoutRequest,
  TRegisterRequest,
  TRegisterResponse,
} from '@/entities/user/auth/models/types';
import { api, type TBaseResponse } from '@/shared/api';

export const registerUser = async (
  data: TRegisterRequest
): Promise<TRegisterResponse> => {
  return api
    .post<TRegisterResponse>('api/auth/register', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((res) => {
      return res.data;
    });
};

export const loginUser = async (data: TLoginRequest): Promise<TLoginResponse> => {
  return api
    .post<TLoginResponse>('/api/auth/login', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((res) => {
      return res.data;
    });
};

export const logoutUser = async (data: TLogoutRequest): Promise<TBaseResponse> => {
  return api
    .post<TBaseResponse>('api/auth/logout', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((res) => {
      return res.data;
    });
};
