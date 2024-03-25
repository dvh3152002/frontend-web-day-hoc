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
import * as categoryAction from "../../../../store/action/CategoryAction";
import * as userService from "../../../../apis/service/UserService";
import * as courseService from "../../../../apis/service/CourseService";
import MarkdownEditor from "../../../../components/markdown";
import UploadImage from "../../../../components/upload-image";
import { setFormData } from "../../../../utils/helper";

function CreateCourse() {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [invalidField, setInvalidField] = useState("");
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

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

  const changeImage = useCallback(
    (file) => {
      setFile(file);
    },
    [file]
  );

  const changeValue = useCallback(
    (e) => {
      setDescription(e);
    },
    [description]
  );

  const createCourse = async (data) => {
    const formData = setFormData(data);

    const res = await courseService.createCourse(formData);
    if (res?.success) {
      message.success("Thêm khóa học thành công");
      navigate("/admin/course");
    } else message.error("Thêm khóa học thất bại");
  };

  const onFinish = (data) => {
    if (!description) setInvalidField("Vui lòng nhập vào mô tả khóa học!");
    else {
      createCourse({
        ...data,
        description: description,
        file: file,
      });
    }
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
        initialValues={{
          discount: 0,
        }}
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

        <Form.Item label="Giảm giá (%)" name="discount">
          <InputNumber min={0} max={100} defaultValue={0} />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryId"
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
          name="userId"
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
          name="file"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh!",
            },
          ]}
        >
          <div className="avatar flex gap-3">
            <UploadImage setFile={changeImage} />
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

        <Form.Item label="Mô tả" name="description">
          <MarkdownEditor name="description" changeValue={changeValue} />
          {invalidField && (
            <small className="text-red-500 text-sm">{invalidField}</small>
          )}
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
