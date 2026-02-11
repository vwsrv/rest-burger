import type { FC } from 'react';
import styles from './orders.module.css';
import { LeftSide, RightSide } from '@/widgets';
import { Outlet } from 'react-router-dom';
import UserOrders from '@/features/user-orders/user-orders.tsx';

const ProfileOrders: FC = () => {
  return (
    <main className={styles.orders}>
      <div className={`${styles.ordersContent} pl-5 pr-5`}>
        <section className={styles.contentSection}>
          <div className={styles.leftScroll}>
            <LeftSide>
              <UserOrders />
            </LeftSide>
          </div>

          <div className={styles.rightScroll}>
            <RightSide>buy world</RightSide>
          </div>
        </section>
      </div>
      <Outlet />
    </main>
  );
};

export default ProfileOrders;
