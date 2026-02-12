import { type FC, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector, wsConnect, wsDisconnect } from '@/app/store';
import { getUrl } from '@/app/store/slices/order-feed';
import { getIngredientsByIdMap } from '@/shared/utils/order-ingredients.util';
import styles from './user-orders.module.css';
import { Card } from './ui';

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
      {orders?.map((order) => (
        <Card key={order.id} order={order} ingredientsById={ingredientsById} />
      ))}
    </div>
  );
};

export default UserOrders;
