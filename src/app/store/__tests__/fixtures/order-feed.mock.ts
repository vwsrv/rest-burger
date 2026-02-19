import type { TOrderItem } from '@/entities/order';

export const MOCK_ORDER_ITEM: TOrderItem = {
  id: 'order-1',
  name: 'Заказ #1',
  ingredients: ['id1', 'id2'],
  status: 'done',
  orderNumber: 12345,
  createdAt: '12.02.2025, 12:00',
  updatedAt: '12.02.2025, 12:00',
};

export const MOCK_ORDER_ITEM_PENDING: TOrderItem = {
  id: 'order-2',
  name: 'Заказ #2',
  ingredients: ['id1'],
  status: 'pending',
  orderNumber: 12346,
  createdAt: '12.02.2025, 13:00',
  updatedAt: '12.02.2025, 13:00',
};

export const MOCK_ORDER_FEED_STATE_INITIAL = {
  orders: null,
  order: null,
  total: 0,
  totalDay: 0,
  wsConnected: false,
  wsError: null,
} as const;

export const MOCK_ORDER_FEED_STATE_WITH_DATA = {
  orders: [MOCK_ORDER_ITEM, MOCK_ORDER_ITEM_PENDING],
  order: null,
  total: 100,
  totalDay: 10,
  wsConnected: true,
  wsError: null,
} as const;
