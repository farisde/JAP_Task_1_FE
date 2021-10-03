import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Card from "../Shared/Card";
import MovieItem from "./MovieItem";
import classes from "./MediaList.module.css";
import Loading from "../Shared/Loading";
import NoSearchResults from "./NoSearchResults";
import sortMediaGroups from "../../helpers/sortMediaGroups";

const MediaList = (props) => {
  const contentIsLoading = useSelector((state) => state.movie.contentIsLoading);

  if (
    props.content.isLoading ||
    props.content.isFetchingNextPage ||
    contentIsLoading
  ) {
    return (
      <div className={classes.container}>
        <Loading text={"Loading content"} />
      </div>
    );
  }

  if (
    !props.content.isLoading &&
    props.content.data.pages[0].results.length === 0
  ) {
    return (
      <NoSearchResults
        title={"No results found"}
        description={"We couldn't find any results matching your input"}
        icon={faFrown}
        iconSize={"9x"}
      />
    );
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
