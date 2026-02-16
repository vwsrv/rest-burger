import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { IngredientsDetailsContent } from '@/widgets';
import { Ingredients } from '@/pages';

const IngredientDetailsPage: FC = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location?.state?.fromMainPage || location?.state?.backgroundLocation) {
      return <IngredientsDetailsContent />;
    }
    return <Ingredients />;
  };

  return <>{renderContent()}</>;
};

export default IngredientDetailsPage;
