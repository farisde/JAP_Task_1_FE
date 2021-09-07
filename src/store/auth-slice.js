import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    showLoginForm: false,
    showRegisterForm: false,
  },
  reducers: {
    setShowLoginForm(state, action) {
      state.isLoginForm = action.payload;
    },
    setShowRegisterForm(state, action) {
      state.isLoginForm = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
