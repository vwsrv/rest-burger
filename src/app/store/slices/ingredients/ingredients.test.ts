import { beforeEach, expect, vi, describe, it } from 'vitest';
import reducer, {
  getIngredients,
  setActiveTab,
  setIngredients,
} from './ingredients.slice';
import {
  MOCK_INGREDIENT_GROUPS,
  MOCK_INGREDIENTS_STATE_FULFILLED,
  MOCK_INGREDIENTS_STATE_INITIAL,
} from '@/app/store/__tests__';

type TIngredientsState = ReturnType<typeof reducer>;
const REQUEST_ID = 'request-id';
const getStateWithItems = (): TIngredientsState =>
  reducer(undefined, setIngredients(MOCK_INGREDIENT_GROUPS));
const getStatePending = (): TIngredientsState =>
  reducer(undefined, getIngredients.pending(REQUEST_ID));

describe('ingredientsSlice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('will return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        MOCK_INGREDIENTS_STATE_INITIAL
      );
    });
  });

  describe('setIngredients', () => {
    it('sets items and with setActiveTab equals MOCK_INGREDIENTS_STATE_FULFILLED', () => {
      const state = reducer(getStateWithItems(), setActiveTab('bun'));
      expect(state).toEqual(MOCK_INGREDIENTS_STATE_FULFILLED);
    });

    it('clears items when payload is empty array', () => {
      const state = reducer(getStateWithItems(), setIngredients([]));
      expect(state.items).toEqual([]);
    });
  });

  describe('setActiveTab', () => {
    it('sets activeTab to value', () => {
      const state = reducer(undefined, setActiveTab('sauce'));
      expect(state.activeTab).toBe('sauce');
    });

    it('clears activeTab when null', () => {
      const state = reducer(reducer(undefined, setActiveTab('bun')), setActiveTab(null));
      expect(state.activeTab).toBeNull();
    });
  });

  describe('getIngredients (extraReducers)', () => {
    it('pending: sets loading true and clears error', () => {
      expect(getStatePending().loading).toBe(true);
      expect(getStatePending().error).toBeNull();
    });

    it('fulfilled: sets items, loading false, error null', () => {
      const state = reducer(
        getStatePending(),
        getIngredients.fulfilled(MOCK_INGREDIENT_GROUPS, REQUEST_ID)
      );
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(MOCK_INGREDIENT_GROUPS);
      expect(state.error).toBeNull();
    });

    it('rejected: sets loading false and error message', () => {
      const state = reducer(
        getStatePending(),
        getIngredients.rejected(new Error('Network error'), REQUEST_ID)
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });

    it('rejected without message uses fallback', () => {
      const state = reducer(
        getStatePending(),
        getIngredients.rejected(new Error(''), REQUEST_ID)
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Something went wrong');
    });
  });
});
