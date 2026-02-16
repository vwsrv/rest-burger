import type { rootReducer } from '@/app/store/slices/root-reducer.ts';
import type { ThunkDispatch } from 'redux-thunk';
import type { UnknownAction } from '@reduxjs/toolkit';

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ThunkDispatch<TRootState, void, UnknownAction>;
