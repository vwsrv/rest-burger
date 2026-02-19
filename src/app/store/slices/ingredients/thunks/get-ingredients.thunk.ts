import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData, groupIngredients } from '@/entities/ingridients';

export const getIngredients = createAsyncThunk('ingredients/getIngredients', () =>
  getIngredientsData().then(groupIngredients)
);
