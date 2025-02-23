import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  /** TODO+: взять переменную из стора */
  const dispatch = useDispatch();
  const { isIngredientsLoading } = useSelector(
    (state: RootState) => state.ingredients
  );
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
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
