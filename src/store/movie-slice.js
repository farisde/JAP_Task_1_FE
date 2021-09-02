import { createSlice } from "@reduxjs/toolkit";
import { initialMovies, initialSeries } from "./data";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: initialMovies,
    series: initialSeries,
    showMovies: true,
    showSeries: false,
  },
  reducers: {
    showMovies(state) {
      if (!state.showMovies) {
        state.showMovies = !state.showMovies;
        state.showSeries = !state.showSeries;
      }
    },
    showSeries(state) {
      if (!state.showSeries) {
        state.showSeries = !state.showSeries;
        state.showMovies = !state.showMovies;
      }
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
