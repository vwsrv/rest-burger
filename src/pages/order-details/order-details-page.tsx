import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDetails from '@/features/order-details';
import styles from './order-details-page.module.css';

const OrderDetailsPage: FC = () => {
  const location = useLocation();

  if (location.state?.fromOrders === true) return null;

  return (
    <main className={styles.orderDetails}>
      <OrderDetails />
    </main>
  );
};

export default OrderDetailsPage;
