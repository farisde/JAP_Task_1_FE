import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import classes from "./ContentTabs.module.css";
import { movieActions } from "../../store/movie-slice";
import { fetchContentList } from "../../store/movie-actions";
import Loading from "../UI/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-regular-svg-icons";

const ContentTabs = (props) => {
  const showMovies = useSelector((state) => state.movie.showMovies);
  const showSeries = useSelector((state) => state.movie.showSeries);
  const movies = useSelector((state) => state.movie.movies);
  const series = useSelector((state) => state.movie.series);
  const contentIsLoading = useSelector((state) => state.movie.contentIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContentList());
  }, [dispatch]);

  const handleMoviesTabClick = () => {
    dispatch(movieActions.showMovies());
  };

  const handlSeriesTabClick = () => {
    dispatch(movieActions.showSeries());
  };

  return (
    <Fragment>
      <div className={classes.tabs}>
        <h2>Browse top rated</h2>
        <button
          className={`${classes.tabButton} ${
            showMovies ? classes.active : classes.toggleHover
          }`}
          onClick={handleMoviesTabClick}
        >
          Movies
        </button>
        <button
          className={`${classes.tabButton} ${
            showSeries ? classes.active : classes.toggleHover
          }`}
          onClick={handlSeriesTabClick}
        >
          TV Shows
        </button>
      </div>
      {contentIsLoading && <Loading text={"Loading content"} />}
      {!contentIsLoading && (series.length === 0 || movies.length === 0) && (
        <div className={classes.noResults}>
          <FontAwesomeIcon icon={faFrown} size="9x" />
          <h2>No results found</h2>
          <h4>We couldn't find any results matching your input</h4>
        </div>
      )}
      {showMovies && !showSeries && !contentIsLoading && (
        <MovieList contentList={movies} />
      )}
      {!showMovies && showSeries && !contentIsLoading && (
        <MovieList contentList={series} />
      )}
    </Fragment>
  );
};

export default ContentTabs;
