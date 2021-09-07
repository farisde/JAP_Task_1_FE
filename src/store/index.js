import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import movieReducer from "./movie-slice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    auth: authSlice,
  },
});

export default store;
