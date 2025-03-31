import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/rootReducer';
import { getOrderByNumber } from '../../services/slices/order/orderSlice';
import { createSelector } from '@reduxjs/toolkit';

const maxIngredients = 6;
const selectIngredients = createSelector(
  (state: RootState) => state.ingredients.items,
  ({ buns, mains, sauces }) => [...buns, ...mains, ...sauces]
);

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  /** TODO: взять переменную из стора */
  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );
    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;
  const handleClick = () => {
    dispatch(getOrderByNumber(order.number));
  };
  return (
    <div onClick={handleClick}>
      <OrderCardUI
        orderInfo={orderInfo}
        maxIngredients={maxIngredients}
        locationState={{ background: location }}
      />
    </div>
  );
});
