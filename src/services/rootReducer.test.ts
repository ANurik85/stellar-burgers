import rootReducer from './rootReducer';
import { initialState as ingredientsInitialState } from './slices/ingredients/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from './slices/constructor/burgerconstructorSlice';
import { initialState as orderInitialState } from './slices/order/orderSlice';
import { initialState as feedInitialState } from './slices/feed/feedSlice';
import { initialState as userInitialState } from './slices/user/userSlice';

describe('rootReducer', () => {
  it('should return initial state when passed undefined state and unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      order: orderInitialState,
      feed: feedInitialState,
      user: userInitialState
    });
  });

  it('should handle combined reducers properly', () => {
    const state = rootReducer(undefined, { type: 'INIT' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
  });
});
