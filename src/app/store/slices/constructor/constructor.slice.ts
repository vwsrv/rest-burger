import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TIngredientItem } from '@/entities/ingridients';

type TConstructorState = {
  items: TIngredientItem[];
};

const initialState: TConstructorState = {
  items: [],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredientItem>) => {
      state.items.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [movedItem] = state.items.splice(from, 1);
      state.items.splice(to, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.items = [];
    },
  },
});

export default constructorSlice.reducer;
export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  constructorSlice.actions;
