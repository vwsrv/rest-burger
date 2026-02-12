import { type FC, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/store';
import { getIngredients } from '@/app/store/slices/ingredients/ingredients.slice.ts';
import type { TIngredientItem } from '@/entities/ingridients';
import styles from './ingredients-page.module.css';
import { IngredientDetails } from '@/shared/ui';

const Ingredients: FC = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.items);

  const [ingredient, setIngredient] = useState<TIngredientItem | null>(null);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (id && ingredients.length > 0) {
      let foundIngredient: TIngredientItem | null = null;

      for (const group of ingredients) {
        foundIngredient = group.items.find((item) => item.id === id) ?? null;
        if (foundIngredient) break;
      }

      setIngredient(foundIngredient);
    }
  }, [id, ingredients]);

  if (location.state?.fromMainPage === true) {
    return null;
  }

  if (!ingredient) {
    return (
      <div className={styles.ingredients}>
        <p>Ингредиент не найден</p>
      </div>
    );
  }

  return (
    <div className={styles.ingredients}>
      <IngredientDetails ingredient={ingredient!} />
    </div>
  );
};

export default Ingredients;
