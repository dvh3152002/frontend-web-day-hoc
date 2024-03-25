import axios from "../../axios";

export const getListLessonByCourse = (data) => {
  return axios({
    url: `/lesson`,
    method: "GET",
    params: data,
  });
};

export const createLesson = (data) => {
  return axios({
    url: `/lesson`,
    method: "POST",
    data,
  });
};

export const updateLesson = (id, data) => {
  return axios({
    url: `/lesson/${id}`,
    method: "PUT",
    data,
  });
};

export const getLessonById = (id) => {
  return axios({
    url: `/lesson/${id}`,
    method: "GET",
  });
};

export const deleteLesson = (id) => {
  return axios({
    url: `/lesson/${id}`,
    method: "DELETE",
  });
};
