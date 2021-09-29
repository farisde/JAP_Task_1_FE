import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaList from "./MediaList";
import classes from "./ContentTabs.module.css";
import { movieActions } from "../../store/movie-slice";
import { fetchMovieList, fetchSeriesList } from "../../store/movie-actions";
import { useInfiniteQuery } from "react-query";
import MediaTab from "./MediaTab";

const ContentTabs = () => {
  const searchContent = useSelector((state) => state.movie.searchContent);
  const toggleContent = useSelector((state) => state.movie.toggleContent);
  const dispatch = useDispatch();

  const moviesResponse = useInfiniteQuery("movies", fetchMovieList, {
    keepPreviousData: true,
    refetchInterval: 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const seriesResponse = useInfiniteQuery("series", fetchSeriesList, {
    keepPreviousData: true,
    refetchInterval: 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const handleMoviesTabClick = () => {
    dispatch(movieActions.setToggleContent("Movies"));
  };

  const handlSeriesTabClick = () => {
    dispatch(movieActions.setToggleContent("Series"));
  };

  return (
    <Fragment>
      <div className={classes.tabs}>
        <h2>Browse top rated</h2>
        <MediaTab
          name={"Movies"}
          isCorrectContentType={toggleContent === "Movies"}
          handleMediaTabClick={handleMoviesTabClick}
          searchContent={searchContent}
        />
        <MediaTab
          name={"TV Shows"}
          isCorrectContentType={toggleContent === "Series"}
          handleMediaTabClick={handlSeriesTabClick}
          searchContent={searchContent}
        />
      </div>
      <MediaList
        content={toggleContent === "Movies" ? moviesResponse : seriesResponse}
        setPageNumber={
          toggleContent === "Movies"
            ? movieActions.setMoviePageNumber
            : movieActions.setSeriesPageNumber
        }
      />
    </Fragment>
  );
};

export default ContentTabs;
