import { type FC, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector, wsConnect, wsDisconnect } from '@/app/store';
import { getUrl } from '@/app/store/slices/order-feed';
import { UIOrderCard } from '@/shared/ui';
import {
  getIngredientsByIdMap,
  getOrderDisplayData,
} from './utils/order-display-data.util';
import styles from './user-orders.module.css';
import { MOrderStatus } from '@/entities/order';

const UserOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orderFeed);
  const ingredientsGroups = useAppSelector((state) => state.ingredients.items);
  const ingredientsById = useMemo(
    () => getIngredientsByIdMap(ingredientsGroups),
    [ingredientsGroups]
  );

  useEffect(() => {
    const url = getUrl({ type: 'user' });
    if (url) {
      dispatch(wsConnect(url));
    }
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  return (
    <div className={styles.userOrders}>
      {orders?.map((order) => {
        const { images, cost } = getOrderDisplayData(order, ingredientsById);
        return (
          <UIOrderCard
            key={order.id}
            orderId={order.orderNumber}
            date={order.createdAt}
            title={order.name}
            status={MOrderStatus[order.status]}
            statusKey={order.status}
            images={images}
            cost={String(cost)}
            count={order.ingredients.length}
          />
        );
      })}
    </div>
  );
};

export default UserOrders;
