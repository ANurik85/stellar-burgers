import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

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
      });
  }
});

export const { openOrderModal, closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
