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
import * as postService from "../../../../apis/service/PostService";
import { setFormData } from "../../../../utils/helper";
import MarkdownEditor from "../../../../components/markdown";

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [invalidField, setInvalidField] = useState("");
  const [description, setDescription] = useState();

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));

    dispatch(setLoading({ isLoading: false }));
  }, []);

  const createPost = async (data) => {
    const res = await postService.createPost(data);
    if (res?.success) {
      message.success("Thêm bài viết thành công");
      navigate("/admin/post");
    } else message.error("Thêm bài viết thất bại");
  };

  const onFinish = (data) => {
    if (!description) setInvalidField("Vui lòng nhập vào mô tả khóa học!");
    else {
      createPost({
        ...data,
        description: description,
      });
    }
  };

  const changeValue = useCallback(
    (e) => {
      setDescription(e);
    },
    [description]
  );

  return (
    <div className="p-6">
      <Typography.Title className="border-b pb-2 pl-2">
        Thêm bài viết
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
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề!",
            },
          ]}
        >
          <Input />
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

export default CreatePost;
