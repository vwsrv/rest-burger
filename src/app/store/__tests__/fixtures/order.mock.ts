export const MOCK_ORDER = {
  orderId: 12345,
} as const;

export const MOCK_ORDER_STATE_INITIAL = {
  order: null,
  loading: false,
  error: null,
} as const;

export const MOCK_ORDER_STATE_FULFILLED = {
  order: MOCK_ORDER,
  loading: false,
  error: null,
} as const;

export const MOCK_ORDER_STATE_LOADING = {
  order: null,
  loading: true,
  error: null,
} as const;

export const MOCK_ORDER_STATE_ERROR = {
  order: null,
  loading: false,
  error: 'Something went wrong',
} as const;
