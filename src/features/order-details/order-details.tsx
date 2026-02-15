import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfo } from './ui';
import { useOrderDetails } from '@/features/order-details/hooks/use-order-details.hook';
import { UILoader } from '@/shared/ui';
import styles from './order-details.module.css';

const OrderDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { order, cost, lineItems, date, isLoading } = useOrderDetails(id);

  if (isLoading) {
    return (
      <div className={styles.loaderWrap}>
        <UILoader />
      </div>
    );
  }

  if (!order) {
    return <p className="text text_type_main-default">Заказ не найден</p>;
  }

  return <OrderInfo order={order} cost={cost} lineItems={lineItems} date={date} />;
};

export default OrderDetails;
