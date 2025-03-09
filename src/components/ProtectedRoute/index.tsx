// import { useSelector } from '../../services/store';
// import {
//   isAuthCheckedSelector,
//   userDataSelector
// } from '../services/store/selectors';
// import { Navigate, useLocation } from 'react-router';
// import { Preloader } from '../ui/preloader';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: ProtectedRouteProps) => {
//   const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
//   const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store
//   const location = useLocation();

//   if (!isAuthChecked) {
//     // пока идёт чекаут пользователя, показываем прелоадер
//     return <Preloader />;
//   }

//   if (!onlyUnAuth && !user) {
//     // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
//     return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
//   }

//   if (onlyUnAuth && user) {
//     // если пользователь на странице авторизации и данные есть в хранилище
//     // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
//     // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
//     // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
//     const from = location.state?.from || { pathname: '/' };

//     return <Navigate replace to={from} />;
//   }

//   return children;
// };

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';
// // import {RootState} from '../../store';
// // import {Role} from '../../types';

// export const ProtectedRoute = ({ accessRoles }: { accessRoles: Role[] }) => {
//   const { user, isInit, isLoading } = useSelector(
//     (store: RootState) => store.user
//   );

//   if (!isInit || isLoading) {
//     return <div>Загрузка...</div>;
//   }

//   if (!user || !accessRoles.includes(user.role)) {
//     return <Navigate to='/sign-in' />;
//   }

//   return <Outlet />;
// };
