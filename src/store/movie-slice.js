import { createSlice } from "@reduxjs/toolkit";
import { initialMovies } from "./data";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    allContent: [],
    movies: [],
    series: [],
    showMovies: true,
    showSeries: false,
    searchContent: "",
  },
  reducers: {
    replaceContentList(state, action) {
      state.allContent = action.payload.content;
      state.movies = action.payload.content.filter((m) => m.isMovie);
      state.series = action.payload.content.filter((m) => !m.isMovie);
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
      state.searchContent = action.payload;
    },
    filterSearchResults(state) {
      let filteredContent = [...state.movies, ...state.series];

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
      //sa BackEnda trebas vratiti friskih top 10 filmova ili serija. tako je najlakse da ne komplikujes ovaj dio!
      if (state.showMovies) {
        state.movies = state.allContent.filter((m) => m.isMovie);
      } else if (state.showSeries) {
        state.series = state.allContent.filter((m) => !m.isMovie);
      }
    },
    updateMovieRating(state, action) {
      let itemIndex = -1;
      if (state.showMovies) {
        itemIndex = state.movies.findIndex(
          (item) => item.id == action.payload.itemId
        );
        state.movies[itemIndex].ratingList.push(action.payload.newRating);
        state.movies[itemIndex].rating =
          state.movies[itemIndex].ratingList.reduce((i1, i2) => i1 + i2, 0) /
          state.movies[itemIndex].ratingList.length;
      } else if (state.showSeries) {
        itemIndex = state.series.findIndex(
          (item) => item.id == action.payload.itemId
        );
        state.series[itemIndex].ratingList.push(action.payload.newRating);
        state.series[itemIndex].rating =
          state.series[itemIndex].ratingList.reduce((i1, i2) => i1 + i2, 0) /
          state.series[itemIndex].ratingList.length;
      }
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
