import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredients/ingredientsSlice';
import burgerConstructorSlice from './slices/constructor/burgerconstructorSlice';
import orderSlice from './slices/order/orderSlice';
import feedSlice from './slices/feed/feedSlice';
import userSlice from './slices/user/userSlice';

const rootReducer = combineReducers({
  // данные всех полученных ингредиентов;
  ingredients: ingredientsSlice,
  // данные конструктора бургера;
  burgerConstructor: burgerConstructorSlice,
  // данные создания заказа;
  order: orderSlice,
  // данные ленты и истории заказов;
  feed: feedSlice,
  // данные профиля пользователя.
  user: userSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
