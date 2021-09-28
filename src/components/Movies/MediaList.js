import { faFrown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../store/movie-slice";
import Card from "../Shared/Card";
import MovieItem from "./MovieItem";
import classes from "./MediaList.module.css";
import Loading from "../Shared/Loading";
import NoSearchResults from "./NoSearchResults";

const MediaList = (props) => {
  const dispatch = useDispatch();
  const visibleMovies = useSelector((state) => state.movie.visibleMovies);
  //const allContent = useSelector((state) => state.movie.allContent);
  const showLoadContentButton = useSelector(
    (state) => state.movie.showLoadContentButton
  );
  const searchContent = useSelector((state) => state.movie.searchContent);

  const loadMoreContentHandler = () => {
    // if (
    //   allContent.filter(
    //     (m) =>
    //       (m.isMovie === props.isMovie && searchContent === "") ||
    //       searchContent !== ""
    //   ).length > visibleMovies
    // ) {
    //   dispatch(movieActions.increaseVisibleMovies());
    // }
  };

  if (props.content.isLoading) {
    return (
      <div className={classes.container}>
        <Loading text={"Loading content"} />
      </div>
    );
  }

  if (!props.content.isLoading && props.content.data.length === 0) {
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
        {props.content.data.data.map((movie) => (
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

export default MediaList;
