import { createSlice } from "@reduxjs/toolkit";
import { initialMovies, initialSeries } from "./data";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: initialMovies,
    series: initialSeries,
    showMovies: true,
    showSeries: false,
    searchContent: "",
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
    setSearchContent(state, action) {
      state.searchContent = action.payload;
    },
    filterSearchResults(state) {
      let filteredContent = [];

      if (state.showMovies) {
        filteredContent = [...initialMovies];
      } else if (state.showSeries) {
        filteredContent = [...initialSeries];
      }

      filteredContent = filteredContent.filter((item) => {
        return (
          item.title
            .toUpperCase()
            .includes(state.searchContent.toUpperCase()) ||
          item.description
            .toUpperCase()
            .includes(state.searchContent.toUpperCase()) ||
          item.cast.find((c) =>
            c.toUpperCase().includes(state.searchContent.toUpperCase())
          )
        );
      });

      if (state.showMovies) {
        state.movies = filteredContent;
      } else if (state.showSeries) {
        state.series = filteredContent;
      }
    },
    resetSearchResults(state) {
      if (state.showMovies) {
        state.movies = [...initialMovies];
      } else if (state.showSeries) {
        state.series = [...initialSeries];
      }
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
