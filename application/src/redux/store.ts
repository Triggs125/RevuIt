import { configureStore } from "@reduxjs/toolkit";
import revusSlice from "./revus.slice";
import { revusSnapshot } from "./revus.api.slice";

const store = configureStore({
  reducer: {
    revus: revusSlice,
    [revusSnapshot.reducerPath]: revusSnapshot.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta'],
      ignoredPaths: [/createdAt/, /createdBy/, /updatedAt/, /updatedBy/]
    }
  }).concat([revusSnapshot.middleware]),
  devTools: true
});

export { store };
