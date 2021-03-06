import { Fragment } from "react";
import { useDispatch } from "react-redux";
import classes from "./MovieItem.module.css";
import Swal from "sweetalert2";
import { Rating } from "@material-ui/lab";
import { updateContentRating } from "../../store/movie-actions";
import "./SwalStyle.css";

const MovieItem = (props) => {
  const dispatch = useDispatch();

  const onStarClickHandler = (event) => {
    let value = event.target.value;
    if (value < 0 || value > 5 || value == null || value === undefined) return;

    dispatch(updateContentRating(props.movie.id, value)).then(() => {
      const swalText = `<div style='color:whitesmoke'>You have successfully rated "<b>${props.movie.title}</b>" with <b>${value} star(s)</b>!</div>`;
      Swal.fire({
        title: `<div style='color:whitesmoke'>Thank you for your rating!</div>`,
        html: swalText,
        icon: "success",
        backdrop: true,
        showConfirmButton: true,
        confirmButtonColor: "#eb0028",
        focusConfirm: false,
        background: "#2C2C2C",
      });
    });
  };

  return (
    <Fragment>
      <div className={classes.movie}>
        <div>
          <span className={`${classes.spanImage} ${classes.spanContent}`}>
            <img
              className={classes.coverPhoto}
              src={props.movie.coverImage}
              alt="Movie Cover"
            />
          </span>
          <div className={classes.controls}>
            <Rating
              name={`movie-id-${props.movie.id}`}
              value={props.movie.rating}
              size="large"
              precision={0.5}
              onChange={onStarClickHandler}
              style={{ color: "#eb0028" }}
            />
            <div className={classes.numberRating}>
              <b>{props.movie.rating.toFixed(1)}</b> /5
            </div>
          </div>
        </div>
        <span className={`${classes.spanConten} ${classes.scrollableInfo}`}>
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
    </Fragment>
  );
};

export default MovieItem;
