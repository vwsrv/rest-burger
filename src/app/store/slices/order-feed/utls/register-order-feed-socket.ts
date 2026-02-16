import { registerSocketListeners } from '@/app/store/middleware/register-socket-listeners';
import type { TSocketListenersConfig } from '@/app/store/middleware/register-socket-listeners';
import { orderMapper } from '@/entities/order/list/models/mappers/order-list.mapper';
import type { TOrderListResponse } from '@/entities/order/list/models/types/order-list-reponse.type';
import {
  setOrderFeedData,
  setWsConnected,
  setWsError,
  wsConnect,
  wsDisconnect,
} from '@/app/store/slices/order-feed';

type TStartListening = Parameters<typeof registerSocketListeners>[0];

const orderFeedSocketConfig: TSocketListenersConfig = {
  connectAction: wsConnect,
  disconnectAction: wsDisconnect,
  onOpen: () => setWsConnected(true),
  onClose: () => setWsConnected(false),
  onError: () => setWsError('Ошибка соединения'),
  onMessage: (data: unknown) => {
    const raw = data as TOrderListResponse;
    return setOrderFeedData({
      orders: orderMapper(raw),
      total: raw.total,
      totalToday: raw.totalToday,
    });
  },
};

export function registerOrderFeedSocket(startListening: TStartListening): void {
  registerSocketListeners(startListening, orderFeedSocketConfig);
}
