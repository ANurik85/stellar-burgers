import orderReducer, {
  createOrder,
  getOrderByNumber,
  openOrderModal,
  closeOrderModal
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('order reducer', () => {
  const initialState = {
    orders: [],
    ingredients: [],
    currentOrder: null,
    orderNumber: null,
    loading: false,
    error: null,
    isModalOpen: false
  };

  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const state = orderReducer(
      initialState,
      createOrder.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const mockPayload = {
      success: true,
      order: {
        _id: '123',
        number: 12345,
        name: '',
        status: 'выполнен',
        createdAt: '',
        updatedAt: '',
        ingredients: ['60d3b41abdacab0026a733c6']
      },
      name: '',
      createdAt: '',
      updatedAt: '',
      status: 'выполнен',
      ingredients: ['60d3b41abdacab0026a733c6']
    };

    const state = orderReducer(
      initialState,
      createOrder.fulfilled(mockPayload, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.orderNumber).toBe(12345);
    expect(state.isModalOpen).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Необходимо выбрать булку';
    const state = orderReducer(
      initialState,
      createOrder.rejected(new Error(errorMessage), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle getOrderByNumber.pending', () => {
    const state = orderReducer(
      initialState,
      getOrderByNumber.pending('', 12345)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getOrderByNumber.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '1',
      number: 12345,
      ingredients: ['ingredient1', 'ingredient2'],
      status: 'done',
      name: 'Test Order',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const state = orderReducer(
      initialState,
      getOrderByNumber.fulfilled(mockOrder, '', 12345)
    );

    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('should handle getOrderByNumber.rejected', () => {
    const errorMessage = 'Ошибка при получении заказа';
    const state = orderReducer(
      initialState,
      getOrderByNumber.rejected(new Error(errorMessage), '', 12345)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle openOrderModal', () => {
    const state = orderReducer(initialState, openOrderModal());
    expect(state.isModalOpen).toBe(true);
  });

  it('should handle closeOrderModal', () => {
    const state = orderReducer(
      { ...initialState, isModalOpen: true, orderNumber: 12345 },
      closeOrderModal()
    );

    expect(state.isModalOpen).toBe(false);
    expect(state.orderNumber).toBeNull();
  });
});
