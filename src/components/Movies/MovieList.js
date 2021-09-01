import { useSelector } from "react-redux";
import Card from "../UI/Card";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const movies = useSelector((state) => state.movie.movies);

  const moviesByRating = [...movies].sort((m1, m2) =>
    m2.rating > m1.rating ? 1 : m1.rating > m2.rating ? -1 : 0
  );

  console.log(moviesByRating);

  return (
    <section className={classes.movies}>
      {moviesByRating.map((movie) => (
        <Card key={movie.id}>
          <MovieItem movie={movie} />
        </Card>
      ))}
    </section>
  );
};

export default MovieList;
