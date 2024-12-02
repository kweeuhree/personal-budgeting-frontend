import {
  configureStore,
  combineSlices,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi, budgetApi, expenseApi, categoryApi } from "./apis";
import { logger, listenerMiddleware } from "./middleware";
import {
  userReducer,
  csrfReducer,
  budgetReducer,
  expenseReducer,
  categoryReducer,
} from "./slices";

const rootReducer = combineSlices({
  csrf: csrfReducer,
  user: userReducer,
  budget: budgetReducer,
  expenses: expenseReducer,
  categories: categoryReducer,
  [authApi.reducerPath]: authApi.reducer,
  [budgetApi.reducerPath]: budgetApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(logger)
        .concat(authApi.middleware)
        .concat(budgetApi.middleware)
        .concat(expenseApi.middleware)
        .concat(categoryApi.middleware)
        .concat(listenerMiddleware.middleware);
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
