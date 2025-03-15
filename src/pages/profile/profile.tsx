import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUser, clearError } from '../../services/slices/userSlice';
import { logoutUser } from '../../services/slices/userSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  // Очистка ошибки при размонтировании компонента
  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    formValue.password.length > 0;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const updateData = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password && { password: formValue.password })
    };

    await dispatch(updateUser(updateData))
      .unwrap()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch(() => {});
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    dispatch(clearError());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error || undefined}
    />
  );
};
