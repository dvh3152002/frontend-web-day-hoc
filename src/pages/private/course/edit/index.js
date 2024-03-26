import React from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import DetailCourse from "../detail";
import Rating from "../../../../components/rating";
import ManageLesson from "../../lesson/manage";

function EditCourse() {
  const { id } = useParams();

  const tabs = [
    {
      label: `Thông tin khóa học`,
      key: 1,
      children: <DetailCourse id={id} />,
    },
    {
      label: `Bài giảng khóa học`,
      key: 2,
      children: <ManageLesson id={id} />,
    },
    {
      label: `Đánh giá khóa học`,
      key: 3,
      children: <Rating isDelete={true} id={id} />,
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

export default EditCourse;
