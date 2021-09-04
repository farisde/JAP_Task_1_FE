import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../UI/Card";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  return (
    <div className={classes.container}>
      <section className={classes.movies}>
        {props.contentList.map((movie) => (
          <Card key={movie.id.toString()}>
            <MovieItem movie={movie} />
          </Card>
        ))}
      </section>
      <button className={classes.loadButton}>
        <FontAwesomeIcon icon={faSpinner} />
        &nbsp; Load more
      </button>
    </div>
  );
};

export default MovieList;
