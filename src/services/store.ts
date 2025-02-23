import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerconstructorSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  // данные всех полученных ингредиентов;
  ingredients: ingredientsReducer,
  // данные конструктора бургера;
  burgerConstructor: burgerConstructorReducer
  // данные создания заказа;

  // данные ленты и истории заказов;
  // order: orderReducer

  // данные профиля пользователя.
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
