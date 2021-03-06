import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendRegisterUserRequest } from "../../store/auth-actions";
import { authActions } from "../../store/auth-slice";
import classes from "./RegisterForm.module.css";
import { ThemeProvider } from "@material-ui/core";

const RegisterForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (enteredName !== "" && enteredPassword !== "" && enteredEmail !== "") {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredName, enteredPassword, enteredEmail]);

  const handleCloseForm = () => {
    dispatch(authActions.setShowRegisterForm(false));
  };

  const submitRegisterHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      dispatch(
        sendRegisterUserRequest(enteredName, enteredEmail, enteredPassword)
      );
    }
  };

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setEnteredPassword(event.target.value);
  };

  const darkTheme = createTheme({ palette: { type: "dark" } });

  const disabledButton = formIsValid ? "" : classes.disabledButton;

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitRegisterHandler}>
        <h2 className={classes.title}>Sign Up</h2>
        <button className={classes.closeButton} onClick={handleCloseForm}>
          <FontAwesomeIcon icon={faTimes} className={classes.icon} size="2x" />
        </button>
        <ThemeProvider theme={darkTheme}>
          <div className={classes.input}>
            <TextField
              id="outlined-required"
              label="Name"
              variant="outlined"
              value={enteredName}
              onChange={handleNameChange}
              className={classes.inputFieldName}
            />
            <TextField
              id="outlined-required"
              label="Email Address"
              variant="outlined"
              type="email"
              value={enteredEmail}
              onChange={handleEmailChange}
              className={`${classes.inputText} ${classes.inputFieldEmail}`}
            />
          </div>
          <div className={classes.inputFieldPassword}>
            <TextField
              id="outlined-required"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={enteredPassword}
            />
          </div>
        </ThemeProvider>
        <div className={classes.formActions}>
          <button className={`${classes.submitButton} ${disabledButton}`}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
