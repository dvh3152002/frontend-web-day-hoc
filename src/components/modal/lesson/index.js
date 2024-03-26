import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalLesson = (props) => {
  const { isModalOpen, handleCancel, setLesson, idCourse, lesson } = props;
  const [file, setFile] = useState({});
  const [video, setVideo] = useState();

  useEffect(() => {
    setVideo(lesson?.video);
  }, [lesson]);

  const onFinish = (values) => {
    // console.log("values: ", values);
    // if (!file || Object.keys(file).length === 0) {
    //   message.error("Vui lòng chọn video!");
    //   return;
    // }
    setLesson({ ...values, video: file, idCourse: idCourse, id: lesson?.id });
  };

  const beforeUpload = (file) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("Bạn chỉ có thể tải lên file video!");
    }
    return isVideo;
  };

  const handleChange = (info) => {
    const { file } = info;
    setFile(file.originFileObj || {});
  };

  return (
    <Modal
      title={`${lesson ? "Cập nhật" : "Thêm"} khóa học`}
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={750}
      destroyOnClose
    >
      <Form
        name="basic"
        style={{ minWidth: 600 }}
        onFinish={onFinish}
        initialValues={lesson}
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

        <Form.Item
          label="Video"
          name="video"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn video!",
            },
          ]}
        >
          <Upload
            accept="video/*"
            beforeUpload={beforeUpload}
            maxCount={1}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Click để tải lên</Button>
          </Upload>
          <video controls className="w-full mt-3" height="300">
            <source src={video} type="video/mp4" alt="" />
          </video>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {lesson ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLesson;
