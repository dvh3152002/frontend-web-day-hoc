import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Form, Button, Typography, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import * as userService from "../../../../apis/service/UserService";
import * as roleService from "../../../../apis/service/RoleService";
import UploadImage from "../../../../components/upload-image";
import { setFormData } from "../../../../utils/helper";
import * as userAction from "../../../../store/action/UserAction";
import { useQuery } from "@tanstack/react-query";
import { useUpdateUser } from "../../../../apis/hooks/userMutationHook";

function EditUser() {
  const { id } = useParams();
  // const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [file, setFile] = useState();
  const [user, setUser] = useState({});

  const getListRole = async () => {
    const res = await roleService.getListRole();
    if (res.success) setRoles(res.data);
  };

  useEffect(() => {
    getListRole();
  }, []);

  const getDetailUser = async () => {
    const res = await userService.getDetailUser(id);
    return res;
  };

  const { data: userDetail, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: getDetailUser,
  });

  useEffect(() => {
    const data = userDetail?.data;

    setUser({
      ...data,
      roles: data?.roles?.map((role) => role.id),
    });
  }, [userDetail]);

  const changeImage = useCallback(
    (file) => {
      setFile(file);
    },
    [file]
  );

  const { mutate } = useUpdateUser();

  const onFinish = () => {
    mutate({
      id: id,
      ...user,
      file: file,
    });
  };

  const handleChangeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeRole = (value) => {
    setUser({
      ...user,
      roles: value, // Cập nhật giá trị của trường roles với giá trị mới
    });
  };

  return (
    <div className="p-6">
      <Typography.Title className="border-b pb-2 pl-2">
        Cập nhật người dùng
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
      >
        <Form.Item label="Họ tên">
          <Input
            name="fullname"
            onChange={handleChangeValue}
            value={user?.fullname}
          />
        </Form.Item>

        <Form.Item
          label="Email"
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
          <Input
            name="email"
            onChange={handleChangeValue}
            value={user?.email}
          />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ bệnh nhân!",
            },
          ]}
        >
          <Input
            name="address"
            onChange={handleChangeValue}
            value={user?.address}
          />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          rules={[
            {
              required: true,
              message: "Chọn quyền người dùng",
            },
          ]}
        >
          <Select
            name="roles"
            value={user?.roles}
            onChange={handleChangeRole}
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
          <UploadImage setFile={changeImage} url={user?.avatar} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditUser;
