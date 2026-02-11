import { getOrdersAll, getProfileOrdersWsUrl } from '@/entities/order';
import { getCookie } from '@/entities/user/auth/utils';
import { ACCESS_TOKEN_KEY } from '@/shared/api/constants';

export type TWsConnectPayload = { type: 'all' | 'user' };

export const getUrl = (payload?: TWsConnectPayload): string => {
  return payload?.type === 'user'
    ? getProfileOrdersWsUrl(getCookie(ACCESS_TOKEN_KEY) ?? '')
    : getOrdersAll();
};
