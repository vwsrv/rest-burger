import type { TOrderStatus } from '@/entities/order';

export const MOrderStatusText: Record<TOrderStatus, string> = {
  created: 'red',
  done: '#00CCCC',
  pending: 'inherit',
};
