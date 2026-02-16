import type { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/store';
import { clearOrder } from '@/app/store/slices/order-feed';
import { useOrderDetails } from '@/features/order-details/hooks/use-order-details.hook';
import { OrderDetailsModal } from '@/features/order-details/ui/order-details-modal';
import { UILoader, UIModal } from '@/shared/ui';

const OrderDetailsContent: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id: orderId } = useParams();
  const backPath = location.pathname.startsWith('/feed') ? '/feed' : '/profile/orders';

  const { order, cost, lineItems, date, isLoading } = useOrderDetails(
    orderId ?? undefined
  );

  const handleClose = () => {
    navigate(location.state?.backgroundLocation?.pathname ?? backPath, {
      replace: true,
    });
    dispatch(clearOrder());
  };

  if (isLoading) {
    return (
      <UIModal open onClose={handleClose}>
        <UILoader />
      </UIModal>
    );
  }

  if (!order) {
    return (
      <UIModal open onClose={handleClose}>
        <p className="text text_type_main-default">Заказ не найден</p>
      </UIModal>
    );
  }

  return (
    <OrderDetailsModal
      order={order}
      cost={cost}
      lineItems={lineItems}
      date={date}
      backPath={backPath}
      onClose={handleClose}
    />
  );
};

export default OrderDetailsContent;
