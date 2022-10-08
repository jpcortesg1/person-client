import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  refresh: localStorage.getItem("refresh") || "",
  access: localStorage.getItem("access") || "",
  isAuthenticated: localStorage.getItem("access") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ refresh: string; access: string }>
    ) => {
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("access", action.payload.access);
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      state.refresh = "";
      state.access = "";
      state.isAuthenticated = false;
    },
    setAccess: (state, action: PayloadAction<string>) => {
      localStorage.setItem("access", action.payload);
      state.access = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAccess, setIsAuthenticated, login, logOut } =
  authSlice.actions;

export default authSlice.reducer;
