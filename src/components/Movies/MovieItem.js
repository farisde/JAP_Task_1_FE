import { Fragment } from "react";
import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  return (
    <Fragment>
      <div className={classes.movie}>
        <span>
          <img
            className={classes.coverPhoto}
            src="https://i.pinimg.com/originals/58/ee/39/58ee39fd81e8c0d90676180a3b8e97d0.png"
            alt="Movie Cover photo"
          />
        </span>
        <span>
          <h3>Star Wars: A New Hop (Episode IV)</h3>
          <p>Release date: 15.07.2021.</p>
          <p>Cast: Carrie Fisher, Mark Hamil, Harrison Ford</p>
        </span>
      </div>
      <div className={classes.rating}>
        <p>Rating will go here</p>
      </div>
    </Fragment>
  );
};

export default MovieItem;
