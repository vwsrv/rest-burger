export const MOCK_USER = {
  email: 'user@example.com',
  name: 'Test User',
} as const;

export const MOCK_USER_STATE_INITIAL = {
  user: null,
  isAuthenticated: false,
  loading: false,
  saving: false,
  error: null,
} as const;

export const MOCK_USER_STATE_AUTHENTICATED = {
  user: MOCK_USER,
  isAuthenticated: true,
  loading: false,
  saving: false,
  error: null,
} as const;

export const MOCK_USER_STATE_LOADING = {
  user: null,
  isAuthenticated: false,
  loading: true,
  saving: false,
  error: null,
} as const;

export const MOCK_USER_STATE_ERROR = {
  user: null,
  isAuthenticated: false,
  loading: false,
  saving: false,
  error: 'Ошибка входа',
} as const;
