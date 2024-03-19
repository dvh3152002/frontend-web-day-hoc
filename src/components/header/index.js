import React, { useEffect, useState } from "react";
import { Menu, Typography, Popover, Avatar } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  HddOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/UserSlice";
import { getProfile } from "../../store/action/UserAction";
import { useMediaQuery } from "react-responsive";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    maxWidth: 1224,
    minWidth: 640,
  });
  const { isLoggedIn, user } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getProfile());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  const [current, setCurrent] = useState("");
  const onMenuClick = (item) => {
    navigate(`/${item.key !== "logo" ? item.key : ""}`);
    setCurrent(item.key !== "logo" ? item.key : "");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const content = (
    <div className="flex flex-col gap-3">
      <NavLink to="/profile">
        <UserOutlined />
        Thông tin cá nhân
      </NavLink>
      <NavLink to="/profile">
        <MenuOutlined /> Khóa học của tôi
      </NavLink>
      <NavLink to="/profile">
        <ShoppingCartOutlined /> Giỏ hàng của tôi
      </NavLink>
      <NavLink to="/profile">
        <HddOutlined /> Lịch sử đã mua
      </NavLink>
      <p className="cursor-pointer hover:text-blue-500" onClick={handleLogout}>
        <LogoutOutlined /> Đăng xuất
      </p>
    </div>
  );

  return (
    <div className="container px-3 flex items-center justify-between">
      <Menu
        onClick={onMenuClick}
        selectedKeys={[current]}
        breakpoint="lg"
        items={[
          // {
          //   label: (
          //     <Typography.Title className="w-[200px]">ECourse</Typography.Title>
          //   ),
          //   key: "logo",
          // },
          {
            label: "Trang chủ",
            key: "",
          },
          {
            label: "Khóa học",
            key: "course/all",
          },
          {
            label: "Bài viết",
            key: "post",
          },
          {
            label: "Liên hệ",
            key: "contact",
          },
        ]}
        mode="horizontal"
        className="w-[70%]"
      />
      {isLoggedIn ? (
        <>
          <Popover content={content} placement="bottom" trigger="click">
            <Avatar size={50} src={user?.avatar} icon={<UserOutlined />} />
            <span>{user?.fullname}</span>
          </Popover>
        </>
      ) : (
        <NavLink to={"/login"} className="text-gray-500 hover:text-gray-800">
          Đăng nhập
        </NavLink>
      )}
    </div>
  );
}

export default Header;
