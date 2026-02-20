import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TPasswordResetRequest } from '@/entities/user/password/models';
import { resetPassword } from '@/entities/user/password/api';

export const resetPasswordThunk = createAsyncThunk(
  'user/passwordReset',
  (data: TPasswordResetRequest) =>
    resetPassword(data).then((response) => {
      if (!response.success) {
        throw new Error(response.message || 'Ошибка при сбросе пароля');
      }
      return response;
    })
);
