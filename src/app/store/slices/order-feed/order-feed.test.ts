import { beforeEach, describe, expect, it, vi } from 'vitest';
import reducer, {
  clearOrder,
  setOrder,
  setOrderFeedData,
  setWsConnected,
  setWsError,
} from './order-feed.slice';
import {
  MOCK_ORDER_FEED_STATE_INITIAL,
  MOCK_ORDER_ITEM,
  MOCK_ORDER_ITEM_PENDING,
} from '@/app/store/__tests__';

type TOrderFeedState = ReturnType<typeof reducer>;
const getStateWithOrder = (): TOrderFeedState =>
  reducer(undefined, setOrder(MOCK_ORDER_ITEM));

describe('orderFeedSlice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        MOCK_ORDER_FEED_STATE_INITIAL
      );
    });
  });

  describe('setOrderFeedData', () => {
    it('sets orders, total, totalDay and clears wsError', () => {
      const state = reducer(
        undefined,
        setOrderFeedData({
          orders: [MOCK_ORDER_ITEM, MOCK_ORDER_ITEM_PENDING],
          total: 100,
          totalToday: 10,
        })
      );
      expect(state.orders).toHaveLength(2);
      expect(state.total).toBe(100);
      expect(state.totalDay).toBe(10);
      expect(state.wsError).toBeNull();
    });
  });

  describe('setWsConnected', () => {
    it('sets wsConnected', () => {
      const state = reducer(undefined, setWsConnected(true));
      expect(state.wsConnected).toBe(true);
    });
  });

  describe('setWsError', () => {
    it('sets wsError', () => {
      const state = reducer(undefined, setWsError('Connection failed'));
      expect(state.wsError).toBe('Connection failed');
    });
  });

  describe('setOrder', () => {
    it('sets order', () => {
      expect(getStateWithOrder().order).toEqual(MOCK_ORDER_ITEM);
    });
  });

  describe('clearOrder', () => {
    it('clears order', () => {
      const state = reducer(getStateWithOrder(), clearOrder());
      expect(state.order).toBeNull();
    });
  });
});
