import type { JSX } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main-page.module.css';
import { RightSide, LeftSide } from '@/widgets';
import { BurgerConstructor, BurgerIngredients, PayOrder } from '@/features';

export const Main = (): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
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
      </main>
    </DndProvider>
  );
};

export default Main;
