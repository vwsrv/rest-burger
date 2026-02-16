import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDetails from '@/features/order-details';
import { OrderDetailsContent } from '@/widgets';
import styles from '../feed/feed-page.module.css';

const FeedOrderPage: FC = () => {
  const location = useLocation();

  if (location?.state?.fromFeed || location?.state?.backgroundLocation) {
    return <OrderDetailsContent />;
  }

  return (
    <main className={styles.feedPage}>
      <OrderDetails />
    </main>
  );
};

export default FeedOrderPage;
