import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth-slice";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { movieActions } from "../../store/movie-slice";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogOutClick = () => {
    dispatch(authActions.setToken(null));
    dispatch(authActions.setIsLoggedIn(false));
  };

  const reloadMainPage = () => {
    dispatch(movieActions.setToggleContent("movies"));
    dispatch(movieActions.setSearchContent(""));
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.headerGridChilds}>
          <Link to="/" className={classes.appTitle} onClick={reloadMainPage}>
            MovieBuff
          </Link>
        </div>
        {!isLoggedIn && (
          <div className={classes.authAction}>
            <Link to="signin" className={classes.linkStyle}>
              <h2 className={classes.signInButton}>Sign In</h2>
            </Link>
            <Link to="signup" className={classes.linkStyle}>
              <h2 className={classes.signUpButton}>Sign Up</h2>
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <div className={classes.authAction}>
            <h4 className={classes.welcomeText}>Welcome back!</h4>
            &nbsp;
            <h2 className={classes.signOutButton} onClick={handleLogOutClick}>
              Sign Out
            </h2>
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
