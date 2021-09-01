import { createSlice } from "@reduxjs/toolkit";
import { initialMovies, initialSeries } from "./data";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: initialMovies,
    series: initialSeries,
  },
  reducers: {},
});

export default movieSlice.reducer;
