import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor,
  setOrderRequest,
  setOrderModalData,
  moveIngredientUp,
  moveIngredientDown
} from './burgerconstructorSlice';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

describe('burgerConstructor reducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  const mockIngredient: TIngredient = {
    _id: '1',
    type: 'main',
    name: 'Test Ingredient',
    price: 100,
    image: 'test.jpg',
    calories: 200,
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    image_mobile: 'test-mobile.jpg',
    image_large: 'test-large.jpg'
  };

  const mockBun: TIngredient = {
    _id: '2',
    type: 'bun',
    name: 'Test Bun',
    price: 200,
    image: 'bun.jpg',
    calories: 300,
    proteins: 30,
    fat: 30,
    carbohydrates: 30,
    image_mobile: 'bun-mobile.jpg',
    image_large: 'bun-large.jpg'
  };

  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addIngredient', () => {
    it('should handle adding main ingredient', () => {
      const state = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );

      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toMatchObject({
        ...mockIngredient,
        id: expect.any(String)
      });
    });

    it('should handle adding bun', () => {
      const state = burgerConstructorReducer(
        initialState,
        addIngredient(mockBun)
      );

      expect(state.constructorItems.bun).toMatchObject({
        ...mockBun,
        id: expect.any(String)
      });
    });
  });

  describe('removeIngredient', () => {
    it('should handle removing ingredient by id', () => {
      const stateWithIngredient = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      const ingredientId =
        stateWithIngredient.constructorItems.ingredients[0].id;

      const state = burgerConstructorReducer(
        stateWithIngredient,
        removeIngredient(ingredientId)
      );
      expect(state.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('resetConstructor', () => {
    it('should reset constructor to initial state', () => {
      const stateWithIngredients = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );

      const state = burgerConstructorReducer(
        stateWithIngredients,
        resetConstructor()
      );
      expect(state.constructorItems).toEqual(initialState.constructorItems);
    });
  });

  describe('setOrderRequest', () => {
    it('should set order request state', () => {
      const state = burgerConstructorReducer(
        initialState,
        setOrderRequest(true)
      );
      expect(state.orderRequest).toBe(true);
    });
  });

  describe('setOrderModalData', () => {
    it('should set order modal data', () => {
      const mockOrder: TOrder = {
        _id: '1',
        number: 1234,
        name: 'Test Order',
        status: 'done',
        ingredients: ['1', '2'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const state = burgerConstructorReducer(
        initialState,
        setOrderModalData(mockOrder)
      );
      expect(state.orderModalData).toEqual(mockOrder);
    });
  });

  describe('moveIngredients', () => {
    const ingredientsState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mockIngredient, id: '1', name: 'First' },
          { ...mockIngredient, id: '2', name: 'Second' },
          { ...mockIngredient, id: '3', name: 'Third' }
        ]
      }
    };

    it('should move ingredient up', () => {
      const state = burgerConstructorReducer(
        ingredientsState,
        moveIngredientUp(1)
      );
      expect(state.constructorItems.ingredients[0].id).toBe('2');
      expect(state.constructorItems.ingredients[1].id).toBe('1');
    });

    it('should move ingredient down', () => {
      const state = burgerConstructorReducer(
        ingredientsState,
        moveIngredientDown(0)
      );
      expect(state.constructorItems.ingredients[0].id).toBe('2');
      expect(state.constructorItems.ingredients[1].id).toBe('1');
    });

    it('should not move first ingredient up', () => {
      const state = burgerConstructorReducer(
        ingredientsState,
        moveIngredientUp(0)
      );
      expect(state.constructorItems.ingredients[0].id).toBe('1');
    });

    it('should not move last ingredient down', () => {
      const state = burgerConstructorReducer(
        ingredientsState,
        moveIngredientDown(2)
      );
      expect(state.constructorItems.ingredients[2].id).toBe('3');
    });
  });
});
