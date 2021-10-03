import { createTheme, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { sendSignUpUserRequest } from "../store/auth-actions";
import classes from "./SignUpPage.module.css";
import { ThemeProvider } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .required("Password is required"),
  });

  const signUp = (values) => {
    if (
      values.email === undefined ||
      values.password === undefined ||
      values.name === undefined
    )
      return;

    dispatch(sendSignUpUserRequest(values.name, values.email, values.password));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: signUp,
  });

  const darkTheme = createTheme({ palette: { type: "dark" } });
  const disabledButton =
    formik.errors.email || formik.errors.password || formik.errors.name
      ? classes.disabledButton
      : "";

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <h2 className={classes.title}>Sign Up</h2>
        <ThemeProvider theme={darkTheme}>
          <div className={classes.input}>
            <TextField
              id="outlined-required"
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              className={classes.inputFieldName}
            />
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
          </div>
          <div className={classes.inputFieldPassword}>
            <TextField
              id="outlined-required"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
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

export default SignUpPage;
