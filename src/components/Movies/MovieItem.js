import { Fragment } from "react";
import { useDispatch } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import classes from "./MovieItem.module.css";
import { movieActions } from "../../store/movie-slice";
import Swal from "sweetalert2";

const MovieItem = (props) => {
  const dispatch = useDispatch();

  const onStarClickHandler = (nextValue, prevValue, name) => {
    dispatch(
      movieActions.updateMovieRating({
        itemId: props.movie.id,
        newRating: prevValue,
      })
    );

    const swalText = `You have successfully rated "<b>${props.movie.title}</b>" with <b>${prevValue} star(s)</b>!`;

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
            {props.movie.cast.join(", ")}
          </p>
        </span>
      </div>
      <div className={classes.rating}>
        <StarRatingComponent
          name={"contentRating"}
          value={props.movie.rating}
          starCount={5}
          starColor={"#d40000"}
          emptyStarColor={"#1D2124"}
          onStarClick={onStarClickHandler.bind(null, this)}
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
