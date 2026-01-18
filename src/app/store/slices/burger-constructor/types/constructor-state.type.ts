import type { TIngredientItem } from '@/entities/ingridients';
import type { TConstructorIngredient } from '@/app/store';

export type TConstructorState = {
  items: TConstructorIngredient[];
  itemIds: string[];
  price: number;
  bun: TIngredientItem | null;
};
