import type { TIngredientGroup, TIngredientItem } from '@/entities/ingridients';

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
