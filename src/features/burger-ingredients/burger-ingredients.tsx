import type { FC } from 'react';
import BurgerTabs from '@/features/burger-ingredients/ui/tabs.tsx';
import { tabsTuple } from '@/entities/ingridients';

export const BurgerIngredients: FC = () => {
  return (
    <>
      <BurgerTabs tabs={tabsTuple} onClick={() => console.log('click')} />
    </>
  );
};
