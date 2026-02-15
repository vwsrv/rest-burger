import { type FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import type { TIngredientItem } from '@/entities/ingridients';
import styles from './ingredients-page.module.css';
import { IngredientDetails, UILoader } from '@/shared/ui';

const Ingredients: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useAppSelector((state) => state.ingredients.items);
  const loading = useAppSelector((state) => state.ingredients.loading);

  const [ingredient, setIngredient] = useState<TIngredientItem | null>(null);

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

  if (id && loading) {
    return (
      <div className={styles.ingredients}>
        <UILoader />
      </div>
    );
  }

  if (!ingredient) {
    return (
      <div className={styles.ingredients}>
        <p className="text text_type_main-default">Ингредиент не найден</p>
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
