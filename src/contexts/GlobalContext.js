import React, { useContext, useEffect, useReducer } from "react";

import { actionTypes } from "../actionTypes/actionType";
import { AuthReducer, AuthInitialState } from "../reducers/authReducer";
import auth from "../utils/authMethods";

// Creating Context
const GlobalContext = React.createContext();

// Creating Context Provider
const GlobalContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState);

  useEffect(() => {
    const { id, token, role, mobile } = auth.getIdToken();
    if (token && id) {
      authDispatch({ type: actionTypes.SET_AUTHENTICATION, payload: true });
      authDispatch({ type: actionTypes.SET_ID, payload: id });
      authDispatch({ type: actionTypes.SET_ROLE, payload: role });
      authDispatch({ type: actionTypes.SET_TOKEN, payload: token });
      authDispatch({ type: actionTypes.SET_MOBILE, payload: mobile });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider value={{ authState, authDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

//Create Hook for Global Context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContextProvider, GlobalContext };
