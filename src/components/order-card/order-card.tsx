import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/orderSlice';

const maxIngredients = 6;
const selectIngredients = (state: RootState) => {
  const { buns, mains, sauces } = state.ingredients.items;
  return [...buns, ...mains, ...sauces];
};

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  /** TODO+: взять переменную из стора */
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
