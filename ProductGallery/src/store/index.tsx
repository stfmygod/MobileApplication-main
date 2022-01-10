import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { products } from './product/products';
import { user } from './user/user';
import { data } from './data/data';

const persistConfig = {
  key: 'ips',
  version: 1,
  storage,
};

const reducer = combineReducers({
  products,
  user,
  data,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export let persistor = persistStore(store);
