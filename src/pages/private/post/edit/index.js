import React from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import DetailPost from "../detail";
import Rating from "../../../../components/rating";
import ManageLesson from "../../lesson/manage";

function EditPost() {
  const { id } = useParams();

  const tabs = [
    {
      label: `Thông tin bài viết`,
      key: 1,
      children: <DetailPost id={id} />,
    },
    {
      label: `Quản lý code`,
      key: 2,
      children: <ManageLesson id={id} />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="p-5">
      <Tabs onChange={onChange} type="card" items={tabs} />
    </div>
  );
}

export default EditPost;
