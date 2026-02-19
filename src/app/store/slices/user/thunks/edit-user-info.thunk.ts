import { createAsyncThunk } from '@reduxjs/toolkit';
import { editUserInfo } from '@/entities/user/profile/api';
import type { TUserInfoRequest } from '@/entities/user/profile/models/types';

export const editUserInfoThink = createAsyncThunk(
  'user/edit',
  (data: TUserInfoRequest) =>
    editUserInfo(data).then((response) => ({
      email: response.user.email,
      name: response.user.name,
    }))
);
