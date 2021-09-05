import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../store/movie-slice";
import Card from "../UI/Card";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const dispatch = useDispatch();
  const visibleMovies = useSelector((state) => state.movie.visibleMovies);
  const allContent = useSelector((state) => state.movie.allContent);
  const showLoadContentButton = useSelector(
    (state) => state.movie.showLoadContentButton
  );
  const searchContent = useSelector((state) => state.movie.searchContent);

  const loadMoreContentHandler = () => {
    if (
      allContent.filter(
        (m) =>
          (m.isMovie === props.isMovie && searchContent === "") ||
          searchContent !== ""
      ).length > visibleMovies
    ) {
      dispatch(movieActions.increaseVisibleMovies(1));
    }
  };

  return (
    <div className={classes.container}>
      <section className={classes.movies}>
        {props.contentList.map((movie) => (
          <Card key={movie.id.toString()}>
            <MovieItem movie={movie} />
          </Card>
        ))}
      </section>
      {!props.noResultsFound && showLoadContentButton && (
        <button className={classes.loadButton} onClick={loadMoreContentHandler}>
          <FontAwesomeIcon icon={faSpinner} />
          &nbsp; Load more
        </button>
      )}
    </div>
  );
};

export default MovieList;
