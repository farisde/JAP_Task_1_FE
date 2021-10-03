import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    searchContent: "",
    toggleContent: "movies",
    contentIsLoading: false,
  },
  reducers: {
    setToggleContent(state, action) {
      state.toggleContent = action.payload;
    },
    setContentLoading(state, action) {
      state.contentIsLoading = action.payload;
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
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
