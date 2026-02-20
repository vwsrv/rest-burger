import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from '@/entities/order/create/api';
import { getIngredientsIds } from '@/app/store';
import type { TRootState } from '@/app/store';

export const createOrderThunk = createAsyncThunk('order/createOrder', (_, thunkAPI) => {
  const state = thunkAPI.getState() as TRootState;
  const itemIds = getIngredientsIds(state);

  return createOrder({ ingredients: itemIds }).then((response) => ({
    orderId: response.order.number,
  }));
});
