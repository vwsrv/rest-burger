import type { FC } from 'react';
import styles from './profile-orders-page.module.css';
import { LeftSide, Orders, RightSide } from '@/widgets';
import { Outlet } from 'react-router-dom';

const ProfileOrders: FC = () => {
  return (
    <main className={styles.orders}>
      <div className={`${styles.ordersContent} pl-5 pr-5`}>
        <section className={styles.contentSection}>
          <LeftSide>
            <Orders ordersType="user" />
          </LeftSide>

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
