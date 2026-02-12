import type { TOrderStatus } from '@/entities/order';

export const MOrderStatus: Record<TOrderStatus, string> = {
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится',
};
