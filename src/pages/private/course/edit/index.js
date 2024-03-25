import React from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";
import DetailCourse from "../../../../components/course-detail";
import Rating from "../../../../components/rating";
import ManageLesson from "../../lesson/manage";

function EditCourse() {
  const tabs = [
    {
      label: `Thông tin khóa học`,
      key: 1,
      children: <DetailCourse />,
    },
    {
      label: `Bài giảng khóa học`,
      key: 2,
      children: <ManageLesson />,
    },
    {
      label: `Đánh giá khóa học`,
      key: 3,
      children: <Rating isDelete={true} />,
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
