import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentList, sendSearchQuery } from "../../store/movie-actions";
import { movieActions } from "../../store/movie-slice";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const searchContent = useSelector((state) => state.movie.searchContent);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (searchContent.length > 1) {
        dispatch(sendSearchQuery(searchContent)).then(() => {
          movieActions.setContentLoading(false);
        });
      }
      if (searchContent.length === 0) {
        dispatch(fetchContentList()).then(() => {
          dispatch(movieActions.resetSearchResults());
        });
      }
    }, 650);
    return () => {
      clearTimeout(timer);
    };
  }, [searchContent, dispatch]);

  const handleSearchInput = (event) => {
    dispatch(movieActions.setSearchContent(event.target.value));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchBar}>
        <input
          className={classes.searchQueryInput}
          type="text"
          name="searchQueryInput"
          placeholder="Search favorite Movies and TV Shows"
          value={searchContent}
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
