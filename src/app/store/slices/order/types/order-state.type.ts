import type { TOrder } from './order.type';

export type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};
