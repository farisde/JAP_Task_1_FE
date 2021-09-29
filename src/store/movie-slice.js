import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    searchContent: "",
    toggleContent: "Movies",
    contentIsLoading: false,
  },
  reducers: {
    setToggleContent(state, action) {
      state.toggleContent = action.payload;
    },
    setContentList(state, action) {
      state.contentList = action.payload;
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
      state.contentList = action.payload.content;
      state.visibleMovies = 10;
      if (state.contentList.length <= state.visibleMovies) {
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
    resetSearchResults(state) {
      state.searchContent = "";
      state.visibleMovies = 10;
      state.showLoadContentButton = true;
    },
    setShowLoadContentButton(state, action) {
      state.showLoadContentButton = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
