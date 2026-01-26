import type { TCreateOrderRequest, TCreateOrderResponse } from '@/entities/order/create';
import { api } from '@/shared/api';

export const createOrder = async (
  data: TCreateOrderRequest
): Promise<TCreateOrderResponse> => {
  return api
    .post<TCreateOrderResponse>('api/orders', data, {
      baseURL: import.meta.env.SERVICE_BURGER_API,
      requiresAuth: true,
    })
    .then((response) => response.data);
};
