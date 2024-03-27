import { get, post } from "./BaseService";
import axios from "../../axios";

export const register = async (data) => {
  return axios({
    url: "/signup",
    method: "POST",
    data,
  });
};

export const login = async (data) => {
  return axios({
    url: "/signin",
    method: "POST",
    data,
  });
};

export const getProfile = async () => {
  return axios({
    url: "/profile",
    method: "GET",
  });
};

export const getListUser = async (data) => {
  return axios({
    url: "/user",
    method: "GET",
    params: data,
  });
};

export const deleteUser = async (id) => {
  return axios({
    url: `/user/${id}`,
    method: "DELETE",
  });
};

export const getDetailUser = async (id) => {
  return axios({
    url: `/user/${id}`,
    method: "GET",
  });
};

export const createUser = async (data) => {
  return axios({
    url: `/user`,
    method: "POST",
    data,
  });
};

export const updateUser = async (id, data) => {
  return axios({
    url: `/user/${id}`,
    method: "PUT",
    data,
  });
};
