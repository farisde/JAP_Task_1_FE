import { useHistory } from "react-router";
import Swal from "sweetalert2";
import links from "../links/links";
import { authActions } from "./auth-slice";
import { movieActions } from "./movie-slice";

const swalConfig = {
  title: "<div style='color:whitesmoke'>Sign Up error</div>",
  icon: "error",
  backdrop: true,
  showConfirmButton: true,
  confirmButtonColor: "#eb0028",
  focusConfirm: false,
  background: "#2C2C2C",
};

export const sendRegisterUserRequest = (name, email, password) => {
  return async () => {
    const registerUserRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "api/auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const content = await response.json();

      if (!content.success) {
        Swal.fire({
          ...swalConfig,
          html: `<div style='color:whitesmoke'>${content.message}</div>`,
        });
        return;
      }

      Swal.fire({
        ...swalConfig,
        title: "<div style='color:whitesmoke'>Successful Sign Up</div>",
        html: `<div style='color:whitesmoke'>You have successfully signed up for a MovieBuff account!
        Now you can sign in to your account using your email and password.</div>`,
        icon: "success",
      });

      return content.data;
    };

    try {
      await registerUserRequest();
    } catch (error) {}
  };
};

export const sendLoginUserRequest = (email, password) => {
  return async (dispatch) => {
    const loginUserRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const content = await response.json();

      if (!content.success) {
        Swal.fire({
          ...swalConfig,
          html: `<div style='color:whitesmoke'>${content.message}</div>`,
        });
        return null;
      }

      return content.data;
    };

    try {
      const token = await loginUserRequest();
      if (token !== null) {
        dispatch(authActions.setToken(token));
        dispatch(authActions.setIsLoggedIn(true));
      }
    } catch (error) {}
  };
};
