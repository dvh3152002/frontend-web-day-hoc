import axios from "../../axios";

export const getListCategory = () => {
  return axios({
    url: "/categories",
    method: "GET",
  });
};
