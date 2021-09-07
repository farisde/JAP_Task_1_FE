import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    showLoginForm: false,
    showRegisterForm: false,
    token: localStorage.getItem("auth-token") || null,
    isLoggedIn:
      localStorage.getItem("auth-token") !== undefined &&
      localStorage.getItem("auth-token") !== null,
  },
  reducers: {
    setShowLoginForm(state, action) {
      if (state.showRegisterForm) {
        state.showRegisterForm = false;
      }
      state.showLoginForm = action.payload;
    },
    setShowRegisterForm(state, action) {
      if (state.showLoginForm) {
        state.showLoginForm = false;
      }
      state.showRegisterForm = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload != null) {
        localStorage.setItem("auth-token", state.token);
      } else {
        localStorage.removeItem("auth-token");
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
