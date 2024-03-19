import React, { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { NavLink } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Typography.Title style={{ color: "white" }}>ECourse</Typography.Title>,
    "logo"
  ),
  getItem(
    <NavLink to="/admin/dashboard">Biểu đồ</NavLink>,
    "dashboard",
    <DashboardOutlined />
  ),
  getItem("Quản lý người dùng", "user", <UserOutlined />, [
    getItem(
      <NavLink to="/admin/user/create">Thêm người dùng</NavLink>,
      "createUser"
    ),
    getItem(
      <NavLink to="/admin/user">Danh sách người dùng</NavLink>,
      "listUser"
    ),
  ]),
  getItem("Quản lý khóa học", "course", <UserOutlined />, [
    getItem(
      <NavLink to="/admin/course/create">Thêm khóa học</NavLink>,
      "createCourse"
    ),
    getItem(
      <NavLink to="/admin/course">Danh sách khóa học</NavLink>,
      "listCourse"
    ),
  ]),
  getItem("Quản lý đơn hàng", "order", <MoneyCollectOutlined />),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const SidebarAdmin = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          minHeight: "100vh",
          padding: "10px 0",
        }}
        theme="dark"
        items={items}
      />
    </div>
  );
};
export default SidebarAdmin;
