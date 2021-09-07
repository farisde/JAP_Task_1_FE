import { Fragment } from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MovieBuff</h1>
        <div className={classes.authAction}>
          <h2 className={classes.signInButton}>Sing In</h2>
          <h2 className={classes.signUpButton}>Sign Up</h2>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
