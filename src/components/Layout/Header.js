import { Fragment } from "react";
import SearchBar from "../Movies/SearchBar";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MovieBuff</h1>
      </header>
    </Fragment>
  );
};

export default Header;
