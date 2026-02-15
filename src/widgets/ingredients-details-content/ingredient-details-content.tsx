import type { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailsModal } from '@/features/burger-ingredients/ui';
import { useAppSelector, useAppDispatch } from '@/app/store';
import { clearIngredientItem } from '@/app/store/slices/current-ingredient';
import type { TIngredientItem } from '@/entities/ingridients';

const findIngredientById = (
  groups: { items: TIngredientItem[] }[],
  id: string
): TIngredientItem | null => {
  for (const group of groups) {
    const found = group.items.find((item) => item.id === id);
    if (found) return found;
  }
  return null;
};

const IngredientDetailsContent: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const currentIngredient = useAppSelector((state) => state.currentIngredient.item);
  const ingredientsGroups = useAppSelector((state) => state.ingredients.items);

  const ingredient =
    currentIngredient ?? (id ? findIngredientById(ingredientsGroups, id) : null);

  const backPath = location.state?.backgroundLocation?.pathname ?? '/';

  const handleClose = () => {
    navigate(backPath, { replace: true });
    dispatch(clearIngredientItem());
  };

  if (!ingredient) return null;

  return <DetailsModal ingredient={ingredient} onClose={handleClose} />;
};

export default IngredientDetailsContent;
