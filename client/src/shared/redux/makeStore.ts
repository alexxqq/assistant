import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";

export const makeStore = (reducers: ReducersMapObject) => {
  return configureStore({
    reducer: reducers,
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
