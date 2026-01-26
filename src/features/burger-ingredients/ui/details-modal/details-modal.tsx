import type { FC } from 'react';
import { IngredientDetails, UIModal } from '@/shared/ui';
import type { TIngredientItem } from '@/entities/ingridients';
import { useNavigate } from 'react-router-dom';
import { clearIngredientItem, useAppDispatch } from '@/app/store';

type TProps = {
  ingredient: TIngredientItem | null;
  onClose: () => void;
};

export const DetailsModal: FC<TProps> = ({ ingredient, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose();

    navigate('/', { replace: true });

    dispatch(clearIngredientItem());
  };

  return (
    <UIModal open={!!ingredient} onClose={handleClose}>
      {ingredient && <IngredientDetails ingredient={ingredient} />}
    </UIModal>
  );
};
