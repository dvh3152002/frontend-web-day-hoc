import React, { useEffect, useState } from "react";
import {
  Input,
  Form,
  Button,
  InputNumber,
  Typography,
  Row,
  Col,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import * as categoryAction from "../../../../store/action/CategoryAction";
import * as userService from "../../../../apis/service/UserService";

function CreateCourse() {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const getListUser = async () => {
    const res = await userService.getListUser({
      start: 0,
      limit: 50,
      roles: 3,
    });
    if (res.success) setUsers(res.data);
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    dispatch(categoryAction.getListCategory());
    getListUser();
    dispatch(setLoading({ isLoading: false }));
  }, []);

  const onFinish = (data) => {
    console.log("data: ", data);
  };

  return (
    <div className="p-6">
      <Typography.Title className="border-b pb-2 pl-2">
        Thêm khóa học
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
        <Form.Item
          label="Tên khóa học"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào tên khóa học!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá tiền"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào giá tiền!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          // rules={[
          //   {
          //     required: true,
          //     message: "Vui lòng nhập vào mô tả!",
          //   },
          // ]}
        >
          {/* <CkeditorComponent
      data={detailCourse?.description}
      onReady={(editor) => {
        editor.editing.view.change((write) => {
          write.setStyle(
            "height",
            "300px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log("dataEditor: ", data);
        setDescription(data);
      }}
    /> */}
        </Form.Item>

        <Form.Item label="Giảm giá (%)" name="discount">
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="idCategory"
          rules={[
            {
              required: true,
              message: "Chọn danh mục cho khóa học",
            },
          ]}
        >
          <Select
            style={{
              width: "50%",
            }}
            options={categories?.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Người giảng dạy"
          name="idUser"
          rules={[
            {
              required: true,
              message: "Chọn người giảng dạy cho khóa học",
            },
          ]}
        >
          <Select
            style={{
              width: "50%",
            }}
            options={users.items?.map((user) => ({
              value: user.id,
              label: user.fullname,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Ảnh"
          name="image"
          rules={
            [
              // {
              //   required: true,
              //   message: "Vui lòng chọn ảnh!",
              // },
            ]
          }
        >
          <div className="avatar flex gap-3">
            {/* <Upload onChange={handleChangeAvatar} maxCount={1}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {imgSrc && (
        <img
          src={imgSrc}
          className="h-[70px] w-[70px] border-2 object-cover"
          alt="avatar"
        />
      )} */}
          </div>
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

export default CreateCourse;
