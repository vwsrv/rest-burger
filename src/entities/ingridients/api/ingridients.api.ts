import { ingredientMapper } from '@/entities/ingridients/models/mappers';
import { api } from '@/shared/api';

import type {
  TIngredientItem,
  TIngredientsResponse,
} from '@/entities/ingridients/models/types';

export const getIngredientsData = async (): Promise<TIngredientItem[]> => {
  return api
    .get<TIngredientsResponse>('/api/ingredients', {
      baseURL: import.meta.env.SERVICE_BURGER_API,
    })
    .then((response) => response.data)
    .then(ingredientMapper);
};
