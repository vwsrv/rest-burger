import type { FC } from 'react';
import { UIOrderCard } from '@/shared/ui';
import { useIngredients } from '@/shared/hooks';
import { MOrderStatus } from '@/entities/order';
import type { TOrderItem } from '@/entities/order';
import type { TIngredientItem } from '@/entities/ingridients';
import { useAppDispatch } from '@/app/store';
import { setOrder } from '@/app/store/slices/order-feed';
import { useNavigate } from 'react-router-dom';

type TCardProps = {
  order: TOrderItem;
  ingredientsById: Map<string, TIngredientItem>;
  ordersType: 'all' | 'user';
  className?: string;
};

export const Card: FC<TCardProps> = ({
  order,
  ingredientsById,
  ordersType,
  className,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { images, cost } = useIngredients(order.ingredients, ingredientsById);

  const handleClick = () => {
    dispatch(setOrder(order));
    if (ordersType === 'all') {
      navigate(`/feed/${order.id}`, { state: { fromFeed: true } });
    } else {
      navigate(`/profile/orders/${order.id}`, { state: { fromOrders: true } });
    }
  };

  return (
    <UIOrderCard
      onClick={handleClick}
      className={className}
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
};
