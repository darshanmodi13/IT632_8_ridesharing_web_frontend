import { actionTypes } from "../actionTypes/actionType";

const AuthInitialState = {
  authenticated: false,
  id: null,
  token: null,
  role: null,
  mobile: null,
  can_drive: false,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
      };
    }
    case actionTypes.SET_ID: {
      return { ...state, id: action.payload };
    }
    case actionTypes.SET_ROLE: {
      return { ...state, role: action.payload };
    }
    case actionTypes.SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    case actionTypes.SET_MOBILE: {
      return { ...state, mobile: action.payload };
    }
    case actionTypes.SET_CAN_DRIVE: {
      return { ...state, can_drive: action.payload };
    }
    default:
      return state;
  }
};

export { AuthReducer, AuthInitialState };
