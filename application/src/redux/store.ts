import { configureStore } from "@reduxjs/toolkit";
import revusSlice from "./revus.slice";

const store = configureStore({
  reducer: {
    revus: revusSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true
});

export { store };
