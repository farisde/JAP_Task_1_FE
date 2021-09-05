import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    allContent: [],
    movies: [],
    series: [],
    showMovies: true,
    showSeries: false,
    searchContent: "",
    contentIsLoading: true,
    visibleMovies: 1,
    showLoadContentButton: true,
  },
  reducers: {
    replaceContentList(state, action) {
      if (!action.payload.newRatingsRecieved) {
        state.visibleMovies = 1;
      }
      state.allContent = action.payload.content;
      state.movies = action.payload.content
        .filter((m) => m.isMovie)
        .slice(0, state.visibleMovies);
      state.series = action.payload.content
        .filter((m) => !m.isMovie)
        .slice(0, state.visibleMovies);
      state.contentIsLoading = false;
      if (!action.payload.newRatingsRecieved) {
        state.showLoadContentButton = true;
      }
    },
    showMovies(state) {
      if (!state.showMovies) {
        state.showMovies = !state.showMovies;
        state.showSeries = !state.showSeries;
        state.visibleMovies = 1;
        state.movies = state.movies.slice(0, state.visibleMovies);
        if (state.movies.length <= state.visibleMovies) {
          state.showLoadContentButton = true;
        } else {
          state.showLoadContentButton = false;
        }
      }
    },
    showSeries(state) {
      if (!state.showSeries) {
        state.showSeries = !state.showSeries;
        state.showMovies = !state.showMovies;
        state.visibleMovies = 1;
        state.series = state.series.slice(0, state.visibleMovies);
        if (state.series.length <= state.visibleMovies) {
          state.showLoadContentButton = true;
        } else {
          state.showLoadContentButton = false;
        }
      }
    },
    setSearchContent(state, action) {
      if (state.searchContent !== "") {
        if (!state.contentIsLoading) {
          state.contentIsLoading = true;
        }
        state.searchContent = action.payload;
      } else {
        state.searchContent = action.payload;
        state.contentIsLoading = false;
      }
    },
    replaceContentAfterSearch(state, action) {
      state.allContent = action.payload.content;
      state.visibleMovies = 1;
      if (state.allContent.length <= state.visibleMovies) {
        state.showLoadContentButton = false;
      } else {
        state.showLoadContentButton = true;
      }
      if (state.showMovies) {
        state.movies = action.payload.content.slice(0, state.visibleMovies);
      } else if (state.showSeries) {
        state.series = action.payload.content.slice(0, state.visibleMovies);
      }
      state.contentIsLoading = false;
    },
    setContentLoading(state, action) {
      state.contentIsLoading = action.payload;
    },
    increaseVisibleMovies(state, action) {
      state.visibleMovies += action.payload;
      if (state.showMovies) {
        state.movies = state.allContent
          .filter(
            (m) =>
              (m.isMovie && state.searchContent === "") ||
              state.searchContent !== ""
          )
          .slice(0, state.visibleMovies);
        if (state.movies.length <= state.visibleMovies) {
          state.showLoadContentButton = false;
        }
      } else if (state.showSeries) {
        state.series = state.allContent
          .filter(
            (m) =>
              (!m.isMovie && state.searchContent === "") ||
              state.searchContent !== ""
          )
          .slice(0, state.visibleMovies);
        if (state.series.length <= state.visibleMovies) {
          state.showLoadContentButton = false;
        }
      }
    },
    resetSearchResults(state) {
      state.searchContent = "";
      state.visibleMovies = 1;
      state.showLoadContentButton = true;
    },
    setShowLoadContentButton(state, action) {
      state.showLoadContentButton = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
