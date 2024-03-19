import axios from "../../axios";

export const getListRole = async () => {
  return axios({
    url: "/role",
    method: "GET",
  });
};
