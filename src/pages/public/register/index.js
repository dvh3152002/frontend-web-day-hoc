import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userService from "../../../apis/service/UserService";
import { setLoading } from "../../../store/slice/LoadingSlice";
import LoadingComponet from "../../../components/loading/index";
import { useRegister } from "../../../apis/hooks/authMutationHook";

function Register() {
  const { mutate, isPending } = useRegister();

  const onFinish = async (data) => {
    mutate(data);
  };

  return (
    <div className="container">
      <div className="max-w-lg mx-auto p-4 mt-10 rounded-xl shadow bg-white">
        <div className="flex flex-col items-center">
          <Typography.Title level={3}>Đăng kí tài khoản</Typography.Title>
        </div>
        <Form
          name="signup"
          onFinish={onFinish}
          autoComplete="on"
          layout="vertical"
        >
          <Form.Item
            label="Họ tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ bệnh nhân!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <LoadingComponet isLoading={isPending}>
              <Button
                className="bg-blue-500 text-white"
                htmlType="submit"
                block
              >
                Đăng kí
              </Button>
            </LoadingComponet>
          </Form.Item>

          <Form.Item>
            <span>Bạn đã có tài khoản? </span>
            <NavLink className="text-blue-500" to="/login">
              Đăng nhập
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
