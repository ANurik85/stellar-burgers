import feedReducer, { fetchFeed, fetchUserOrders } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feed reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    userOrdersLoading: false,
    error: null,
    userOrdersError: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      number: 1234,
      name: 'Test Order',
      status: 'done',
      ingredients: ['ingredient1', 'ingredient2'],
      createdAt: '2024-03-26T10:00:00.000Z',
      updatedAt: '2024-03-26T10:00:00.000Z'
    }
  ];

  describe('fetchFeed', () => {
    it('should handle fetchFeed.pending', () => {
      const state = feedReducer(initialState, fetchFeed.pending(''));

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeed.fulfilled', () => {
      const mockResponse = {
        orders: mockOrders,
        total: 100,
        totalToday: 10,
        success: true
      };

      const state = feedReducer(
        initialState,
        fetchFeed.fulfilled(mockResponse, '')
      );

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeed.rejected', () => {
      const state = feedReducer(
        initialState,
        fetchFeed.rejected(new Error('Ошибка при загрузке ленты заказов'), '')
      );

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка при загрузке ленты заказов');
    });
  });

  describe('fetchUserOrders', () => {
    it('should handle fetchUserOrders.pending', () => {
      const state = feedReducer(initialState, fetchUserOrders.pending(''));

      expect(state.userOrdersLoading).toBe(true);
      expect(state.userOrdersError).toBeNull();
    });

    it('should handle fetchUserOrders.fulfilled', () => {
      const state = feedReducer(
        initialState,
        fetchUserOrders.fulfilled(mockOrders, '')
      );

      expect(state.userOrdersLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.userOrdersError).toBeNull();
    });

    it('should handle fetchUserOrders.rejected', () => {
      const state = feedReducer(
        initialState,
        fetchUserOrders.rejected(
          new Error('Ошибка при загрузке истории заказов'),
          ''
        )
      );

      expect(state.userOrdersLoading).toBe(false);
      expect(state.userOrdersError).toBe('Ошибка при загрузке истории заказов');
    });
  });

  it('should return initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
