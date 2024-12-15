import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type ProtectedRouteProps = {
  component: React.ComponentType<any>;
};

export const ProtectedRoute = ({
  component: Component
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Component />;
};

export default ProtectedRoute;
