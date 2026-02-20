import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TPasswordRestoreRequest } from '@/entities/user/password/models';
import { restorePassword } from '@/entities/user/password/api';

export const restorePasswordThunk = createAsyncThunk(
  'user/passwordRestore',
  (data: TPasswordRestoreRequest) =>
    restorePassword(data).then((response) => {
      if (!response.success) {
        throw new Error(response.message || 'Ошибка при попытке восстановить пароль');
      }
      return response;
    })
);
