// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { TOrder, TIngredient } from '@utils-types';
// import {
//   getIngredientsApi,
//   getFeedsApi,
//   getOrdersApi,
//   orderBurgerApi,
//   getOrderByNumberApi
// } from '../../utils/burger-api';

// export type TOrderState = {
//   orders: TOrder[];
//   ingredients: TIngredient[];
//   total: number;
//   totalToday: number;
//   loading: boolean;
//   error: string | null;
// };

// const initialState: TOrderState = {
//   orders: [],
//   ingredients: [],
//   total: 0,
//   totalToday: 0,
//   loading: false,
//   error: null
// };

// // Асинхронные действия
// export const fetchIngredients = createAsyncThunk(
//   'order/fetchIngredients',
//   async () => {
//     const data = await getIngredientsApi();
//     return data;
//   }
// );

// export const fetchFeeds = createAsyncThunk('order/fetchFeeds', async () => {
//   const data = await getFeedsApi();
//   return data;
// });

// export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
//   const data = await getOrdersApi();
//   return data;
// });

// export const createOrder = createAsyncThunk(
//   'order/createOrder',
//   async (ingredients: string[]) => {
//     const data = await orderBurgerApi(ingredients);
//     return data.order;
//   }
// );

// export const fetchOrderByNumber = createAsyncThunk(
//   'order/fetchOrderByNumber',
//   async (number: number) => {
//     const data = await getOrderByNumberApi(number);
//     return data.orders[0]; // Возвращаем первый заказ из массива
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     // Синхронные редьюсеры (если нужны)
//     resetError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Загрузка ингредиентов
//       .addCase(fetchIngredients.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.ingredients = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.error = action.error.message || 'Failed to fetch ingredients';
//         state.loading = false;
//       })

//       // Загрузка ленты заказов
//       .addCase(fetchFeeds.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchFeeds.fulfilled, (state, action) => {
//         state.orders = action.payload.orders;
//         state.total = action.payload.total;
//         state.totalToday = action.payload.totalToday;
//         state.loading = false;
//       })
//       .addCase(fetchFeeds.rejected, (state, action) => {
//         state.error = action.error.message || 'Failed to fetch feeds';
//         state.loading = false;
//       })

//       // Загрузка заказов пользователя
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.orders = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.error = action.error.message || 'Failed to fetch orders';
//         state.loading = false;
//       })

//       // Создание заказа
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.orders.unshift(action.payload); // Добавляем новый заказ в начало списка
//         state.loading = false;
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.error = action.error.message || 'Failed to create order';
//         state.loading = false;
//       })

//       // Получение заказа по номеру
//       .addCase(fetchOrderByNumber.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
//         state.orders = [action.payload]; // Сохраняем заказ в массиве
//         state.loading = false;
//       })
//       .addCase(fetchOrderByNumber.rejected, (state, action) => {
//         state.error = action.error.message || 'Failed to fetch order by number';
//         state.loading = false;
//       });
//   }
// });

// // Экспорт синхронных редьюсеров (если есть)
// export const { resetError } = orderSlice.actions;

// export default orderSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';
import { setCurrentIngredient } from './ingredientsSlice';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { bun, ingredients } = state.burgerConstructor.constructorItems;

    if (!bun) {
      throw new Error('Необходимо выбрать булку');
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    return await orderBurgerApi(ingredientIds);
  }
);
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  // You'll need to implement or import getOrdersApi
  const data = await getOrdersApi();
  return data;
});
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

type TOrderState = {
  orders: TOrder[];
  ingredients: TIngredient[];
  currentOrder: TOrder | null;
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
};

const initialState: TOrderState = {
  orders: [],
  ingredients: [],
  currentOrder: null,
  orderNumber: null,
  loading: false,
  error: null,
  isModalOpen: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openOrderModal: (state) => {
      state.isModalOpen = true;
    },
    closeOrderModal: (state) => {
      state.isModalOpen = false;
      state.orderNumber = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number;
        state.loading = false;
        state.isModalOpen = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании заказа';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении заказа';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch orders';
        state.loading = false;
      });
  }
});

export const { openOrderModal, closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
