import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, AppDispatch } from '../../services/store'; // Импортируйте AppDispatch
import {
  resetConstructor,
  setOrderRequest,
  setOrderModalData
} from '../../services/slices/burgerconstructorSlice';
import { orderBurgerApi } from '@api';
import { fetchFeed } from '../../services/slices/feedSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Используйте AppDispatch для типизации
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.orderModalData
  );

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(setOrderRequest(true));

    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(setOrderModalData(response.order));
      console.log('Новый заказ:', response.order);
      dispatch(resetConstructor());
      // После успешного создания заказа обновляем ленту заказов
      dispatch(fetchFeed());
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    } finally {
      dispatch(setOrderRequest(false));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
