import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/rootReducer';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients/ingredientsSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { items, isIngredientsLoading } = useSelector(
    (state: RootState) => state.ingredients
  );
  useEffect(() => {
    if (
      items.buns.length === 0 &&
      items.mains.length === 0 &&
      items.sauces.length === 0
    ) {
      dispatch(fetchIngredients());
    }
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
