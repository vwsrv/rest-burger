import { beforeEach, describe, expect, vi, it } from 'vitest';
import reducer, {
  clearIngredientItem,
  setIngredientItem,
} from './current-ingredient.slice';
import {
  MOCK_BUN,
  MOCK_CURRENT_INGREDIENT_STATE_EMPTY,
  MOCK_CURRENT_INGREDIENT_STATE_WITH_ITEM,
} from '@/app/store/__tests__';

type TCurrentIngredientState = ReturnType<typeof reducer>;
const getStateWithItem = (): TCurrentIngredientState =>
  reducer(undefined, setIngredientItem(MOCK_BUN));

describe('currentIngredientSlice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialState', () => {
    it('will return initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        MOCK_CURRENT_INGREDIENT_STATE_EMPTY
      );
    });
  });

  describe('setIngredientItem', () => {
    it('will set ingredient item', () => {
      expect(getStateWithItem()).toEqual(MOCK_CURRENT_INGREDIENT_STATE_WITH_ITEM);
    });
  });

  describe('clearIngredientItem', () => {
    it('will clear ingredient item', () => {
      const state = reducer(getStateWithItem(), clearIngredientItem());
      expect(state).toEqual(MOCK_CURRENT_INGREDIENT_STATE_EMPTY);
    });
  });
});
