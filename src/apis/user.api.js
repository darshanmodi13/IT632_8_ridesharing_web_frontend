import Axios from "../axiosInstance";

const userApi = {
  getUser: async (id, onSuccess, onError) => {
    try {
      let res = await Axios().get(`/api/user/get/${id}`);
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
  uploadDocs: async (id, payload, img, onSuccess, onError) => {
    try {
      let res = await Axios().post(`/api/user/upload-docs/${id}`, {
        ...payload,
        ...img,
      });
      onSuccess(res.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
};

export default userApi;
