import axios from "../../axios";

export const runCode = (data) => {
  return axios({
    url: "/code/run",
    method: "POST",
    data,
  });
};
