import { configureStore } from "@reduxjs/toolkit";
// import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { dashboardSnapshot } from "./dashboard.api.slice";
import { editRevuSnapshot } from "./edit-revu.api.slice";
import { addRevuSnapshot } from "./add-revu.api.slice";
import { revuSnapshot } from "./revu.api.slice";

const store = configureStore({
  reducer: {
    [dashboardSnapshot.reducerPath]: dashboardSnapshot.reducer,
    [revuSnapshot.reducerPath]: revuSnapshot.reducer,
    [editRevuSnapshot.reducerPath]: editRevuSnapshot.reducer,
    [addRevuSnapshot.reducerPath]: addRevuSnapshot.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta'],
      ignoredPaths: [/createdAt/, /createdBy/, /updatedAt/, /updatedBy/]
    }
  }).concat([
    dashboardSnapshot.middleware,
    revuSnapshot.middleware,
    editRevuSnapshot.middleware,
    addRevuSnapshot.middleware
  ]),
  // enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
  // devTools: true
});

export { store };
