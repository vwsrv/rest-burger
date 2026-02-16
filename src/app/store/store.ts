import { createListenerMiddleware, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/app/store/slices/root-reducer.ts';
import type {
  TAppDispatch as AppDispatch,
  TRootState as RootState,
} from '@/app/store/types/store.type.ts';
import { registerOrderFeedSocket } from '@/app/store/slices/order-feed/utls/register-order-feed-socket';

const listenerMiddleware = createListenerMiddleware<RootState, AppDispatch>();
const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

registerOrderFeedSocket(startAppListening);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export { listenerMiddleware, startAppListening };
