import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TOrderItem } from '@/entities/order';
import type { TOrderFeedState } from '@/app/store/slices/order-feed/types';

const initialState: TOrderFeedState = {
  orders: null,
  order: null,
  total: 0,
  totalDay: 0,
  wsConnected: false,
  wsError: null,
};

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    setOrderFeedData: (
      state,
      action: PayloadAction<{
        orders: TOrderItem[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalDay = action.payload.totalToday;
      state.wsError = null;
    },
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
    setWsError: (state, action: PayloadAction<string | null>) => {
      state.wsError = action.payload;
    },
    setOrder: (state, action: PayloadAction<TOrderItem | null>) => {
      state.order = action.payload;
    },
    wsConnect: (_, _action: PayloadAction<string>) => {},
    wsDisconnect: () => {},
  },
});

export default orderFeedSlice.reducer;
export const {
  setOrderFeedData,
  setOrder,
  setWsConnected,
  setWsError,
  wsConnect,
  wsDisconnect,
} = orderFeedSlice.actions;
