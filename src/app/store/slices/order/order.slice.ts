import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TOrder = {
  orderId: number;
};

type TOrderState = {
  order: TOrder | null;
};

const initialState: TOrderState = {
  order: null,
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
});

export default orderSlice.reducer;
export const { setOrder, clearOrder } = orderSlice.actions;
