import { configureStore } from "@reduxjs/toolkit";
import personReducer from "../features/persons/personSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    persons: personReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
