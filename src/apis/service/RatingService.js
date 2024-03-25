import axios from "../../axios";

export const getListRating = async (params) => {
  return axios({
    url: "/rating",
    method: "GET",
    params: params,
  });
};

export const deleteRating = async (id) => {
  return axios({
    url: `/rating/${id}`,
    method: "DELETE",
  });
};
