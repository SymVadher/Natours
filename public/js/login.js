import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status == "success") {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.replace("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/v1/users/logout",
    });
    if (res.data.status == "success") {
      location.reload(true);
    }
  } catch (err) {
    showAlert("error", "Error while logging out... Try again!!!");
  }
};
