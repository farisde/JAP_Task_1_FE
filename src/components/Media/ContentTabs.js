import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaList from "./MediaList";
import classes from "./ContentTabs.module.css";
import { movieActions } from "../../store/movie-slice";
import { fetchMediaList, fetchSearchResults } from "../../store/movie-actions";
import { useInfiniteQuery } from "react-query";
import MediaTab from "./MediaTab";
import { useHistory, useParams } from "react-router";
import links from "../../links/links";

const ContentTabs = () => {
  const searchContent = useSelector((state) => state.movie.searchContent);
  const toggleContent = useSelector((state) => state.movie.toggleContent);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.media === "movies") {
      dispatch(movieActions.setToggleContent("movies"));
      history.push(links.movies.url);
    } else if (params.media === "series") {
      dispatch(movieActions.setToggleContent("series"));
      history.push(links.series.url);
    }
  }, [params.media, dispatch, history]);

  const moviesResponse = useInfiniteQuery(["movies", 1], fetchMediaList, {
    keepPreviousData: true,
    refetchInterval: 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const seriesResponse = useInfiniteQuery(["series", 2], fetchMediaList, {
    keepPreviousData: true,
    refetchInterval: 1000,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const searchResponse = useInfiniteQuery(
    ["search", searchContent],
    fetchSearchResults,
    {
      keepPreviousData: true,
      refetchInterval: 1000,
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );

  const handleMoviesTabClick = () => {
    dispatch(movieActions.setToggleContent("movies"));
    history.push("/movies");
  };

  const handlSeriesTabClick = () => {
    dispatch(movieActions.setToggleContent("series"));
    history.push("/series");
  };

  const content =
    toggleContent === "movies"
      ? moviesResponse
      : toggleContent === "series"
      ? seriesResponse
      : searchResponse;

  return (
    <Fragment>
      <div className={classes.tabs}>
        <h2>Browse top rated</h2>
        <MediaTab
          name={"Movies"}
          isCorrectContentType={toggleContent === "movies"}
          handleMediaTabClick={handleMoviesTabClick}
          searchContent={searchContent}
        />
        <MediaTab
          name={"TV Shows"}
          isCorrectContentType={toggleContent === "series"}
          handleMediaTabClick={handlSeriesTabClick}
          searchContent={searchContent}
        />
      </div>
      <MediaList content={content} />
    </Fragment>
  );
};

export default ContentTabs;
