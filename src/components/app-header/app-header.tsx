import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/rootReducer';

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const handleConstructorClick = () => {
    navigate('/');
  };

  const handleFeedClick = () => {
    navigate('/feed');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <AppHeaderUI
      userName={user?.name}
      onConstructorClick={handleConstructorClick}
      onFeedClick={handleFeedClick}
      onProfileClick={handleProfileClick}
    />
  );
};
