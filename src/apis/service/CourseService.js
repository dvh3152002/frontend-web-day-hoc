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
