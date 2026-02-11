import type { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main.module.css';
import { RightSide, LeftSide } from '@/widgets';
import { BurgerConstructor, BurgerIngredients, PayOrder } from '@/features';

export const Main = (): JSX.Element => {
  const location = useLocation();
  const hasIngredientRoute = location.pathname.startsWith('/ingredients/');
  const isFromMainPage = location.state?.fromMainPage === true;
  const shouldShowMainContent = !hasIngredientRoute || isFromMainPage;

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        {shouldShowMainContent && (
          <div className={`${styles.mainContent} pl-5 pr-5`}>
            <section className={styles.titleSection}>
              <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
                Соберите бургер
              </h1>
            </section>

            <section className={styles.contentSection}>
              <LeftSide>
                <BurgerIngredients />
              </LeftSide>

              <RightSide>
                <BurgerConstructor />

                <PayOrder />
              </RightSide>
            </section>
          </div>
        )}
        <Outlet />
      </main>
    </DndProvider>
  );
};

export default Main;
