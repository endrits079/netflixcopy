import * as actionTypes from "../actions/actionTypes";

const initialState = {
  username: null,
  user_type: null,
  id: null,
  message: null,
  show_spinner: false,
};

const login_start = (state) => {
  return {
    ...state,
    show_spinner: true,
  };
};
const login_success = (state, { username, user_type, id }) => {
  return {
    ...state,
    username,
    user_type,
    id,
    message: null,
    show_spinner: false,
  };
};

const login_fail = (state, message) => {
  return {
    ...state,
    username: null,
    id: null,
    user_type: null,
    message,
    show_spinner: false,
  };
};

const delete_message = (state) => {
  return {
    ...state,
    message: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return login_start(state, action.data);
    case actionTypes.LOGIN_SUCCESS:
      return login_success(state, action.data);
    case actionTypes.LOGIN_FAIL:
      return login_fail(state, action.data);
    case actionTypes.DELETE_MESSAGE:
      return delete_message(state);
    default:
      return state;
  }
};

export default reducer;
