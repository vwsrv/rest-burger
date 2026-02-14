import type { FC } from 'react';
import styles from './orders-status.module.css';
import { useAppSelector } from '@/app/store';
import { clsx } from 'clsx';

const OrdersStatus: FC = () => {
  const { orders, total, totalDay } = useAppSelector((state) => state.orderFeed);

  const readyOrders = orders?.filter((order) => order.status === 'done');
  const inProgressOrders = orders?.filter((order) => order.status === 'pending');

  return (
    <div className={styles.ordersStatus}>
      <div className={styles.statusRow}>
        <div className={styles.statusColumn}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <div className={styles.orderStatusColumns}>
            <div className={styles.readyOrders}>
              {readyOrders?.map((order) => (
                <p key={order.orderNumber} className="text text_type_digits-default">
                  {order.orderNumber}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.statusColumn}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <div className={styles.orderStatusColumns}>
            <div className={styles.inProgressOrders}>
              {inProgressOrders?.map((order) => (
                <p className={`text text_type_main-large`} key={order.id}>
                  {order.createdAt}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ordersCountRow}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={clsx('text text_type_digits-large', styles.ordersDigits)}>
          {total}
        </p>
      </div>

      <div className={styles.ordersCountRow}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={clsx('text text_type_digits-large', styles.ordersDigits)}>
          {totalDay}
        </p>
      </div>
    </div>
  );
};

export default OrdersStatus;
