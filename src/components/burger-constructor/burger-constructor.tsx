import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState } from '../../services/store';
import {
  resetConstructor,
  setOrderRequest,
  setOrderModalData
} from '../../services/slices/burgerconstructorSlice';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  /** TODO+: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
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
      dispatch(resetConstructor());
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

  // return null;

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
