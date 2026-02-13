import { type FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import { getIngredientsByIdMap } from '@/shared/utils/order-ingredients.util';
import { useIngredients } from '@/shared/hooks';
import { OrderInfo } from './ui';
import { formatDate } from '@/shared/utils';

const OrderDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const orders = useAppSelector((state) => state.orderFeed.orders);
  const selectedOrder = useAppSelector((state) => state.orderFeed.order);
  const ingredientsGroups = useAppSelector((state) => state.ingredients.items);

  const order = useMemo(
    () =>
      selectedOrder?.id === id
        ? selectedOrder
        : (orders?.find((o) => o.id === id) ?? null),
    [selectedOrder, orders, id]
  );

  const ingredientsById = useMemo(
    () => getIngredientsByIdMap(ingredientsGroups),
    [ingredientsGroups]
  );
  const { cost, lineItems } = useIngredients(order?.ingredients ?? [], ingredientsById);

  if (!order) return null;

  return (
    <OrderInfo
      order={order}
      cost={cost}
      lineItems={lineItems}
      date={formatDate(order.updatedAt)}
    />
  );
};

export default OrderDetails;
