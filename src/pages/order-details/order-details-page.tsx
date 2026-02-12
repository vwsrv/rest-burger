import type { FC } from 'react';
import OrderDetails from '@/features/order-details';
import styles from './order-details-page.module.css';

const OrderDetailsPage: FC = () => (
  <main className={styles.orderDetails}>
    <OrderDetails />
  </main>
);

export default OrderDetailsPage;
