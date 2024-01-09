import axios from "axios";
import { showAlert } from "./alerts";

export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: "patch",
      url: `/api/v1/users/${type == "data" ? "updateMe" : "updatePassword"}`,
      data,
    });
    if (res.data.status == "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
