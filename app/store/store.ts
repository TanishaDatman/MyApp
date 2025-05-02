import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import ownerReducer from './features/owner/ownerSlice';
import businessReducer from './features/business/businessSlice';
import tradingReducer from './features/trading/tradingSlice';
import bankReducer from './features/bank/bankSlice';
import { combineReducers } from 'redux';

// 1. Combine all reducers
const rootReducer = combineReducers({
  owner: ownerReducer,
  business: businessReducer,
  trading: tradingReducer,
  bank: bankReducer,
});

// 2. Configure persist
const persistConfig = {
  key: 'root', 
  storage,
};

// 3. Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

// 5. Create a persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
