import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { setCurrentIngredient } from '../../services/slices/ingredientsSlice';
export const IngredientDetails: FC = () => {
  /** TODO+: взять переменную из стора */
  const { id: ingredientId } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.currentIngredient
  );
  const allIngredients = useSelector((state: RootState) => [
    ...state.ingredients.items.buns,
    ...state.ingredients.items.mains,
    ...state.ingredients.items.sauces
  ]);

  // Находим по id и сохраняем в хранилище
  useEffect(() => {
    const ingredient = allIngredients.find((item) => item._id === ingredientId);
    if (ingredient) {
      dispatch(setCurrentIngredient(ingredient));
    } else {
      dispatch(setCurrentIngredient(null)); // Если  не найден
    }
  }, [ingredientId, allIngredients, dispatch]);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
