import type { TIngredientGroup } from '@/entities/ingridients';

export type TIngredientsState = {
  items: TIngredientGroup[] | [];
  activeTab: string | null;
  loading: boolean;
  error: string | null;
};
