import React, { useEffect, useState } from "react";
import CarouselSlider from "../../../components/carousel";
import { Col, Row } from "antd";
import Sidebar from "../../../components/sidebar";
import { Tabs } from "antd";
import * as courseService from "../../../apis/service/CourseService";
import SlickComponent from "../../../components/slick";
import { useMediaQuery } from "react-responsive";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "../../../components/loading";

function Home() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    maxWidth: 1224,
    minWidth: 640,
  });

  const [params, setParams] = useState({
    sortField: "createDate",
    sortType: "DESC",
  });

  const getListCourse = async () => {
    const res = await courseService.getListCourse(params);
    return res;
  };

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses", params],
    queryFn: getListCourse,
  });

  const items = [
    {
      key: "createDate",
      label: "Mới nhất",
      children: (
        <SlickComponent
          isDesktopOrLaptop={isDesktopOrLaptop}
          isTablet={isTablet}
          courses={courses?.data?.items}
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
          courses={courses?.data?.items}
        />
      ),
    },
  ];

  const onChange = (key) => {
    setParams({ ...params, sortField: key });
  };

  return (
    <div className="w-full">
      <LoadingComponent isLoading={isLoading}>
        <Row>
          <Col span={5} className="border-2 mr-2">
            <Sidebar />
          </Col>
          <Col span={18} className="border-2">
            <CarouselSlider />
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </LoadingComponent>
    </div>
  );
}

export default Home;
