import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '@/entities/user/auth/api';
import type { TLoginRequest } from '@/entities/user/auth/models';
import { setCookie } from '@/entities/user/auth/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { TOKEN_MIN_EXPIRATION } from '@/shared/constants';
import { setItem } from '@/shared/utils';

export const loginUserThunk = createAsyncThunk('user/login', (data: TLoginRequest) =>
  loginUser(data).then((response) => {
    setCookie(ACCESS_TOKEN_KEY, response.accessToken, TOKEN_MIN_EXPIRATION);
    setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    return {
      email: response.user.email,

      name: response.user.name,
    };
  })
);
