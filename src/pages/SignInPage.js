import { TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import classes from "./SignInPage.module.css";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { sendSignInUserRequest } from "../store/auth-actions";
import * as Yup from "yup";
import { useFormik } from "formik";

const SigninPage = () => {
  const dispatch = useDispatch();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .required("Password is required"),
  });

  const signIn = (values) => {
    if (values.email === undefined || values.password === undefined) return;

    dispatch(sendSignInUserRequest(values.email, values.password));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: signIn,
  });

  const darkTheme = createTheme({ palette: { type: "dark" } });
  const disabledButton =
    formik.errors.email || formik.errors.password ? classes.disabledButton : "";

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <h2 className={classes.title}>Sign In</h2>
        <ThemeProvider theme={darkTheme}>
          <div className={classes.input}>
            <TextField
              id="outlined-required"
              name="email"
              label="Email Address"
              variant="outlined"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`${classes.inputText} ${classes.inputFieldEmail}`}
            />
            <TextField
              id="outlined-required"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={`${classes.inputText} ${classes.inputFieldPassword}`}
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

export default SigninPage;
