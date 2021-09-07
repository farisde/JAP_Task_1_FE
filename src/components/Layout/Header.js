import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();

  const handleSignInClick = () => {
    console.log("kliknut signin");
    dispatch(authActions.setShowLoginForm(true));
  };

  const handleSignUpClick = () => {
    console.log("kliknut signup");
    dispatch(authActions.setShowRegisterForm(true));
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MovieBuff</h1>
        <div className={classes.authAction}>
          <h2 className={classes.signInButton} onClick={handleSignInClick}>
            Sing In
          </h2>
          <h2 className={classes.signUpButton} onClick={handleSignUpClick}>
            Sign Up
          </h2>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
