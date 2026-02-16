import { formatDate } from '@/shared/utils';
import type { TOrderListDTO } from '@/entities/order/list/models/dtos';
import type { TOrderListResponse } from '@/entities/order/list/models/types';
import type { TOrderItem } from '@/entities/order/list/models/types/order.type.ts';

export const ordersListMapper = (dto: TOrderListDTO) => {
  return {
    ingredients: dto.ingredients,
    id: dto._id,
    name: dto.name,
    status: dto.status,
    orderNumber: dto.number,
    createdAt: formatDate(dto.createdAt),
    updatedAt: dto.updatedAt,
  };
};

export const orderMapper = (response: TOrderListResponse): TOrderItem[] => {
  if (!response || (response && 'error' in response)) return [];

  return response.orders.map(ordersListMapper);
};
