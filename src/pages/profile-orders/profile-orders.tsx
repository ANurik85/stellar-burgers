import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../services/slices/feedSlice';
import { RootState, AppDispatch } from '../../services/store';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const {
    orders,
    userOrdersLoading: loading,
    userOrdersError: error
  } = useSelector((state: RootState) => state.feed);

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAuthenticated]);

  return <ProfileOrdersUI orders={orders} />;
};
