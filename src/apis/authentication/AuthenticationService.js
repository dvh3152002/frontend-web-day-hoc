const user = JSON.parse(localStorage.getItem("persist:web/user"));
const roles = JSON.parse(user.role);

export const isAdminLoggedIn = () => {
  for (let role of roles) {
    if (role.name === "ROLE_ADMIN") {
      return true;
    }
  }
  return false;
};

export const isTeacherLoggedIn = () => {
  let isSuccess = false;
  roles?.forEach((element) => {
    if (element.name === "ROLE_TEACHER") isSuccess = true;
  });
  return isSuccess;
};

export const isUserLoggedIn = () => {
  let isSuccess = false;
  roles?.forEach((element) => {
    if (element.name === "ROLE_USER") isSuccess = true;
  });
  return isSuccess;
};
