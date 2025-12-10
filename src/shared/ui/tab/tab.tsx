import { Tab } from '@krgaa/react-developer-burger-ui-components';

import type { FC, ReactNode } from 'react';

type TProps = {
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children?: ReactNode;
};

const UITab: FC<TProps> = ({ active, value, onClick, children }) => {
  return (
    <Tab active={active} value={value} onClick={onClick}>
      {children}
    </Tab>
  );
};

export default UITab;
