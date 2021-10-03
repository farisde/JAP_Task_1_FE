import Swal from "sweetalert2";
import apiWrapper from "../services/apiWrapper";
import { authActions } from "./auth-slice";

const swalConfig = {
  title: "<div style='color:whitesmoke'>Sign Up error</div>",
  icon: "error",
  backdrop: true,
  showConfirmButton: true,
  confirmButtonColor: "#eb0028",
  focusConfirm: false,
  background: "#2C2C2C",
};

export const sendSignUpUserRequest = (name, email, password) => {
  return () => {
    const registerUserRequest = async () => {
      const content = await apiWrapper("api/auth/register", "POST", {
        name,
        email,
        password,
      });

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
      registerUserRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendSignInUserRequest = (email, password) => {
  return async (dispatch) => {
    const loginUserRequest = async () => {
      const content = await apiWrapper("api/auth/login", "POST", {
        email,
        password,
      });

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
    } catch (error) {
      console.log(error);
    }
  };
};
