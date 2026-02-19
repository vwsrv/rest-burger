import type { TCurrentIngredientState } from '@/app/store/slices/current-ingredient/types';
import { MOCK_BUN } from './ingredients.mock';

export const MOCK_CURRENT_INGREDIENT_STATE_EMPTY: TCurrentIngredientState = {
  item: null,
};

export const MOCK_CURRENT_INGREDIENT_STATE_WITH_ITEM: TCurrentIngredientState = {
  item: MOCK_BUN,
};
