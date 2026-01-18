import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TIngredientItem } from '@/entities/ingridients';
import type { TRootState } from '@/app/store';

type TConstructorState = {
  items: TIngredientItem[];
  bun: TIngredientItem | null;
};

const initialState: TConstructorState = {
  items: [],
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
    addIngredient: (state, action: PayloadAction<TIngredientItem>) => {
      if (action.payload.type !== 'bun') {
        state.items.push(action.payload);
      }
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
