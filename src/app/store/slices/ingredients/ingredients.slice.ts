import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getIngredientsData,
  groupIngredients,
  type TIngredientGroup,
} from '@/entities/ingridients';

type TIngredientsState = {
  items: TIngredientGroup[] | [];
  activeTab: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  activeTab: null,
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
    setActiveTab: (state, action: PayloadAction<string | null>): void => {
      state.activeTab = action.payload;
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
export const { setIngredients, setActiveTab } = ingredientsSlice.actions;
