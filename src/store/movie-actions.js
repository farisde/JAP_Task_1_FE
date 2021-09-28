import { movieActions } from "./movie-slice";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const fetchMediaList = async (query) => {
  const response = await fetch(
    REACT_APP_API_URL +
      "api/Media?MediaType=" +
      query.mediaType +
      "&PageNumber=" +
      query.pageNumber
  );

  if (!response.ok) {
    throw new Error("Something went wrong while fetching movie data!");
  }

  return await response.json();
  // return async (dispatch) => {
  //   const fetchMovies = async () => {
  //     const response = await fetch(REACT_APP_API_URL + "api/media?MediaType=" + query.mediaType);

  //     if (!response.ok) {
  //       throw new Error("Something went wrong while fetching movie data!");
  //     }

  //     return await response.json();
  //   };

  //   try {
  //     const allContent = await fetchMovies();

  //   } catch (error) {
  //     console.log("sad zasad samo ovako", error);
  //   }
  // };
};

export const updateContentRating = (movieId, ratingValue) => {
  return async (dispatch) => {
    const postNewRating = async () => {
      const response = await fetch(
        "https://localhost:5001/Movie/AddMovieRating",
        {
          method: "POST",
          body: JSON.stringify({ ratedMovieId: movieId, value: ratingValue }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching movie data!");
      }

      const allContent = await response.json();
      return allContent.data;
    };

    try {
      const allContent = await postNewRating();
      dispatch(
        movieActions.replaceContentList({
          content: allContent || [],
          newRatingsRecieved: true,
        })
      );
      dispatch(movieActions.resetSearchResults());
    } catch (error) {
      console.log("sad zasad samo ovako", error);
    }
  };
};

export const sendSearchQuery = (searchPhrase) => {
  return async (dispatch) => {
    const postSearchPhrase = async () => {
      const response = await fetch(
        "https://localhost:5001/Movie/SendSearchResults",
        {
          method: "POST",
          body: JSON.stringify({ searchPhrase }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching movie data!");
      }

      const allContent = await response.json();
      return allContent.data;
    };

    try {
      const allContent = await postSearchPhrase();
      dispatch(
        movieActions.replaceContentAfterSearch({
          content: allContent || [],
        })
      );
    } catch (error) {
      console.log("sad zasad samo ovako", error);
    }
  };
};
