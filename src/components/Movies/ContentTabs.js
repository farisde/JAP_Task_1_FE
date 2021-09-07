import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import classes from "./ContentTabs.module.css";
import { movieActions } from "../../store/movie-slice";
import { fetchContentList } from "../../store/movie-actions";
import Loading from "../UI/Loading";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import NoSearchResults from "./NoSearchResults";

const ContentTabs = (props) => {
  const showMovies = useSelector((state) => state.movie.showMovies);
  const showSeries = useSelector((state) => state.movie.showSeries);
  const movies = useSelector((state) => state.movie.movies);
  const series = useSelector((state) => state.movie.series);
  const contentIsLoading = useSelector((state) => state.movie.contentIsLoading);
  const searchContent = useSelector((state) => state.movie.searchContent);
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

  const showNotFound =
    !contentIsLoading &&
    ((series.length === 0 && showSeries) ||
      (movies.length === 0 && showMovies)) &&
    searchContent.length > 1;

  return (
    <Fragment>
      <div className={classes.tabs}>
        <h2>Browse top rated</h2>
        <button
          className={`${classes.tabButton} ${
            showMovies && searchContent === ""
              ? classes.active
              : classes.toggleHover
          }`}
          onClick={handleMoviesTabClick}
        >
          Movies
        </button>
        <button
          className={`${classes.tabButton} ${
            showSeries && searchContent === ""
              ? classes.active
              : classes.toggleHover
          }`}
          onClick={handlSeriesTabClick}
        >
          TV Shows
        </button>
      </div>
      {contentIsLoading && <Loading text={"Loading content"} />}
      {showNotFound && (
        <NoSearchResults
          title={"No results found"}
          description={"We couldn't find any results matching your input"}
          icon={faFrown}
          iconSize={"9x"}
        />
      )}
      {showMovies && !showSeries && !contentIsLoading && (
        <MovieList
          contentList={movies}
          noResultsFound={showNotFound}
          isMovie={true}
        />
      )}
      {!showMovies && showSeries && !contentIsLoading && (
        <MovieList
          contentList={series}
          noResultsFound={showNotFound}
          isMovie={false}
        />
      )}
    </Fragment>
  );
};

export default ContentTabs;
