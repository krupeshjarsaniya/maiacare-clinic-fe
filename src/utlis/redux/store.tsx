import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/authSlice";
import headerSlice from "./slices/headerSlice";

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    header: headerSlice,
   },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
