const base = import.meta.env.SERVICE_BURGER_WS as string;

export const getOrdersAll = (): string => `${base}/orders/all`;

export const getProfileOrdersWsUrl = (token: string): string =>
  `${base}/orders?token=${token}`;
