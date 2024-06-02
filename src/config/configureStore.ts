/**
 * # configureStore.ts
 *
 * A Redux boilerplate setup
 *
 */
'use strict';

/**
 * ## Imports
 *
 * redux functions
 */
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import createTransform, {
  createFilter,
  createBlacklistFilter,
  createWhitelistFilter,
} from 'redux-persist-transform-filter';

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ## Reducer
 * The reducer contains the N reducers from
 * device, auth, profile etc...
 */
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth',],
  blacklist: ['device', 'storedata'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
