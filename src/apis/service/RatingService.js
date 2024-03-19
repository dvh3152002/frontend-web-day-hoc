import axios from "../../axios";

export const getListRating = async (params) => {
  return axios({
    url: "/rating",
    method: "GET",
    params: params,
  });
};
