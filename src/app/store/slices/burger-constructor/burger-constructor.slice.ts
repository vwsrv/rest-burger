import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TIngredientItem } from '@/entities/ingridients';
import type { TConstructorIngredient, TConstructorState, TRootState } from '@/app/store';
import { v4 as uuid4 } from 'uuid';

const initialState: TConstructorState = {
  items: [],
  itemIds: [],
  price: 0,
  bun: null,
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredientItem>) => {
      if (!action.payload) return;
      state.bun = { ...action.payload };
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (!state.bun) {
          return;
        }

        if (action.payload.type !== 'bun') {
          state.items.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredientItem) => {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuid4(),
          },
        };
      },
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [movedItem] = state.items.splice(from, 1);

      if (movedItem) state.items.splice(to, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.items = [];
      state.bun = null;
      state.itemIds = [];
    },
  },
});

export default burgerConstructorSlice.reducer;
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;

export const getIngredientCount =
  (ingredient: TIngredientItem) =>
  (state: TRootState): number => {
    const { bun, items } = state.burgerConstructor;

    if (ingredient.type === 'bun') {
      return bun && bun.id === ingredient.id ? 2 : 0;
    }

    return items?.filter((item) => item.id === ingredient.id)?.length ?? 0;
  };

export const getIngredientsIds = (state: TRootState): string[] => {
  const { bun, items } = state.burgerConstructor;

  const bunIds = bun ? [bun.id, bun.id] : [];
  const itemIds = items.map((item) => item.id);

  return [...bunIds, ...itemIds];
};

export const getTotalPrice = (state: TRootState): number => {
  const { bun, items } = state.burgerConstructor;

  const bunPrice = bun ? Number(bun.price) * 2 : 0;
  const itemsPrice = items.reduce((sum, item) => sum + Number(item.price), 0);

  return bunPrice + itemsPrice;
};
