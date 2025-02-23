import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../../services/slices/burgerconstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };
    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
      console.log('handleClose');
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
