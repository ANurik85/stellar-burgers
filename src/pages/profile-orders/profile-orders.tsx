import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../services/slices/feedSlice';
import { RootState, AppDispatch } from '../../services/store';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.order.orders
  );

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
