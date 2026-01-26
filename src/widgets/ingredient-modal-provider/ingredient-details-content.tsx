import { type FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DetailsModal } from '@/features/burger-ingredients/ui';
import { useAppSelector, useAppDispatch } from '@/app/store';
import {
  clearIngredientItem,
  setIngredientItem,
} from '@/app/store/slices/current-ingredient';

const IngredientDetailsContent: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentIngredient = useAppSelector((state) => state.currentIngredient.item);
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const ingredientMatch = location.pathname.match(/^\/ingredients\/(.+)$/);
  const ingredientId = ingredientMatch?.[1];
  const showModal = ingredientId && location.state?.fromMainPage;

  useEffect(() => {
    if (!showModal) {
      currentIngredient && dispatch(clearIngredientItem());
      return;
    }

    if (ingredients.length === 0 || currentIngredient) return;

    let found = false;
    ingredients.forEach((group) => {
      if (found) return;

      const ingredient = group.items.find((item) => item.id === ingredientId);

      if (ingredient) {
        dispatch(setIngredientItem(ingredient));
        found = true;
      }
    });
  }, [showModal, ingredientId, ingredients, currentIngredient, dispatch]);

  if (!showModal || !currentIngredient) return null;

  return (
    <DetailsModal
      ingredient={currentIngredient}
      onClose={() => dispatch(clearIngredientItem())}
    />
  );
};

export default IngredientDetailsContent;
