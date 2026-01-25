import { type FC, useEffect, useRef } from 'react';
import { BurgerTabs, Ingredient } from './ui';
import { tabsTuple, type TIngredientItem } from '@/entities/ingridients';
import styles from './burger-ingredients.module.css';
import { UIBox } from '@/shared/ui';
import {
  getIngredients,
  setActiveTab,
} from '@/app/store/slices/ingredients/ingredients.slice.ts';
import { setIngredientItem } from '@/app/store/slices/current-ingredient';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { useActiveTab } from './hooks';
import { useNavigate } from 'react-router-dom';

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const activeTab = useAppSelector((state) => state.ingredients.activeTab);
  const containerRef = useRef<HTMLDivElement>(null);
  const headersRef = useRef<Map<string, HTMLHeadingElement>>(new Map());

  const navigate = useNavigate();
  const handleTabClick = (value: string): void => {
    const header = headersRef.current.get(value);
    if (header && containerRef.current) {
      const container = containerRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const headerTop = header.getBoundingClientRect().top;
      const scrollOffset = headerTop - containerTop + container.scrollTop;

      container.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });

      dispatch(setActiveTab(value));
    }
  };

  const handleIngredientClick = (ingredient: TIngredientItem) => {
    dispatch(setIngredientItem(ingredient));

    navigate(`/ingredients/${ingredient.id}`, { state: { fromMainPage: true } });
  };

  useEffect(() => {
    if (ingredients.length > 0 && !activeTab) {
      dispatch(setActiveTab(ingredients[0].label));
    }
  }, [ingredients, activeTab, dispatch]);

  useActiveTab({
    containerRef,
    headersRef,
    activeTab,
    onTabChange: (label) => {
      dispatch(setActiveTab(label));
    },
    isEnabled: ingredients.length > 0,
  });

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.burger_ingredients}>
      <BurgerTabs tabs={tabsTuple} onClick={handleTabClick} activeTab={activeTab} />

      <UIBox ref={containerRef} className={styles.cards}>
        {ingredients.map((group) => (
          <div key={group.type}>
            <h2
              ref={(el) => {
                if (el) {
                  headersRef.current.set(group.label, el);
                } else {
                  headersRef.current.delete(group.label);
                }
              }}
              data-label={group.label}
              className={`text text_type_main-large ${styles.ingredients__title}`}
            >
              {group.label}
            </h2>

            <div className={styles.card__list}>
              {group.items.map((ingredient) => (
                <Ingredient
                  key={`ingredient_card_${ingredient.id}`}
                  ingredient={ingredient}
                  onClick={() => handleIngredientClick(ingredient)}
                />
              ))}
            </div>
          </div>
        ))}
      </UIBox>
    </div>
  );
};

export default BurgerIngredients;
