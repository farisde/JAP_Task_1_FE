import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme, TextField } from "@material-ui/core";
import { dark } from "@material-ui/core/styles/createPalette";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendRegisterUserRequest } from "../../store/auth-actions";
import { authActions } from "../../store/auth-slice";
import classes from "./RegisterForm.module.css";
import { ThemeProvider } from "@material-ui/core";

const RegisterForm = (props) => {
  const enteredNameRef = useRef();
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const dispatch = useDispatch();

  const handleCloseForm = () => {
    dispatch(authActions.setShowRegisterForm(false));
  };

  const submitRegisterHandler = (event) => {
    event.preventDefault();

    console.log("submitao sam");

    const enteredName = enteredNameRef.current.value;
    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;

    dispatch(
      sendRegisterUserRequest(enteredName, enteredEmail, enteredPassword)
    );
  };

  const darkTheme = createTheme({ palette: { type: "dark" } });

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
              ref={enteredNameRef}
              onChange={props.onChange}
              className={classes.inputFieldName}
            />
            <TextField
              id="outlined-required"
              label="Email Address"
              variant="outlined"
              type="email"
              ref={enteredEmailRef}
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
              ref={enteredPasswordRef}
            />
          </div>
        </ThemeProvider>
        <div className={classes.formActions}>
          <button className={classes.submitButton}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
