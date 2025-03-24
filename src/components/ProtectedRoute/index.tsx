import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/rootReducer';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (onlyUnAuth && isAuthenticated) {
    // Для маршрутов только для неавторизованных пользователей
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    // Для защищенных маршрутов
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
