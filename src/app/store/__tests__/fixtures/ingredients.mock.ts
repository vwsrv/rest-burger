import type { TIngredientGroup, TIngredientItem } from '@/entities/ingridients';

const baseIngredient = {
  proteins: 1,
  fat: 1,
  carb: 1,
  cal: 1,
  price: '100',
  image: '',
  imageLg: '',
  imageMb: '',
  v: 0,
} as const;

export const MOCK_BUN: TIngredientItem = {
  ...baseIngredient,
  id: 'bun-1',
  name: 'Булка',
  type: 'bun',
};

export const MOCK_MAIN: TIngredientItem = {
  ...baseIngredient,
  id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 2,
  fat: 2,
  carb: 2,
  cal: 2,
  price: '200',
};

export const MOCK_SAUCE: TIngredientItem = {
  ...baseIngredient,
  id: 'sauce-1',
  name: 'Соус',
  type: 'sauce',
};

export const MOCK_INGREDIENT_GROUPS: TIngredientGroup[] = [
  { type: 'bun', label: 'Булки', items: [MOCK_BUN] },
  { type: 'sauce', label: 'Соусы', items: [MOCK_SAUCE] },
  { type: 'main', label: 'Начинки', items: [MOCK_MAIN] },
];

export const MOCK_INGREDIENTS_STATE_INITIAL = {
  items: [],
  activeTab: null,
  loading: false,
  error: null,
} as const;

export const MOCK_INGREDIENTS_STATE_FULFILLED = {
  items: MOCK_INGREDIENT_GROUPS,
  activeTab: 'bun' as const,
  loading: false,
  error: null,
};
