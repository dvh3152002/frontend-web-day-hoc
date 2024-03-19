import axios from "axios";

export const get = (url, params) => {
  return axios({
    url: `${process.env.REACT_APP_API_URL}${url}`,
    method: "GET",
    params,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("persist:web/user"),
    },
  });
};

export const post = (url, data) => {
  return axios({
    url: `${process.env.REACT_APP_API_URL}${url}`,
    method: "POST",
    data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("persist:web/user"),
    },
  });
};

export const put = (url, data) => {
  const accessToken = localStorage.getItem("persist:web/user");
  return axios({
    url: `${process.env.REACT_APP_API_URL}${url}`,
    method: "PUT",
    data,
    headers: {
      Authorization: "Bearer " + JSON.parse(),
    },
  });
};

export const del = (url, data) => {
  return axios({
    url: `${process.env.REACT_APP_API_URL}${url}`,
    method: "DELETE",
    data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("persist:web/user"),
    },
  });
};
