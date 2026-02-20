import { beforeEach, describe, expect, it, vi } from 'vitest';
import reducer, { clearAuth, clearError, loginUserThunk, setUser } from './user.slice';
import type { TLoginRequest } from '@/entities/user/auth/models';
import {
  MOCK_USER,
  MOCK_USER_STATE_AUTHENTICATED,
  MOCK_USER_STATE_INITIAL,
  MOCK_USER_STATE_LOADING,
} from '@/app/store/__tests__';

const MOCK_REQUEST: TLoginRequest = { email: '', password: '' };
type TUserState = ReturnType<typeof reducer>;

const getStateWithUser = (): TUserState => reducer(undefined, setUser(MOCK_USER));
const getStateLoginPending = (): TUserState =>
  reducer(undefined, loginUserThunk.pending('req-id', MOCK_REQUEST));

describe('userSlice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(MOCK_USER_STATE_INITIAL);
    });
  });

  describe('setUser', () => {
    it('sets user', () => {
      expect(getStateWithUser().user).toEqual(MOCK_USER);
    });
  });

  describe('clearAuth', () => {
    it('clears user', () => {
      const state = reducer(getStateWithUser(), clearAuth());
      expect(state.user).toBeNull();
    });
  });

  describe('clearError', () => {
    it('clears loading, saving, error', () => {
      const state = reducer(getStateLoginPending(), clearError());
      expect(state.loading).toBe(false);
      expect(state.saving).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('loginUserThunk', () => {
    it('pending: sets loading true, error null', () => {
      expect(getStateLoginPending()).toEqual(MOCK_USER_STATE_LOADING);
    });

    it('fulfilled: sets user, isAuthenticated true', () => {
      const state = reducer(
        getStateLoginPending(),
        loginUserThunk.fulfilled(MOCK_USER, 'req-id', MOCK_REQUEST)
      );
      expect(state).toEqual(MOCK_USER_STATE_AUTHENTICATED);
    });

    it('rejected: sets error message', () => {
      const state = reducer(
        getStateLoginPending(),
        loginUserThunk.rejected(new Error('Invalid credentials'), 'req-id', MOCK_REQUEST)
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });
  });
});
