import { Fragment } from "react";
import { useDispatch } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import classes from "./MovieItem.module.css";
import { movieActions } from "../../store/movie-slice";
import Swal from "sweetalert2";
import { Rating } from "@material-ui/lab";
import { updateContentRating } from "../../store/movie-actions";

const MovieItem = (props) => {
  const dispatch = useDispatch();

  const onStarClickHandler = (event, value) => {
    dispatch(updateContentRating(props.movie.id, value)).then(() => {
      const swalText = `You have successfully rated "<b>${props.movie.title}</b>" with <b>${value} star(s)</b>!`;

      const customSwal = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
      customSwal.fire({
        title: "Thank you for your rating!",
        html: swalText,
        icon: "success",
        backdrop: true,
        showConfirmButton: true,
        confirmButtonColor: "#800000",
        focusConfirm: false,
      });
    });
  };

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
            {new Date(props.movie.releaseDate)
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ")}
          </p>
          <p>
            <b>Cast: </b>
            {props.movie.cast.map((c) => c.name).join(", ")}
          </p>
        </span>
      </div>
      <div className={classes.rating}>
        <Rating
          name={props.movie.id.toString()}
          value={props.movie.rating}
          size="large"
          precision={0.5}
          onChange={onStarClickHandler}
          style={{ color: "#b50000" }}
        />
        &nbsp;
        <div className={classes.numberRating}>
          <b>{props.movie.rating.toFixed(1)}</b> /5
        </div>
      </div>
    </Fragment>
  );
};

export default MovieItem;
