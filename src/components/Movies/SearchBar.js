import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.searchBar}>
        <input
          className={classes.searchQueryInput}
          type="text"
          name="searchQueryInput"
          placeholder="Search favorite Movies and TV Shows"
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
