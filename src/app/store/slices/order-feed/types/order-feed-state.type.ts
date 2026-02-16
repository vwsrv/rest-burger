import type { TOrderItem } from '@/entities/order';

export type TOrderFeedState = {
  orders: TOrderItem[] | null;
  order: TOrderItem | null;
  total: number;
  totalDay: number;
  wsConnected: boolean;
  wsError: string | null;
};
