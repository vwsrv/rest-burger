import { AppHeader } from '@/shared/ui/app-header/app-header.tsx';
import styles from './app.module.css';
import type { JSX } from 'react';
import { LeftSide } from '@/widgets/left-side/left-side.tsx';
import { RightSide } from '@/widgets/righ-side/right-side.tsx';

export const MainPage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <LeftSide />

        <RightSide />
      </main>
    </div>
  );
};

export default MainPage;
