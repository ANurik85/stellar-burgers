import ingredientsReducer, {
  fetchIngredients,
  setCurrentIngredient
} from './ingredientsSlice';
import { TIngredient } from '../../../utils/types';

describe('ingredients reducer', () => {
  const initialState = {
    items: {
      buns: [],
      mains: [],
      sauces: []
    },
    isIngredientsLoading: false,
    currentIngredient: null
  };

  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(state.isIngredientsLoading).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        price: 100,
        image: 'bun.jpg',
        calories: 200,
        proteins: 20,
        fat: 20,
        carbohydrates: 20,
        image_large: 'bun_large.jpg',
        image_mobile: 'bun_mobile.jpg'
      },
      {
        _id: '2',
        name: 'Котлета',
        type: 'main',
        price: 150,
        image: 'main.jpg',
        calories: 300,
        proteins: 30,
        fat: 30,
        carbohydrates: 30,
        image_large: 'main_large.jpg',
        image_mobile: 'main_mobile.jpg'
      },
      {
        _id: '3',
        name: 'Соус',
        type: 'sauce',
        price: 50,
        image: 'sauce.jpg',
        calories: 100,
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        image_large: 'sauce_large.jpg',
        image_mobile: 'sauce_mobile.jpg'
      }
    ];

    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.items.buns).toHaveLength(1);
    expect(state.items.mains).toHaveLength(1);
    expect(state.items.sauces).toHaveLength(1);
    expect(state.items.buns[0]).toEqual(mockIngredients[0]);
    expect(state.items.mains[0]).toEqual(mockIngredients[1]);
    expect(state.items.sauces[0]).toEqual(mockIngredients[2]);
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = ingredientsReducer(
      { ...initialState, isIngredientsLoading: true },
      fetchIngredients.rejected(null, '', undefined)
    );

    expect(state.isIngredientsLoading).toBe(false);
  });

  it('should handle setCurrentIngredient', () => {
    const mockIngredient: TIngredient = {
      _id: '1',
      name: 'Тестовый ингредиент',
      type: 'main',
      price: 100,
      image: 'test.jpg',
      calories: 200,
      proteins: 20,
      fat: 20,
      carbohydrates: 20,
      image_large: 'test_large.jpg',
      image_mobile: 'test_mobile.jpg'
    };

    const state = ingredientsReducer(
      initialState,
      setCurrentIngredient(mockIngredient)
    );

    expect(state.currentIngredient).toEqual(mockIngredient);
  });

  it('should handle setCurrentIngredient with null', () => {
    const state = ingredientsReducer(
      {
        ...initialState,
        currentIngredient: {
          _id: '1',
          name: 'Test',
          type: 'main',
          price: 100,
          image: 'test.jpg',
          calories: 200,
          proteins: 20,
          fat: 20,
          carbohydrates: 20,
          image_large: 'test_large.jpg',
          image_mobile: 'test_mobile.jpg'
        }
      },
      setCurrentIngredient(null)
    );

    expect(state.currentIngredient).toBeNull();
  });
});
