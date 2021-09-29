import { faFrown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../store/movie-slice";
import Card from "../Shared/Card";
import MovieItem from "./MovieItem";
import classes from "./MediaList.module.css";
import Loading from "../Shared/Loading";
import NoSearchResults from "./NoSearchResults";
import { useEffect } from "react";
import sortMediaGroups from "../../helpers/sortMediaGroups";

const MediaList = (props) => {
  // const dispatch = useDispatch();
  // const visibleMovies = useSelector((state) => state.movie.visibleMovies);
  // //const allContent = useSelector((state) => state.movie.allContent);
  // const showLoadContentButton = useSelector(
  //   (state) => state.movie.showLoadContentButton
  // );
  const dispatch = useDispatch();

  // const loadMoreContentHandler = () => {
  //   dispatch(props.setPageNumber(props.pageNumber + 1));
  //   props.content.fetchNextPage({ pageParam: props.pageNumber });
  // };

  // const noResultsFound =
  //   !props.content.isLoading &&
  //   props.content.length === 0 &&
  //   searchContent.length > 1;

  if (props.content.isLoading || props.content.isFetchingNextPage) {
    return (
      <div className={classes.container}>
        <Loading text={"Loading content"} />
      </div>
    );
  }

  if (!props.content.isLoading && props.content.isError) {
    <NoSearchResults
      title={"No results found"}
      description={"We couldn't find any results matching your input"}
      icon={faFrown}
      iconSize={"9x"}
    />;
  }

  return (
    <div className={classes.container}>
      <section className={classes.movies}>
        {sortMediaGroups(props.content.data.pages).map((movie) => (
          <Card key={movie.id.toString()}>
            <MovieItem movie={movie} />
          </Card>
        ))}
      </section>
      {props.content.hasNextPage && (
        <button
          className={classes.loadButton}
          onClick={() => props.content.fetchNextPage()}
        >
          <FontAwesomeIcon icon={faSpinner} />
          &nbsp; Load more
        </button>
      )}
    </div>
  );
};

export default MediaList;
