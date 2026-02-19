import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  MOCK_BUN,
  MOCK_MAIN,
  MOCK_CONSTRUCTOR_STATE_INITIAL,
  MOCK_CONSTRUCTOR_STATE_WITH_BUN,
} from '@/app/store/__tests__';
import {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient,
  setBun,
} from '@/app/store';
import reducer from './burger-constructor.slice';

type TConstructorState = ReturnType<typeof reducer>;
const getStateWithBun = (): TConstructorState => reducer(undefined, setBun(MOCK_BUN));
const getStateWithBunAndMain = (): TConstructorState =>
  reducer(reducer(undefined, setBun(MOCK_BUN)), addIngredient(MOCK_MAIN));

describe('burgerConstructorSlice', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('will return initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(
        MOCK_CONSTRUCTOR_STATE_INITIAL
      );
    });
  });

  describe('setBun', () => {
    it('will set BUN', () => {
      expect(getStateWithBun()).toEqual(MOCK_CONSTRUCTOR_STATE_WITH_BUN);
    });
  });

  describe('addIngredient', () => {
    it('without BUN-ingredient user cannot add ingredient', () => {
      const state = reducer(undefined, addIngredient(MOCK_MAIN));
      expect(state.items).toHaveLength(0);
    });

    it('with BUN successfully add ingredient with unique id', () => {
      const state = reducer(getStateWithBun(), addIngredient(MOCK_MAIN));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(MOCK_MAIN.id);
      expect(state.items[0].type).toBe('main');
      expect(state.items[0]).toHaveProperty('uniqueId');
    });
  });

  describe('removeIngredient', () => {
    it('will remove ingredient using it index', () => {
      const state = reducer(getStateWithBunAndMain(), removeIngredient(0));
      expect(state.items).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('will replace element: from on to', () => {
      const main2 = { ...MOCK_MAIN, id: 'main-2' };
      let state = reducer(getStateWithBunAndMain(), addIngredient(main2));
      state = reducer(state, moveIngredient({ from: 0, to: 1 }));
      expect(state.items[0].id).toBe('main-2');
      expect(state.items[1].id).toBe('main-1');
    });
  });

  describe('clearConstructor', () => {
    it('will clear ingredients', () => {
      const state = reducer(getStateWithBunAndMain(), clearConstructor());
      expect(state).toEqual(MOCK_CONSTRUCTOR_STATE_INITIAL);
    });
  });
});
