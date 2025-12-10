import { AppHeader } from '@/shared/ui/app-header/app-header.tsx';
import { BurgerConstructor } from '@/features/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@/features/burger-ingredients/burger-ingredients.tsx';
import { ingredients } from '@/shared/utils/ingredients.ts';
import styles from './app.module.css';
import type { JSX } from 'react';

export const MainPage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};

export default MainPage;
