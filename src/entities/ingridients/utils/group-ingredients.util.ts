import type { TIngredientItem } from '@/entities/ingridients';

export const groupIngredientsByType = (ingredients: TIngredientItem[]) => {
  return {
    bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
    sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    main: ingredients.filter((ingredient) => ingredient.type === 'main'),
  };
};
