import type { TIngredientItem, TIngredientKind } from '@/entities/ingridients';

export type TIngredientGroup = {
  type: TIngredientKind;
  label: string;
  items: TIngredientItem[];
};
