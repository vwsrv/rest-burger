import { type FC, useMemo, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector, wsConnect, wsDisconnect } from '@/app/store';
import { getUrl } from '@/app/store/slices/order-feed';
import { getIngredientsByIdMap } from '@/shared/utils/order-ingredients.util.ts';
import { UILoader } from '@/shared/ui';
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

  useLayoutEffect(() => {
    const url = getUrl({ type: ordersType });
    if (url) {
      dispatch(wsConnect(url));
    }

    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  if (orders === null) {
    return (
      <div className={styles.loaderWrap}>
        <UILoader text="Загрузка заказов..." />
      </div>
    );
  }

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
            ordersType={ordersType}
          />
        ))}
    </div>
  );
};

export default Orders;
