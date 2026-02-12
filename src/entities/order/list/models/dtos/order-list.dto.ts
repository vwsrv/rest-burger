import type { TOrderStatus } from '@/entities/order';

export type TOrderListDTO = {
  ingredients: string[];
  _id: string;
  name: string;
  status: TOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
};
