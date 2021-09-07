import { authActions } from "./auth-slice";

export const sendRegisterUserRequest = (name, email, password) => {
  return async (dispatch) => {
    const registerUserRequest = async () => {
      const resonse = await fetch("https://localhost:5001/Auth/Register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resonse.ok) {
        throw new Error("Something went wrong while signing up a new user");
      }

      const content = await resonse.json();
      console.log(content.data);
      return content.data;
    };

    try {
    } catch (error) {}
  };
};
