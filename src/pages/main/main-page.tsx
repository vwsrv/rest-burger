import { AppHeader } from '@/widgets/app-header/app-header.tsx';
import type { JSX } from 'react';
import { LeftSide } from '@/widgets/left-side/left-side.tsx';
import { RightSide } from '@/widgets/righ-side/right-side.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main-page.module.css';

export const MainPage = (): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.mainContent} pl-5 pr-5`}>
          <LeftSide />

          <RightSide />
        </main>
      </div>
    </DndProvider>
  );
};

export default MainPage;
