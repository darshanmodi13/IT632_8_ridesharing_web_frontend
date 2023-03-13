import axios from "axios";
import auth from "./utils/authMethods";

const url = "https://ride-share-backend.onrender.com";
// const url = "http://localhost:8080";

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
    withCredentials: true,
  });
  return client;
};

export default axiosInstance;
