import { type FC, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector, wsConnect, wsDisconnect } from '@/app/store';
import { getUrl } from '@/app/store/slices/order-feed';
import { getIngredientsByIdMap } from '@/shared/utils/order-ingredients.util.ts';
import styles from './orders.module.css';
import { Card } from './ui';

type TProps = {
  ordersType: 'all' | 'user';
  className?: string;
};

const Orders: FC<TProps> = ({ ordersType, className }) => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orderFeed);
  const ingredientsGroups = useAppSelector((state) => state.ingredients.items);
  const ingredientsById = useMemo(
    () => getIngredientsByIdMap(ingredientsGroups),
    [ingredientsGroups]
  );

  useEffect(() => {
    const url = getUrl({ type: ordersType });
    if (url) {
      dispatch(wsConnect(url));
    }
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  return (
    <div className={styles.userOrders}>
      {orders
        ?.slice()
        .reverse()
        .map((order) => (
          <Card
            className={className}
            key={order.id}
            order={order}
            ingredientsById={ingredientsById}
          />
        ))}
    </div>
  );
};

export default Orders;
