import type { TIngredientGroup, TIngredientItem } from '@/entities/ingridients';
import { groupBy } from './group.by.util';

export type TOrderLineItem = {
  id: string;
  name: string;
  count: number;
  price: number;
  image: string;
};

export const getIngredientsByIdMap = (
  groups: TIngredientGroup[]
): Map<string, TIngredientItem> => {
  const map = new Map<string, TIngredientItem>();
  groups.forEach((group) => {
    group.items.forEach((item) => {
      map.set(item.id, item);
    });
  });
  return map;
};

export type TOrderIngredientsData = {
  cost: number;
  images: string[];
  lineItems: TOrderLineItem[];
};

export const getOrderIngredientsData = (
  ingredientIds: string[],
  ingredientsById: Map<string, TIngredientItem>
): TOrderIngredientsData => {
  const idToCount = groupBy(
    ingredientIds.map((id) => ({ id })),
    'id'
  ) as Record<string, { id: string }[]>;
  const uniqueIds = Object.keys(idToCount);

  const getPrice = (id: string) => Number(ingredientsById.get(id)?.price) || 0;
  const cost = ingredientIds.reduce((sum, id) => sum + getPrice(id), 0);

  const images = uniqueIds
    .map((id) => ingredientsById.get(id)?.image)
    .filter((src): src is string => Boolean(src));

  const lineItems: TOrderLineItem[] = uniqueIds
    .map((id) => {
      const item = ingredientsById.get(id);
      if (!item?.image) return null;
      return {
        id,
        name: item.name,
        count: idToCount[id].length,
        price: getPrice(id),
        image: item.image,
      };
    })
    .filter((x): x is TOrderLineItem => x !== null);

  return { cost, images, lineItems };
};
