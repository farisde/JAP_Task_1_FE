import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    showLoginForm: false,
    showRegisterForm: false,
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
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
