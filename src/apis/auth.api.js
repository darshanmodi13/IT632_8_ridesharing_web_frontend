import Axios from "../axiosInstance";
import { actionTypes } from "../actionTypes/actionType";

const authApis = {
  signin: async (credentials, dispatch, onSucess, onError) => {
    try {
      let res = await Axios().post("/api/auth/signin", { ...credentials });

      dispatch({
        type: actionTypes.SET_AUTHENTICATION,
        payload: true,
      });
      dispatch({
        type: actionTypes.SET_ID,
        payload: res.data.data.user._id,
      });
      dispatch({
        type: actionTypes.SET_ROLE,
        payload: 1,
      });
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: res.data.data.user.token,
      });
      dispatch({
        type: actionTypes.SET_CAN_DRIVE,
        payload: res.data.data.user.can_drive,
      });
      onSucess(res.data.data.user);
      return;
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
  signup: async (credentials, dispatch, onSucess, onError) => {
    try {
      let res = await Axios().post("/api/auth/register", { ...credentials });
      dispatch({
        type: actionTypes.SET_MOBILE,
        payload: res.data.data.mobile_no,
      });
      onSucess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data.message);
    }
  },
  verify: async (otp, mobile, onSucess, onError) => {
    try {
      let res = await Axios().post(`/api/auth/verify/${mobile}`, { otp });
      onSucess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data.message);
    }
  },
  adminSignin: async (credentials, dispatch, onSucess, onError) => {
    try {
      let res = await Axios().post("/api/auth/admin-login", { ...credentials });
      dispatch({
        type: actionTypes.SET_AUTHENTICATION,
        payload: true,
      });
      dispatch({
        type: actionTypes.SET_ID,
        payload: 1,
      });
      dispatch({
        type: actionTypes.SET_ROLE,
        payload: 2,
      });
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: res.data.data.token,
      });
      onSucess(res.data.data);
      return;
    } catch (error) {
      console.log(error.response);
      onError(error.response.data.error);
    }
  },
};

export default authApis;
