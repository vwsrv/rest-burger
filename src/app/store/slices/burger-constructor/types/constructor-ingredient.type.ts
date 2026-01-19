import type { TIngredientItem } from '@/entities/ingridients';

export type TConstructorIngredient = TIngredientItem & {
  uniqueId: string;
};
