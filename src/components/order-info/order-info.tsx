import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

export const OrderInfo: FC = () => {
  /** TODO+: взять переменные orderData и ingredients из стора */
  const orderData = useSelector((state: RootState) => state.order.currentOrder);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (
      !orderData ||
      (!ingredients.buns.length &&
        !ingredients.mains.length &&
        !ingredients.sauces.length)
    )
      return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const allIngredients = [
            ...ingredients.buns,
            ...ingredients.mains,
            ...ingredients.sauces
          ];
          const ingredient = allIngredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
