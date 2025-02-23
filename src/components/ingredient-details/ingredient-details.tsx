import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { setCurrentIngredient } from '../../services/slices/ingredientsSlice';
export const IngredientDetails: FC = () => {
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

  // Находим ингредиент по ID и сохраняем его в хранилище
  useEffect(() => {
    const ingredient = allIngredients.find((item) => item._id === ingredientId);
    if (ingredient) {
      dispatch(setCurrentIngredient(ingredient));
    } else {
      dispatch(setCurrentIngredient(null)); // Если ингредиент не найден
    }
  }, [ingredientId, allIngredients, dispatch]);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
