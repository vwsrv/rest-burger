import type { ordersListMapper } from '@/entities/order/list/models/mappers/order-list.mapper.ts';

export type TOrderItem = ReturnType<typeof ordersListMapper>;
