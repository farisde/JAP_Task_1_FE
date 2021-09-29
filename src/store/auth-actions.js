import Swal from "sweetalert2";
import { authActions } from "./auth-slice";

export const sendRegisterUserRequest = (name, email, password) => {
  return async (dispatch) => {
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
      const swalConfig = {
        title: "<div style='color:whitesmoke'>Sign Up error</div>",
        html: `<div style='color:whitesmoke'>${content.message}</div>`,
        icon: "error",
        backdrop: true,
        showConfirmButton: true,
        confirmButtonColor: "#eb0028",
        focusConfirm: false,
        background: "#2C2C2C",
      };

      if (!response.ok) {
        Swal.fire(swalConfig);
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
      const userId = await registerUserRequest();
      console.log(userId);
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

      if (!response.ok) {
        Swal.fire({
          title: "<div style='color:whitesmoke'>Sign In error</div>",
          html: `<div style='color:whitesmoke'>${content.message}</div>`,
          icon: "error",
          backdrop: true,
          showConfirmButton: true,
          confirmButtonColor: "#eb0028",
          focusConfirm: false,
          background: "#2C2C2C",
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
        dispatch(authActions.setShowLoginForm(false));
      }
    } catch (error) {}
  };
};
