import axios from "../../axios";

export const getListPost = async (params) => {
  return axios({
    url: "/post",
    method: "GET",
    params: params,
  });
};

export const getDetailPost = async (id) => {
  return axios({
    url: `/post/${id}`,
    method: "GET",
  });
};

export const createPost = async (data) => {
  return axios({
    url: `/post`,
    method: "POST",
    data,
  });
};

export const updatePost = async (id, data) => {
  return axios({
    url: `/post/${id}`,
    method: "PUT",
    data,
  });
};

export const deletePost = async (id) => {
  return axios({
    url: `/post/${id}`,
    method: "DELETE",
  });
};
