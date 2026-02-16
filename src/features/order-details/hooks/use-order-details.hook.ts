import type { TOrderItem } from '@/entities/order';
import { getIngredientsByIdMap, type TOrderLineItem } from '@/shared/utils';
import { useAppSelector } from '@/app/store';
import { useMemo } from 'react';
import { useIngredients } from '@/shared/hooks';
import { formatDate } from '@/shared/utils';

type TOrderDetails = {
  order: TOrderItem | null;
  cost: number;
  lineItems: TOrderLineItem[];
  date: string;
  isLoading: boolean;
};

export const useOrderDetails = (id: string | undefined): TOrderDetails => {
  const orders = useAppSelector((state) => state.orderFeed.orders);
  const selected = useAppSelector((state) => state.orderFeed.order);
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const order = useMemo(
    () =>
      id && selected?.id === id ? selected : (orders?.find((o) => o.id === id) ?? null),
    [selected, orders, id]
  );

  const isLoading = Boolean(id && !order && orders === null);

  const ingredientsById = useMemo(
    () => getIngredientsByIdMap(ingredients),
    [ingredients]
  );

  const { cost, lineItems } = useIngredients(order?.ingredients ?? [], ingredientsById);

  const date = order ? formatDate(order.updatedAt) : '';

  return {
    order,
    cost,
    lineItems,
    date,
    isLoading,
  };
};
