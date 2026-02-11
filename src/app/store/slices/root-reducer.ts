import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients.slice';
import constructorReducer from '@/app/store/slices/burger-constructor/burger-constructor.slice.ts';
import currentIngredientReducer from './current-ingredient/current-ingredient.slice';
import orderReducer from './order/order.slice';
import { orderFeedReducer } from './order-feed';
import userReducer from './user/user.slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer,
  user: userReducer,
});
