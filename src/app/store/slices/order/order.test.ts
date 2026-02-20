import { beforeEach, describe, vi, it, expect } from 'vitest';
import reducer, { clearOrder, createOrderThunk, setOrder } from './order.slice';
import {
  MOCK_ORDER,
  MOCK_ORDER_STATE_FULFILLED,
  MOCK_ORDER_STATE_INITIAL,
  MOCK_ORDER_STATE_LOADING,
} from '@/app/store/__tests__';

type TOrderState = ReturnType<typeof reducer>;
const getStateWithOrder = (): TOrderState => reducer(undefined, setOrder(MOCK_ORDER));
const getStatePending = (): TOrderState =>
  reducer(undefined, createOrderThunk.pending('req-id'));

describe('orderSlice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(MOCK_ORDER_STATE_INITIAL);
    });
  });

  describe('setOrder', () => {
    it('sets order', () => {
      expect(getStateWithOrder()).toEqual(MOCK_ORDER_STATE_FULFILLED);
    });
  });

  describe('clearOrder', () => {
    it('clears order', () => {
      const state = reducer(getStateWithOrder(), clearOrder());
      expect(state.order).toBeNull();
    });
  });

  describe('createOrderThunk', () => {
    it('pending: sets loading true, error null', () => {
      expect(getStatePending()).toEqual(MOCK_ORDER_STATE_LOADING);
    });

    it('fulfilled: sets order, loading false', () => {
      const state = reducer(
        getStatePending(),
        createOrderThunk.fulfilled(MOCK_ORDER, 'req-id', undefined)
      );
      expect(state).toEqual(MOCK_ORDER_STATE_FULFILLED);
    });

    it('rejected: sets error', () => {
      const state = reducer(
        getStatePending(),
        createOrderThunk.rejected(new Error('Failed'), 'req-id', undefined)
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed');
    });
  });
});
