import axios from "axios";
import auth from "./utils/authMethods";

const url = "https://se-backend-gid-8-2022.herokuapp.com";
const axiosInstance = () => {
  let auth_token = null;

  let { token } = auth.getIdToken();
  auth_token = token ? token : "";

  const client = axios.create({
    baseURL: url,
    headers: {
      Authorization: auth_token,
      "content-Type": "application/json",
    },
  });
  return client;
};

export default axiosInstance;
