import { useMemo } from 'react';
import type { TIngredientItem } from '@/entities/ingridients';
import {
  getOrderIngredientsData,
  type TOrderIngredientsData,
} from '@/shared/utils/order-ingredients.util';

export const useIngredients = (
  ingredientIds: string[],
  ingredientsById: Map<string, TIngredientItem>
): TOrderIngredientsData => {
  return useMemo(
    () => getOrderIngredientsData(ingredientIds, ingredientsById),
    [ingredientIds, ingredientsById]
  );
};
