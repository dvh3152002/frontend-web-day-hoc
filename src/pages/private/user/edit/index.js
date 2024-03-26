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

function EditUser() {
  const { id } = useParams();
  const { userDetail } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [file, setFile] = useState();
  const [user, setUser] = useState({});

  const getListRole = async () => {
    const res = await roleService.getListRole();
    if (res.success) setRoles(res.data);
  };

  const getUser = async () => {
    dispatch(setLoading({ isLoading: true }));
    dispatch(userAction.getDetailUser(id));
    dispatch(setLoading({ isLoading: false }));
  };

  useEffect(() => {
    getListRole();
  }, [id]);

  useEffect(() => {
    getUser();
  }, [dispatch]);

  useEffect(() => {
    setUser({
      ...userDetail,
      roles: userDetail?.roles?.map((role) => role.id),
    });
  }, [userDetail]);

  const changeImage = useCallback(
    (file) => {
      setFile(file);
    },
    [file]
  );

  const updateUser = async (data) => {
    const formData = setFormData(data);
    dispatch(setLoading({ isLoading: true }));
    const res = await userService.updateUser(id, formData);
    if (res?.success) {
      message.success("Cập nhật người dùng thành công");
      navigate("/admin/user");
    } else message.error("Cập nhật người dùng thất bại");
    dispatch(setLoading({ isLoading: false }));
  };

  const onFinish = () => {
    updateUser({
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
