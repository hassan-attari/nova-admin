import { configureStore } from '@reduxjs/toolkit';
import preferences from './preferencesSlice';
import auth from './authSlice';
import products from './productsSlice';
import users from './usersSlice';

export const store = configureStore({
  reducer: { preferences, auth, products, users },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
