import axios from "axios";
import * as actionTypes from "./actionTypes";
const login = (email, password, redirect, location) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_START });
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("login", true);

    axios.post("http://localhost/netflix/index.php", formData).then((response) => {
      if (response.data[1]) {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, data: JSON.parse(response.data[0]) });
        if (location) redirect(location);
        else {
          redirect("/");
        }
      } else dispatch({ type: actionTypes.LOGIN_FAIL, data: response.data[0] });

      setTimeout(() => {
        dispatch({ type: actionTypes.DELETE_MESSAGE });
      }, 5000);
    });
  };
};

export { login };
