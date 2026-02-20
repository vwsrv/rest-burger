import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addAsyncThunkCases } from '@/app/store/utils';
import type { TOrder, TOrderState } from './types';
import { createOrderThunk } from './thunks';

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null,
};

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
    addAsyncThunkCases(builder, createOrderThunk, {
      rejectMessage: 'Something went wrong',
      setPayload: (state, payload) => {
        state.order = payload;
      },
    });
  },
});

export default orderSlice.reducer;
export const { setOrder, clearOrder } = orderSlice.actions;
export { createOrderThunk } from './thunks';
