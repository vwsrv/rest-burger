import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '@/entities/user/auth/api';
import type { TLogoutRequest } from '@/entities/user/auth/models';
import { deleteCookie } from '@/entities/user/auth/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { removeItem } from '@/shared/utils';

export const logoutUserThunk = createAsyncThunk('user/logout', (data: TLogoutRequest) =>
  logoutUser(data).then(() => {
    deleteCookie(ACCESS_TOKEN_KEY);
    removeItem(REFRESH_TOKEN_KEY);
  })
);
