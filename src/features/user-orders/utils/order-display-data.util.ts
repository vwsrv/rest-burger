import type { TIngredientGroup, TIngredientItem } from '@/entities/ingridients';
import type { TOrderItem } from '@/entities/order';

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

export function getOrderDisplayData(
  order: TOrderItem,
  ingredientsById: Map<string, TIngredientItem>
): { images: string[]; cost: number } {
  const uniqueIngredientIds = [...new Set(order.ingredients)];

  const images = uniqueIngredientIds
    .map((id) => ingredientsById.get(id)?.image)
    .filter((src): src is string => Boolean(src));

  const getPrice = (id: string) => Number(ingredientsById.get(id)?.price) || 0;

  const cost = order.ingredients.reduce((sum, id) => sum + getPrice(id), 0);
  return { images, cost };
}
