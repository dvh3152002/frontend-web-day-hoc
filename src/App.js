import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import path from "./utils/path";
import Home from "./pages/public/home";
import HomeTemplate from "./templates/home/index";
import Login from "./pages/public/login";
import Contact from "./pages/public/contact";
import Post from "./pages/public/post";
import NotFound from "./pages/public/404/index";
import Register from "./pages/public/register";
import DetailCourse from "./pages/public/detail_course";
import { getProfile } from "./store/action/UserAction";
import Courses from "./pages/public/course";
import Loading from "./components/loading";
import AdminTemplate from "./templates/admin";
import DashBoard from "./pages/private/dashboard";
import CreateCourse from "./pages/private/course/create-course";
import ManageUser from "./pages/private/user/manage";
import CreateUser from "./pages/private/user/create";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.loading);
  useEffect(() => {
    if (isLoggedIn) dispatch(getProfile());
  }, [isLoggedIn]);
  return (
    <>
      {isLoading && <Loading />}
      <div className="App">
        <Routes>
          <Route path={path.PUBLIC} element={<HomeTemplate />}>
            <Route path={path.HOME} element={<Home />}></Route>
            <Route path={path.COURSE} element={<Courses />}></Route>
            <Route path={path.CONTACT} element={<Contact />}></Route>
            <Route path={path.POST} element={<Post />}></Route>
            <Route path={path.DETAIL_COURSE} element={<DetailCourse />}></Route>
            {/* {isLoggedIn && (
    <>
      <Route path={path.PROFILE} element={<Profile />}></Route>
    </>
  )} */}
          </Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.SIGNUP} element={<Register />}></Route>
          <Route path={path.NOT_FOUND} element={<NotFound />}></Route>

          <Route path={path.ADMIN} element={<AdminTemplate />}>
            <Route path={path.DASHBOARD} element={<DashBoard />}></Route>
            <Route path={path.MANAGE_USER} element={<ManageUser />}></Route>
            <Route path={path.CREATE_USER} element={<CreateUser />}></Route>
            <Route path={path.CREATE_COURSE} element={<CreateCourse />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
