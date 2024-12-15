import { TIngredient } from '@utils-types';
// import { RootState } from 'src/services/store';
export type RootState = {
  ingredients: {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
};
export const rootReducer = (
  state: RootState = { ingredients: { buns: [], mains: [], sauces: [] } },
  action: { type: string; ingredients: TIngredient[] }
) => {
  switch (action.type) {
    case 'SET_INGREDIENTS':
      return { ...state, ingredients: action.ingredients };
    default:
      return state;
  }

  // switch (action.type) {
  //   case REORDER_INGREDIENTS: {
  //     const ingredients = [...state.ingredients];
  //     ingredients.splice(
  //       action.payload.to,
  //       0,
  //       ingredients.splice(action.payload.from, 1)[0]
  //     );
  //     return {
  //       ...state,
  //       ingredients
  //     };
  //   }
  //   default:
  //     return state;
  // }
};
