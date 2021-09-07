import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./LoginForm.module.css";
import { authActions } from "../../store/auth-slice";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { sendLoginUserRequest } from "../../store/auth-actions";

const LoginForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (enteredPassword !== "" && enteredEmail !== "") {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredPassword, enteredEmail]);

  const submitRegisterHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      dispatch(sendLoginUserRequest(enteredEmail, enteredPassword));
    }
  };

  const handleCloseForm = () => {
    dispatch(authActions.setShowLoginForm(false));
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
        <h2 className={classes.title}>Sign In</h2>
        <button className={classes.closeButton} onClick={handleCloseForm}>
          <FontAwesomeIcon icon={faTimes} className={classes.icon} size="2x" />
        </button>
        <ThemeProvider theme={darkTheme}>
          <div className={classes.input}>
            <TextField
              id="outlined-required"
              label="Email Address"
              variant="outlined"
              type="email"
              value={enteredEmail}
              onChange={handleEmailChange}
              className={(classes.inputText, classes.inputFieldEmail)}
            />
            <TextField
              id="outlined-required"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={enteredPassword}
              onChange={handlePasswordChange}
              className={(classes.inputText, classes.inputFieldPassword)}
            />
          </div>
        </ThemeProvider>
        <div className={classes.formActions}>
          <button className={`${classes.submitButton} ${disabledButton}`}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
