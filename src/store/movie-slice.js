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
  },
  reducers: {
    replaceContentList(state, action) {
      state.allContent = action.payload.content;
      state.movies = action.payload.content.filter((m) => m.isMovie);
      state.series = action.payload.content.filter((m) => !m.isMovie);
      state.contentIsLoading = false;
    },
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
      if (state.showMovies) {
        state.movies = action.payload.content;
      } else if (state.showSeries) {
        state.series = action.payload.content;
      }
      state.contentIsLoading = false;
    },
    setContentLoading(state, action) {
      state.contentIsLoading = action.payload;
    },
    resetSearchResults(state) {
      //sa BackEnda trebas vratiti friskih top 10 filmova ili serija. tako je najlakse da ne komplikujes ovaj dio!
      // if (state.showMovies) {
      //   state.movies = state.allContent.filter((m) => m.isMovie);
      // } else if (state.showSeries) {
      //   state.series = state.allContent.filter((m) => !m.isMovie);
      // }
      state.searchContent = "";
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
