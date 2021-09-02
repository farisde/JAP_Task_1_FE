import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import Card from "../UI/Card";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  //nemoj zaboraviti na BackEndu sortirati filmove po rejtingu
  const contentListByRating = [...props.contentList].sort((m1, m2) =>
    m2.rating > m1.rating ? 1 : m1.rating > m2.rating ? -1 : 0
  );

  return (
    <div className={classes.container}>
      <section className={classes.movies}>
        {contentListByRating.map((movie) => (
          <Card key={movie.id}>
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
