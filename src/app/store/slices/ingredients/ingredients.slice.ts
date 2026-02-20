import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addAsyncThunkCases } from '@/app/store/utils';
import type { TIngredientsState } from './types';
import { getIngredients } from './thunks';

const initialState: TIngredientsState = {
  items: [],
  activeTab: null,
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action): void => {
      state.items = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string | null>): void => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    addAsyncThunkCases(builder, getIngredients, {
      rejectMessage: 'Something went wrong',
      setPayload: (state, payload) => {
        state.items = payload;
      },
    });
  },
});

export default ingredientsSlice.reducer;
export const { setIngredients, setActiveTab } = ingredientsSlice.actions;
export { getIngredients } from './thunks';
