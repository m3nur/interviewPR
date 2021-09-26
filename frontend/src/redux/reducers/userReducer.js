import initState from "../initState";
import {
  AUTH,
  EDIT_PROFILE,
  GET_USER,
  LOG_OUT,
  SET_USER,
} from "../types/types";

function userReducer(state = initState.user, action) {
  switch (action.type) {
    case AUTH:
      return action.payload;

    case LOG_OUT:
      return action.payload;

    case GET_USER:
      return action.payload;

    case SET_USER:
      return { ...state, ...action.payload };

    case EDIT_PROFILE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export default userReducer;
