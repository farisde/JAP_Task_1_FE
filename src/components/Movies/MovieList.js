import Card from "../UI/Card";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  return (
    <section className={classes.movies}>
      <Card>
        <MovieItem />
      </Card>
      <Card>
        <MovieItem />
      </Card>
      <Card>
        <MovieItem />
      </Card>
      <Card>
        <MovieItem />
      </Card>
    </section>
  );
};

export default MovieList;
