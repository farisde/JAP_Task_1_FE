import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@material-ui/core";
import React from "react";
import classes from "./RegisterForm.module.css";

const RegisterForm = (props) => {
  const submitRegisterHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitRegisterHandler}>
        <h2 className={classes.title}>Sign Up</h2>
        <button className={classes.closeButton}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
        <div className={classes.input}>
          <TextField
            id="outlined-required"
            label="Name"
            variant="outlined"
            value={props.value}
            onChange={props.onChange}
            className={classes.inputFieldName}
          />
          <TextField
            id="outlined-required"
            label="Email Address"
            variant="outlined"
            type="email"
            value={props.value}
            onChange={props.onChange}
            className={(classes.inputText, classes.inputFieldEmail)}
          />
        </div>
        <div className={classes.inputFieldPassword}>
          <TextField
            id="outlined-required"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            value={props.value}
            onChange={props.onChange}
          />
        </div>
        <div className={classes.formActions}>
          <button className={classes.submitButton}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
