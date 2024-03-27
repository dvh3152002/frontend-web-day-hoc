import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import * as categoryAction from "../../../../store/action/CategoryAction";
import * as userService from "../../../../apis/service/UserService";
import * as courseAction from "../../../../store/action/CourseAction";
import * as courseService from "../../../../apis/service/CourseService";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import MarkdownEditor from "../../../../components/markdown";
import { setFormData } from "../../../../utils/helper";
import UploadImage from "../../../../components/upload-image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "../../../../components/loading";
import { useMutationHook } from "../../../../apis/hooks/userMutationHook";
import { useUpdateCourse } from "../../../../apis/hooks/courseMutationHook";

function DetailCourse() {
  const { id } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [invalidField, setInvalidField] = useState("");
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [course, setCourse] = useState();

  const getDetailCourse = async () => {
    const res = await courseService.getDetailCourse(id);
    return res;
  };

  const { data: courses, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: getDetailCourse,
  });

  const getListUser = async () => {
    const res = await userService.getListUser({
      start: 0,
      limit: 50,
      roles: 3,
    });
    if (res.success) setUsers(res.data);
  };

  useEffect(() => {
    dispatch(categoryAction.getListCategory());
    getListUser();
  }, [id]);

  useEffect(() => {
    const data = courses?.data;
    setCourse({
      ...data,
      categoryId: data?.category?.id,
      userId: data?.user?.id,
    });
    setDescription(data?.description);
  }, [courses]);

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

  const { mutate, isPending } = useUpdateCourse();

  const onFinish = () => {
    if (!description) setInvalidField("Vui lòng nhập vào mô tả khóa học!");
    else {
      mutate({
        ...course,
        description: description,
        file: file,
      });
    }
  };

  const handleChangeValue = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (name, value) => {
    setCourse({ ...course, [name]: value });
  };

  return (
    <div className="p-6">
      <Typography.Title className="border-b pb-2 pl-2">
        Thông tin khóa học
      </Typography.Title>
      <LoadingComponent isLoading={isLoading || isPending}>
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
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào tên khóa học!",
              },
            ]}
          >
            <Input
              name="name"
              value={course?.name}
              onChange={handleChangeValue}
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào giá tiền!",
              },
            ]}
          >
            <InputNumber
              min={0}
              name="price"
              value={course?.price}
              onChange={(value) => handleChangeSelect("price", value)}
            />
          </Form.Item>

          <Form.Item label="Giảm giá (%)">
            <InputNumber
              min={0}
              max={100}
              name="discount"
              value={course?.discount}
              onChange={(value) => handleChangeSelect("discount", value)}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
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
              name="categoryId"
              onChange={(value) => handleChangeSelect("categoryId", value)}
              value={course?.categoryId}
              options={categories?.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Người giảng dạy"
            rules={[
              {
                required: true,
                message: "Chọn người giảng dạy cho khóa học",
              },
            ]}
          >
            <Select
              name="userId"
              onChange={(value) => handleChangeSelect("userId", value)}
              style={{
                width: "50%",
              }}
              value={course?.userId}
              options={users.items?.map((user) => ({
                value: user.id,
                label: user.fullname,
              }))}
            />
          </Form.Item>

          <Form.Item label="Ảnh" name="file">
            <div className="avatar flex gap-3">
              <UploadImage setFile={changeImage} url={course?.image} />
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
            <MarkdownEditor
              name="description"
              changeValue={changeValue}
              value={course?.description}
            />
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </LoadingComponent>
    </div>
  );
}

export default DetailCourse;
