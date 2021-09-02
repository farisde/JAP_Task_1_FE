import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import classes from "./ContentTabs.module.css";
import { movieActions } from "../../store/movie-slice";

const ContentTabs = (props) => {
  const showMovies = useSelector((state) => state.movie.showMovies);
  const showSeries = useSelector((state) => state.movie.showSeries);
  const movies = useSelector((state) => state.movie.movies);
  const series = useSelector((state) => state.movie.series);
  const dispatch = useDispatch();

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
      {showMovies && !showSeries && <MovieList contentList={movies} />}
      {showSeries && !showMovies && <MovieList contentList={series} />}
    </Fragment>
  );
};

export default ContentTabs;
