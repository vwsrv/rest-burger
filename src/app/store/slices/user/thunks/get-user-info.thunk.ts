import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { getUserInfo } from '@/entities/user/profile/api';

export const getUserInfoThunk = createAsyncThunk('user/info', (_, { rejectWithValue }) =>
  getUserInfo()
    .then((response) => ({
      email: response.user.email,
      name: response.user.name,
    }))
    .catch((err: AxiosError) => {
      throw rejectWithValue({
        message: err.message,
        status: err.response?.status,
      });
    })
);
