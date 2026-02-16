import { LeftSide, Orders, RightSide } from '@/widgets';
import type { FC } from 'react';
import { OrdersStatus } from '@/features';
import styles from './feed-page.module.css';

const FeedPage: FC = () => {
  return (
    <main className={styles.feedPage}>
      <LeftSide>
        <Orders ordersType="all" className={styles.feedCard} />
      </LeftSide>
      <RightSide>
        <OrdersStatus />
      </RightSide>
    </main>
  );
};

export default FeedPage;
