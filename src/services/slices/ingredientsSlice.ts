import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export type TIngredientsState = {
  items: {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
  isIngredientsLoading: boolean;
  currentIngredient: TIngredient | null;
  // error: string | null;
};

const initialState: TIngredientsState = {
  items: {
    buns: [],
    mains: [],
    sauces: []
  },
  isIngredientsLoading: false,
  currentIngredient: null
  // error: null
};
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient(state, action: { payload: TIngredient | null }) {
      state.currentIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        // state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.items = {
          buns: action.payload.filter((item) => item.type === 'bun'),
          mains: action.payload.filter((item) => item.type === 'main'),
          sauces: action.payload.filter((item) => item.type === 'sauce')
        };
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        // state.error = action.payload as string;
      });
  }
});

export const { setCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
