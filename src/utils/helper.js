import { message } from "antd";
import cloudinary from "cloudinary-core";

export const formatMoney = (number) =>
  Number((Math.round(number / 1000) * 1000)?.toFixed(1)).toLocaleString();

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const beforeUpload = (file) => {
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

export const setFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("Content-Type", "multipart/form-data");

  return formData;
};

export const setUrlFile = (file) => {
  const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "dcylbuqrg" }); // Thay 'your_cloud_name' bằng tên cloud của bạn
  const url = cloudinaryCore.url(file, {
    resource_type: "image",
    secure: true,
  });
  return url;
};

export const roundNumber = (number) => {
  return number.toFixed(2);
};
