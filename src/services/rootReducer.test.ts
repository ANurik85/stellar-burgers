import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return initial state when passed undefined state and unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        items: {
          buns: [],
          mains: [],
          sauces: []
        },
        isIngredientsLoading: false,
        currentIngredient: null
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null
      },
      order: {
        orders: [],
        ingredients: [],
        currentOrder: null,
        orderNumber: null,
        loading: false,
        error: null,
        isModalOpen: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        userOrdersLoading: false,
        error: null,
        userOrdersError: null
      },
      user: {
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
      }
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
