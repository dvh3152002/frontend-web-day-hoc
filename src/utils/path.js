const path = {
  PUBLIC: "/",
  HOME: "",
  LOGIN: "login",
  SIGNUP: "signup",
  COURSE: "course/:category",
  CONTACT: "contact",
  POST: "post",
  PROFILE: "profile",
  NOT_FOUND: "*",
  DETAIL_COURSE: "course/:id/:slug",

  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "user",
  CREATE_USER: "user/create",
  EDIT_USER: "user/edit/:id",
  MANAGE_COURSE: "course",
  CREATE_COURSE: "course/create",
  EDIT_COURSE: "course/edit/:id",
  MANAGE_POST: "post",
  CREATE_POST: "post/create",
  EDIT_POST: "post/edit/:id",
  MANAGE_VIDEO: "video",
  MANAGE_CODE: "code",
  MANAGE_ORDER: "order",
};

export default path;
