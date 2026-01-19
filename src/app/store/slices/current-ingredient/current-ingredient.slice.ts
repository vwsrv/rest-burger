import { createSlice } from '@reduxjs/toolkit';
import type { TCurrentIngredientState } from './types';

const initialState: TCurrentIngredientState = {
  item: null,
};

const currentIngredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredientItem: (state, action): void => {
      state.item = action.payload;
    },

    clearIngredientItem: (state): void => {
      state.item = null;
    },
  },
});

export default currentIngredientSlice.reducer;
export const { setIngredientItem, clearIngredientItem } = currentIngredientSlice.actions;
