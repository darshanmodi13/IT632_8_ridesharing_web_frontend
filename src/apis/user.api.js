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
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
  updateUser: async (id, body, onSuccess, onError) => {
    try {
      let res = await Axios().put(`/api/user/update/${id}`, {
        ...body,
      });
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
  getDocs: async (onSuccess, onError) => {
    try {
      let res = await Axios().get(`/api/user/docs`);
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
  verifyDocs: async (id, onSuccess, onError) => {
    try {
      let res = await Axios().put(`/api/user/doc/${id}`);
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
  delete: async (id, onSuccess, onError) => {
    try {
      let res = await Axios().delete(`/api/user/doc/${id}`);
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error.response);
      onError(error.response.data);
    }
  },
};

export default userApi;
