import { movieActions } from "./movie-slice";

export const fetchContentList = () => {
  return async (dispatch) => {
    const fetchMovies = async () => {
      const response = await fetch("https://localhost:5001/Movie/AllMovies");

      if (!response.ok) {
        throw new Error("Something went wrong while fetching movie data!");
      }

      const allContent = await response.json();
      return allContent.data;
    };

    try {
      const allContent = await fetchMovies();
      dispatch(
        movieActions.replaceContentList({
          content: allContent || [],
        })
      );
    } catch (error) {
      console.log("sad zasad samo ovako", error);
    }
  };
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
        })
      );
    } catch (error) {
      console.log("sad zasad samo ovako", error);
    }
  };
};
