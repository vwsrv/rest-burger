import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from '@/entities/order/create/api';
import { getIngredientsIds } from '@/app/store';
import type { TRootState } from '@/app/store';
import type { TOrder, TOrderState } from './types';

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null,
};

export const createOrderThunk = createAsyncThunk('order/createOrder', (_, thunkAPI) => {
  const state = thunkAPI.getState() as TRootState;
  const itemIds = getIngredientsIds(state);

  return createOrder({ ingredients: itemIds }).then((response) => ({
    orderId: response.order.number,
  }));
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TOrder>): void => {
      state.order = action.payload;
    },
    clearOrder: (state): void => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default orderSlice.reducer;
export const { setOrder, clearOrder } = orderSlice.actions;
