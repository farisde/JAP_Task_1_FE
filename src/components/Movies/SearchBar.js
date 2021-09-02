import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../store/movie-slice";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const searchContent = useSelector((state) => state.movie.searchContent);
  const dispatch = useDispatch();

  const handleSearchInput = (event) => {
    dispatch(movieActions.setSearchContent(event.target.value));
    if (event.target.value.length > 1) {
      dispatch(movieActions.filterSearchResults());
    }
    if (event.target.value.length === 0) {
      dispatch(movieActions.resetSearchResults());
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchBar}>
        <input
          className={classes.searchQueryInput}
          type="text"
          name="searchQueryInput"
          placeholder="Search favorite Movies and TV Shows"
          onChange={handleSearchInput}
        />
        <button
          className={classes.searchQuerySubmit}
          type="submit"
          name="searchQuerySubmit"
        >
          <FontAwesomeIcon icon={faSearch} className={classes.icon} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
