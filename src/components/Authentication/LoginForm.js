import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@material-ui/core";
import React from "react";
import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const submitRegisterHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitRegisterHandler}>
        <h2 className={classes.title}>Sign In</h2>
        <button className={classes.closeButton}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
        <div className={classes.input}>
          <TextField
            id="outlined-required"
            label="Email Address"
            variant="outlined"
            type="email"
            value={props.value}
            onChange={props.onChange}
            className={(classes.inputText, classes.inputFieldEmail)}
          />
          <TextField
            id="outlined-required"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={props.value}
            onChange={props.onChange}
            className={(classes.inputText, classes.inputFieldPassword)}
          />
        </div>
        <div className={classes.formActions}>
          <button className={classes.submitButton}>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
