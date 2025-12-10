import type { IngredientDTO } from '@/entities/ingridients/models/dto';
import type { TIngredientsResponse } from '@/entities/ingridients/models/types';
import type { TIngredient } from '@/entities/ingridients/models/types/ingredient.type.ts';

export const ingredientsMapper = (dto: IngredientDTO) => {
  return {
    id: dto._id,
    name: dto.name,
    type: dto.type,
    proteins: dto.proteins,
    fat: dto.fat,
    card: dto.carbohydrates,
    cal: dto.calories,
    price: dto.price,
    image: dto.image,
    imageLg: dto.image_large,
    imageMb: dto.image_mobile,
    v: dto.__v,
  };
};

export const ingredientMapper = (response: TIngredientsResponse): TIngredient[] => {
  if (!response || (response && 'error' in response)) return [];

  return response.data.map(ingredientsMapper);
};
