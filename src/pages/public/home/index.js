import React, { useEffect, useState } from "react";
import CarouselSlider from "../../../components/carousel";
import { Col, Row } from "antd";
import Sidebar from "../../../components/sidebar";
import { Tabs } from "antd";
import * as courseService from "../../../apis/service/CourseService";
import SlickComponent from "../../../components/slick";
import { useMediaQuery } from "react-responsive";

function Home() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    maxWidth: 1224,
    minWidth: 640,
  });

  const [courses, setCourses] = useState([]);
  const [params, setParams] = useState({
    sortField: "createDate",
    sortType: "DESC",
  });

  const getListCourse = async () => {
    const res = await courseService.getListCourse(params);
    if (res?.success) setCourses(res.data.items);
  };

  useEffect(() => {
    getListCourse();
  }, [params]);

  const items = [
    {
      key: "createDate",
      label: "Mới nhất",
      children: (
        <SlickComponent
          isDesktopOrLaptop={isDesktopOrLaptop}
          isTablet={isTablet}
          courses={courses}
        />
      ),
    },
    {
      key: "discount",
      label: "Giảm giá",
      children: (
        <SlickComponent
          isDesktopOrLaptop={isDesktopOrLaptop}
          isTablet={isTablet}
          courses={courses}
        />
      ),
    },
  ];

  const onChange = (key) => {
    setParams({ ...params, sortField: key });
  };

  return (
    <div className="w-full">
      <Row>
        <Col span={5} className="border-2 mr-2">
          <Sidebar />
        </Col>
        <Col span={18} className="border-2">
          <CarouselSlider />
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Home;
