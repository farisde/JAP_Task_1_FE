import { Fragment } from "react";
import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  return (
    <Fragment>
      <div className={classes.movie}>
        <span className={`${classes.spanImage} ${classes.spanContent}`}>
          <img
            className={classes.coverPhoto}
            src={props.movie.coverImage}
            alt="Movie Cover"
          />
        </span>
        <span className={classes.spanConten}>
          <h3>{props.movie.title}</h3>
          <p>{props.movie.description}</p>
          <p>
            <b>Release date:</b>{" "}
            {props.movie.releaseDate
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ")}
          </p>
          <p>
            <b>Cast: </b>
            {props.movie.cast.join(", ")}
          </p>
        </span>
      </div>
      <div className={classes.rating}>
        <p>Rating will go here</p>
      </div>
    </Fragment>
  );
};

export default MovieItem;
