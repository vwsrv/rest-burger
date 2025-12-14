import styles from './tabs.module.css';
import type { TTab } from '@/features/burger-ingredients/models/types';
import type { FC } from 'react';
import { UITab } from '@/shared/ui';

type TProps = {
  tabs: TTab[];
  onClick: (value: string) => void;
  active?: boolean;
};

const BurgerTabs: FC<TProps> = ({ tabs, onClick, active = true }) => {
  return (
    <nav>
      <ul className={styles.tabs}>
        {tabs.map((tab) => {
          return (
            <UITab
              active={active}
              value={tab.label}
              onClick={onClick}
              key={`tabs-${tab.id}`}
            >
              {tab.label}
            </UITab>
          );
        })}
      </ul>
    </nav>
  );
};

export default BurgerTabs;
