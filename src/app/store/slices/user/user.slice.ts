import { createSlice } from '@reduxjs/toolkit';
import { addAsyncThunkCases } from '@/app/store/utils';
import {
  editUserInfoThink,
  getUserInfoThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  resetPasswordThunk,
  restorePasswordThunk,
} from './thunks';

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
    addAsyncThunkCases(builder, loginUserThunk, {
      rejectMessage: 'Ошибка входа',
      setPayload: (state, payload) => {
        state.user = payload;
        state.isAuthenticated = true;
      },
    });
    addAsyncThunkCases(builder, registerUserThunk, {
      rejectMessage: 'Ошибка регистрации',
      setPayload: (state, payload) => {
        state.user = payload;
        state.isAuthenticated = true;
      },
    });
    addAsyncThunkCases(builder, logoutUserThunk, {
      rejectMessage: 'Ошибка выхода',
      onFulfilled: (state) => {
        state.user = null;
        state.isAuthenticated = false;
      },
    });
    addAsyncThunkCases(builder, getUserInfoThunk, {
      rejectMessage: 'Ошибка при получении данных о пользователе',
      setPayload: (state, payload) => {
        state.user = payload;
      },
      onRejected: (state, action) => {
        const status = (action.payload as { status?: number } | undefined)?.status;
        if (status === 401) return;
        state.error =
          (action.payload as { message?: string } | undefined)?.message ||
          action.error.message ||
          'Ошибка при получении данных о пользователе';
      },
    });
    addAsyncThunkCases(builder, editUserInfoThink, {
      loadingKey: 'saving',
      rejectMessage: 'Ошибка при изменении данных о пользователе',
      setPayload: (state, payload) => {
        state.user = payload;
      },
    });
    addAsyncThunkCases(builder, restorePasswordThunk, {
      rejectMessage: 'Ошибка при попытке восстановить пароль',
    });
    addAsyncThunkCases(builder, resetPasswordThunk, {
      rejectMessage: 'Ошибка при сбросе пароля',
    });
  },
});

export default userSlice.reducer;
export const { setUser, clearAuth, clearError } = userSlice.actions;
export * from './thunks';
