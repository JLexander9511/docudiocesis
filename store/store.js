import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage';
import { appSlice } from './app/slices';


const persistConfig = {
  key: 'docudiocese',
  storage
}

 const rootReducer = combineReducers({ 
  app: appSlice.reducer
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

/*export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})*/
 
export const persistor = persistStore(store)
