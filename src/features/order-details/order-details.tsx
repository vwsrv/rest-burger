import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfo } from './ui';
import { useOrderDetails } from '@/features/order-details/hooks/use-order-details.hook';

const OrderDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { order, cost, lineItems, date } = useOrderDetails(id);

  if (!order) return null;

  return <OrderInfo order={order} cost={cost} lineItems={lineItems} date={date} />;
};

export default OrderDetails;
