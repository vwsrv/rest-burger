import type { TIngredientItem } from '@/entities/ingridients';
import { createSlice } from '@reduxjs/toolkit';

type TIngredientsState = {
  items: TIngredientItem[] | [];
};

const initialState: TIngredientsState = {
  items: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action): void => {
      state.items = action.payload;
    },
  },
});

export default ingredientsSlice.reducer;
export const { setIngredients } = ingredientsSlice.actions;
