import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Form,
  Button,
  InputNumber,
  Typography,
  Select,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import * as userService from "../../../../apis/service/UserService";
import * as roleService from "../../../../apis/service/RoleService";
import UploadImage from "../../../../components/upload-image";
import { setFormData } from "../../../../utils/helper";

function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [file, setFile] = useState();

  const getListRole = async () => {
    const res = await roleService.getListRole();
    if (res.success) setRoles(res.data);
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListRole();
    dispatch(setLoading({ isLoading: false }));
  }, []);

  const changeImage = useCallback(
    (file) => {
      setFile(file);
    },
    [file]
  );

  const createUser = async (data) => {
    const formData = setFormData(data);
    const res = await userService.createUser(formData);
    if (res?.success) {
      message.success("Thêm người dùng thành công");
      navigate("/admin/user");
    } else message.error("Thêm người dùng thất bại");
  };

  const onFinish = (data) => {
    createUser({
      ...data,
      file: file,
    });
  };

  return (
    <div className="p-6">
      <Typography.Title className="border-b pb-2 pl-2">
        Thêm người dùng
      </Typography.Title>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          minWidth: 600,
        }}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          discount: 0,
        }}
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
              type: "email",
              message: "Không đúng định dạng email!",
            },
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
              message: "Vui lòng nhập địa chỉ!",
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

        <Form.Item
          label="Vai trò"
          name="roles"
          rules={[
            {
              required: true,
              message: "Chọn quyền người dùng",
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{
              width: "50%",
            }}
            options={roles?.items?.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện"
          name="file"
          rules={
            [
              // {
              //   required: true,
              //   message: "Vui lòng chọn ảnh!",
              // },
            ]
          }
        >
          <UploadImage setFile={changeImage} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateUser;
