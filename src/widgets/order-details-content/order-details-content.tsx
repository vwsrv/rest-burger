import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/app/store';
import { clearOrder } from '@/app/store/slices/order-feed';
import { useOrderDetails } from '@/features/order-details/hooks/use-order-details.hook';
import { OrderDetailsModal } from '@/features/order-details/ui/order-details-modal';

const OrderDetailsContent: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const feedMatch = location.pathname.match(/^\/feed\/([^/]+)$/);
  const profileMatch = location.pathname.match(/^\/profile\/orders\/([^/]+)$/);

  const orderId = feedMatch?.[1] ?? profileMatch?.[1];
  const fromFeed = !!location.state?.fromFeed;
  const fromOrders = !!location.state?.fromOrders;

  const showModal = (!!feedMatch && fromFeed) || (!!profileMatch && fromOrders);

  const { order, cost, lineItems, date } = useOrderDetails(
    showModal ? orderId : undefined
  );

  if (!showModal || !order) return null;

  const backPath = fromFeed ? '/feed' : '/profile/orders';

  return (
    <OrderDetailsModal
      order={order}
      cost={cost}
      lineItems={lineItems}
      date={date}
      backPath={backPath}
      onClose={() => dispatch(clearOrder())}
    />
  );
};

export default OrderDetailsContent;
