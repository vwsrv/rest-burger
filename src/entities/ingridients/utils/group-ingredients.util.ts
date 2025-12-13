import {
  tabsTuple,
  type TIngredientGroup,
  type TIngredientItem,
  type TIngredientKind,
} from '@/entities/ingridients';
import { groupBy } from '@/shared/utils/group.by.util.ts';

export const groupIngredients = (ingredients: TIngredientItem[]): TIngredientGroup[] => {
  const grouped = groupBy(ingredients, 'type') as Record<
    TIngredientKind,
    TIngredientItem[]
  >;

  const typeToLabel: Record<TIngredientKind, string> = {
    bun: tabsTuple[0].label,
    sauce: tabsTuple[1].label,
    main: tabsTuple[2].label,
  };

  const types: TIngredientKind[] = ['bun', 'sauce', 'main'];

  return types.map((type) => ({
    type,
    label: typeToLabel[type],
    items: grouped[type] || [],
  }));
};
