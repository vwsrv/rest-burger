import { useDispatch, useSelector } from 'react-redux';
import type { TAppDispatch, TRootState } from '@/app/store/store.ts';

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
