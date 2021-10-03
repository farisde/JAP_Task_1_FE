import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { movieActions } from "../../store/movie-slice";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const searchContent = useSelector((state) => state.movie.searchContent);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.searchContent !== undefined) {
      dispatch(movieActions.setSearchContent(params.searchContent));
      dispatch(movieActions.setContentLoading(false));
    }
  }, [params.searchContent, dispatch]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (
        searchContent.length === 0 &&
        params.searchContent !== "" &&
        params.searchContent !== undefined
      ) {
        dispatch(movieActions.setToggleContent("movies"));
        dispatch(movieActions.setContentLoading(false));
        history.push("/");
      }
      if (searchContent.length > 1) {
        dispatch(movieActions.setContentLoading(true));
        dispatch(movieActions.setToggleContent("search"));
        dispatch(movieActions.setContentLoading(false));
        history.push("/search/" + searchContent);
      }
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchContent, dispatch, history, params.searchContent]);

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
