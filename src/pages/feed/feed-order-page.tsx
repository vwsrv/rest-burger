import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDetails from '@/features/order-details';
import styles from './feed-page.module.css';

const FeedOrderPage: FC = () => {
  const location = useLocation();

  if (location.state?.fromFeed === true) return null;

  return (
    <main className={styles.feedPage}>
      <OrderDetails />
    </main>
  );
};

export default FeedOrderPage;
