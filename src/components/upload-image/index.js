import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { getBase64 } from "../../utils/helper";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = (props) => {
  const { setFile, url } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(url);
  const [key, setKey] = useState(0);
  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const handleChange = async (info) => {
    const { fileList } = info;
    const f = fileList[0];
    const isJpgOrPng = f.type === "image/jpeg" || f.type === "image/png";
    if (isJpgOrPng) {
      if (!f.url && !f.preview) {
        f.preview = await getBase64(f.originFileObj);
      }
      setImageUrl(f.preview);
      setFile(f.originFileObj);
      setKey((prevKey) => prevKey + 1);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Upload
        key={key}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
