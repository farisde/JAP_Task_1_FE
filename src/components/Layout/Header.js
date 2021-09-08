import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth-slice";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignInClick = () => {
    dispatch(authActions.setShowLoginForm(true));
  };

  const handleSignUpClick = () => {
    dispatch(authActions.setShowRegisterForm(true));
  };

  const handleLogOutClick = () => {
    dispatch(authActions.setToken(null));
    dispatch(authActions.setIsLoggedIn(false));
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.headerGridChilds}>
          <div className={classes.appTitle}>MovieBuff</div>
        </div>
        {!isLoggedIn && (
          <div className={classes.authAction}>
            <h2 className={classes.signInButton} onClick={handleSignInClick}>
              Sing In
            </h2>
            <h2 className={classes.signUpButton} onClick={handleSignUpClick}>
              Sign Up
            </h2>
          </div>
        )}
        {isLoggedIn && (
          <div className={classes.authAction}>
            <h4 className={classes.welcomeText} onClick={handleSignUpClick}>
              Welcome back!
            </h4>
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
