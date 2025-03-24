import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/feed/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/rootReducer';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
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
