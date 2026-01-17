import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients.slice';
import constructorReducer from './constructor/constructor.slice';
import currentIngredientReducer from './current-ingredient/current-ingredient.slice';
import orderReducer from './order/order.slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
