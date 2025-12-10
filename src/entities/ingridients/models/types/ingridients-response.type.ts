import type { IngredientDTO } from '@/entities/ingridients/models/dto';

export type TIngredientsResponse = {
  success: boolean;
  data: IngredientDTO[];
};
