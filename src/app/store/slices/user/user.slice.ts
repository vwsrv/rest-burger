import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { loginUser, logoutUser, registerUser } from '@/entities/user/auth/api';
import type {
  TLoginRequest,
  TLogoutRequest,
  TRegisterRequest,
} from '@/entities/user/auth/models';
import { deleteCookie, setCookie } from '@/entities/user/auth/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { TOKEN_MIN_EXPIRATION } from '@/shared/constants';
import { removeItem, setItem } from '@/shared/utils';
import { editUserInfo, getUserInfo } from '@/entities/user/profile/api';
import type { TUserInfoRequest } from '@/entities/user/profile/models/types';
import type {
  TPasswordResetRequest,
  TPasswordRestoreRequest,
} from '@/entities/user/password/models';
import { resetPassword, restorePassword } from '@/entities/user/password/api';

type TUser = {
  email: string;
  name: string;
};

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  saving: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  saving: false,
  error: null,
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  (data: TRegisterRequest) => {
    return registerUser(data).then((response) => {
      setCookie(ACCESS_TOKEN_KEY, response.accessToken, TOKEN_MIN_EXPIRATION);
      setItem(REFRESH_TOKEN_KEY, response.refreshToken);

      return {
        email: response.user.email,
        name: response.user.name,
      };
    });
  }
);

export const loginUserThunk = createAsyncThunk('user/login', (data: TLoginRequest) => {
  return loginUser(data).then((response) => {
    setCookie(ACCESS_TOKEN_KEY, response.accessToken, TOKEN_MIN_EXPIRATION);
    setItem(REFRESH_TOKEN_KEY, response.refreshToken);

    return {
      email: response.user.email,
      name: response.user.name,
    };
  });
});

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  (data: TLogoutRequest) => {
    return logoutUser(data).then(() => {
      deleteCookie(ACCESS_TOKEN_KEY);
      removeItem(REFRESH_TOKEN_KEY);
    });
  }
);

export const getUserInfoThunk = createAsyncThunk(
  'user/info',
  (_, { rejectWithValue }) => {
    return getUserInfo()
      .then((response) => ({
        email: response.user.email,
        name: response.user.name,
      }))
      .catch((err: AxiosError) => {
        throw rejectWithValue({
          message: err.message,
          status: err.response?.status,
        });
      });
  }
);

export const editUserInfoThink = createAsyncThunk(
  'user/edit',
  (data: TUserInfoRequest) => {
    return editUserInfo(data).then((response) => {
      return {
        email: response.user.email,
        name: response.user.name,
      };
    });
  }
);

export const restorePasswordThunk = createAsyncThunk(
  'user/passwordRestore',
  (data: TPasswordRestoreRequest) => {
    return restorePassword(data).then((response) => {
      if (!response.success) {
        throw new Error(response.message || 'Ошибка при попытке восстановить пароль');
      }
      return response;
    });
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'user/passwordReset',
  (data: TPasswordResetRequest) => {
    return resetPassword(data).then((response) => {
      if (!response.success) {
        throw new Error(response.message || 'Ошибка при сбросе пароля');
      }
      return response;
    });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearAuth: (state) => {
      state.user = null;
    },

    clearError: (state) => {
      state.loading = false;
      state.saving = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка выхода';
      })

      .addCase(getUserInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        const status = (action.payload as { status?: number } | undefined)?.status;
        if (status === 401) return;
        state.error =
          (action.payload as { message?: string } | undefined)?.message ||
          action.error.message ||
          'Ошибка при получении данных о пользователе';
      })

      .addCase(editUserInfoThink.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(editUserInfoThink.fulfilled, (state, action) => {
        state.saving = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(editUserInfoThink.rejected, (state, action) => {
        state.saving = false;
        state.error =
          action.error.message || 'Ошибка при изменении данных о пользователе';
      })

      .addCase(restorePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restorePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(restorePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при попытке восстановить пароль';
      })

      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при сбросе пароля';
      });
  },
});

export default userSlice.reducer;
export const { setUser, clearAuth, clearError } = userSlice.actions;
