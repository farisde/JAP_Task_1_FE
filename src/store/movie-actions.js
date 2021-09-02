import { movieActions } from "./movie-slice";
import { initialMovies } from "./data";

export const fetchContentList = () => {
  return async (dispatch) => {
    const fetchMovies = async () => {
      return initialMovies;
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
