import type { FC } from 'react';
import { UIModal } from '@/shared/ui';
import type { TIngredientItem } from '@/entities/ingridients';
import styles from './details-modal.module.css';

type TProps = {
  ingredient: TIngredientItem | null;
  onClose: () => void;
};

export const DetailsModal: FC<TProps> = ({ ingredient, onClose }) => {
  return (
    <UIModal open={!!ingredient} onClose={onClose}>
      {ingredient && (
        <div className={styles.ingredients__container}>
          <h1 className={`text text_type_main-large ${styles.ingredients__title}`}>
            Детали ингредиента
          </h1>

          <div className={styles.ingredients__description}>
            <img src={ingredient.imageLg} alt={ingredient.name} />

            <h2 className="text text_type_main-medium">{ingredient.name}</h2>
          </div>

          <div className={styles.ingredients_macronutrients}>
            {ingredient.cal && (
              <div className={styles.macronutrient}>
                <h3 className="text text_type_main-default">Калории,ккал</h3>

                <p className="text text_type_digits-medium">{ingredient.cal}</p>
              </div>
            )}

            {ingredient.proteins && (
              <div className={styles.macronutrient}>
                <h3 className="text text_type_main-default">Белки, г</h3>

                <p className="text text_type_digits-medium">{ingredient.proteins}</p>
              </div>
            )}

            {ingredient.fat && (
              <div className={styles.macronutrient}>
                <h3 className="text text_type_main-default">Жиры, г</h3>

                <p className="text text_type_digits-medium">{ingredient.fat}</p>
              </div>
            )}

            {ingredient.carb && (
              <div className={styles.macronutrient}>
                <h3 className="text text_type_main-default">Углеводы, г</h3>

                <p className="text text_type_digits-medium">{ingredient.carb}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </UIModal>
  );
};
