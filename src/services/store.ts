import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerconstructorSlice';
import orderSlice from './slices/orderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import feedSlice from './slices/feedSlice';
const rootReducer = combineReducers({
  // данные всех полученных ингредиентов;
  ingredients: ingredientsSlice,
  // данные конструктора бургера;
  burgerConstructor: burgerConstructorSlice,
  // данные создания заказа;
  order: orderSlice,
  // данные ленты и истории заказов;
  feed: feedSlice
  // данные профиля пользователя.
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
