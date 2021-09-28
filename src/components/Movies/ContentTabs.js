import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaList from "./MediaList";
import classes from "./ContentTabs.module.css";
import { movieActions } from "../../store/movie-slice";
import { fetchMediaList } from "../../store/movie-actions";
import Loading from "../Shared/Loading";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import NoSearchResults from "./NoSearchResults";
import { useQuery } from "react-query";

const ContentTabs = (props) => {
  const showMovies = useSelector((state) => state.movie.showMovies);
  const showSeries = useSelector((state) => state.movie.showSeries);
  const movies = useSelector((state) => state.movie.movies);
  const series = useSelector((state) => state.movie.series);
  const contentIsLoading = useSelector((state) => state.movie.contentIsLoading);
  const searchContent = useSelector((state) => state.movie.searchContent);
  const dispatch = useDispatch();

  const contentList = useSelector((state) => state.movie.contentList);
  const toggleContent = useSelector((state) => state.movie.toggleContent);
  const pageNumber = useSelector((state) => state.movie.pageNumber);

  const moviesResponse = useQuery("movies", () =>
    fetchMediaList({ mediaType: 1, pageNumber })
  );

  const seriesResponse = useQuery("series", () =>
    fetchMediaList({ mediaType: 2, pageNumber })
  );

  // useEffect(() => {
  //   if (toggleContent === "Movies") {
  //     dispatch(movieActions.setContentList(moviesResponse));
  //   }
  // }, [toggleContent]);

  const handleMoviesTabClick = () => {
    dispatch(movieActions.setToggleContent("Movies"));
  };

  const handlSeriesTabClick = () => {
    dispatch(movieActions.setToggleContent("Series"));
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
            toggleContent === "Movies" && searchContent === ""
              ? classes.active
              : classes.toggleHover
          }`}
          onClick={handleMoviesTabClick}
        >
          Movies
        </button>
        <button
          className={`${classes.tabButton} ${
            toggleContent === "Series" && searchContent === ""
              ? classes.active
              : classes.toggleHover
          }`}
          onClick={handlSeriesTabClick}
        >
          TV Shows
        </button>
      </div>
      {/* {moviesResponse.isLoading ||
        (seriesResponse.isLoading && <Loading text={"Loading content"} />)}
      {showNotFound && (
        <NoSearchResults
          title={"No results found"}
          description={"We couldn't find any results matching your input"}
          icon={faFrown}
          iconSize={"9x"}
        />
      )} */}
      <MediaList
        content={toggleContent === "Movies" ? moviesResponse : seriesResponse}
        noResultsFound={showNotFound}
      />
    </Fragment>
  );
};

export default ContentTabs;
