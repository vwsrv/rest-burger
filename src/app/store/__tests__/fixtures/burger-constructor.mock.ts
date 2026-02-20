import type { TConstructorState } from '@/app/store/slices/burger-constructor/types';
import type { TConstructorIngredient } from '@/app/store';
import { MOCK_BUN, MOCK_MAIN } from './ingredients.mock';

export const MOCK_CONSTRUCTOR_STATE_INITIAL: TConstructorState = {
  items: [],
  itemIds: [],
  price: 0,
  bun: null,
};

export const MOCK_CONSTRUCTOR_INGREDIENT: TConstructorIngredient = {
  ...MOCK_MAIN,
  uniqueId: 'unique-main-1',
};

export const MOCK_CONSTRUCTOR_STATE_WITH_BUN: TConstructorState = {
  items: [],
  itemIds: [],
  price: 0,
  bun: MOCK_BUN,
};

export const MOCK_CONSTRUCTOR_STATE_FULL: TConstructorState = {
  items: [MOCK_CONSTRUCTOR_INGREDIENT],
  itemIds: [MOCK_BUN.id, MOCK_BUN.id, MOCK_MAIN.id],
  price: 400,
  bun: MOCK_BUN,
};
