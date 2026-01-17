import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getIngredientsData,
  groupIngredients,
  type TIngredientGroup,
} from '@/entities/ingridients';
import type { TRootState } from '@/app/store';

type TIngredientsState = {
  items: TIngredientGroup[] | [];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  loading: false,
  error: null,
};

export const getIngredients = createAsyncThunk('ingredients/getIngredients', () =>
  getIngredientsData().then(groupIngredients)
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action): void => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default ingredientsSlice.reducer;
export const { setIngredients } = ingredientsSlice.actions;
export const selectIngredients = ({ ingredients: { items } }: TRootState) => items;
export const selectIngredientsLoading = ({ ingredients: { loading } }: TRootState) =>
  loading;
export const selectIngredientsError = ({ ingredients: { error } }: TRootState) => error;
