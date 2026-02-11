import type { TOrder } from '@/app/store';

export type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};
