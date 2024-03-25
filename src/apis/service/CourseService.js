import axios from "../../axios";

export const getListCourse = async (params) => {
  return axios({
    url: "/course",
    method: "GET",
    params: params,
  });
};

export const getDetailCourse = async (id) => {
  return axios({
    url: `/course/${id}`,
    method: "GET",
  });
};

export const createCourse = async (data) => {
  return axios({
    url: `/course`,
    method: "POST",
    data,
  });
};

export const updateCourse = async (id, data) => {
  return axios({
    url: `/course/${id}`,
    method: "PUT",
    data,
  });
};

export const deleteCourse = async (id) => {
  return axios({
    url: `/course/${id}`,
    method: "DELETE",
  });
};
