import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Col, Row } from "antd";
import * as courseService from "../../../apis/service/CourseService";
import Course from "../../../components/course";
import { useMediaQuery } from "react-responsive";
import { Typography, Pagination, Select, Input } from "antd";
import SearchItem from "../../../components/search-item";
import { useDispatch, useSelector } from "react-redux";
import { price, ratings, sortCourse } from "../../../utils/contant";
import * as categoryAction from "../../../store/action/CategoryAction";
import { setLoading } from "../../../store/slice/LoadingSlice";

function Courses() {
  const { category } = useParams();

  const [dataParam, setDataParam] = useState({
    idCategory: category !== "all" ? category : null,
  });
  const [courses, setCourses] = useState([]);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryAction.getListCategory());
  }, []);
  const isDesktopOrLaptop = useMediaQuery({
    minWidth: 1224,
  });
  const isTablet = useMediaQuery({
    maxWidth: 1224,
    minWidth: 640,
  });

  const getListCourse = async () => {
    dispatch(setLoading({ isLoading: true }));

    const res = await courseService.getListCourse({
      ...dataParam,
    });
    if (res.success) setCourses(res.data);
    dispatch(setLoading({ isLoading: false }));
  };
  useEffect(() => {
    getListCourse();
  }, [dataParam]);

  const handleChangeSelect = (value, name) => {
    setDataParam({ ...dataParam, [name]: value });
  };

  const handleChangePage = (start, limit) => {
    setDataParam({ ...dataParam, start: start - 1, limit: limit });
  };

  const handleChangeSort = (value) => {
    let parts = value.split(",");
    setDataParam({ ...dataParam, sortField: parts[0], sortType: parts[1] });
  };

  const handleChangePrice = (value) => {
    let parts = value.split(",");
    if (parts.length > 0) {
      setDataParam({ ...dataParam, minPrice: parts[0], maxPrice: parts[1] });
    } else {
      setDataParam({ ...dataParam, minPrice: parts[0] });
    }
  };

  const handleChangeInput = (e) => {
    setDataParam({ ...dataParam, keywords: e.target.value });
  };

  return (
    <div>
      <Row className="border p-4 mt-8 mb-8 m-auto">
        <Input placeholder="Tìm kiếm theo tên" onChange={handleChangeInput} />

        <Col className="mt-5" span={isDesktopOrLaptop ? 20 : 24}>
          <Row>
            <Col
              span={isDesktopOrLaptop ? 6 : isTablet ? 8 : 24}
              className="flex flex-col gap-2"
            >
              <p>Giá tiền</p>
              <Select
                onChange={handleChangePrice}
                defaultValue="0"
                style={{
                  width: 180,
                }}
                options={price}
              />
            </Col>
            <Col
              span={isDesktopOrLaptop ? 6 : isTablet ? 8 : 24}
              className="flex flex-col gap-2"
            >
              <p>Danh mục</p>
              <Select
                onChange={(value) => handleChangeSelect(value, "idCategory")}
                defaultValue={null}
                style={{ width: 180 }}
              >
                <Select.Option value={null}>Tất cả</Select.Option>
                {categories?.map((item) => {
                  return (
                    <Select.Option value={item.id}>{item.name}</Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col
              span={isDesktopOrLaptop ? 6 : isTablet ? 8 : 24}
              className="flex flex-col gap-2"
            >
              <p>Đánh giá</p>
              <Select
                onChange={(value) => handleChangeSelect(value, "rating")}
                defaultValue={null}
                style={{
                  width: 180,
                }}
                options={ratings}
              />
            </Col>
            <Col
              className="flex flex-col gap-2"
              span={isDesktopOrLaptop ? 6 : isTablet ? 8 : 24}
            >
              <span>Sắp xếp </span>
              <Select
                defaultValue={"createDate,DESC"}
                onChange={(value) => handleChangeSort(value)}
                style={{
                  width: 180,
                }}
                options={sortCourse}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Typography.Title className="text-center">
        Danh sách khóa học
      </Typography.Title>
      <div>
        {courses?.items?.length > 0 ? (
          <>
            <Row>
              {courses.items.map((item) => {
                return (
                  <Col
                    span={isDesktopOrLaptop ? 6 : isTablet ? 8 : 24}
                    className="mb-3"
                  >
                    <Course
                      isDesktopOrLaptop={isDesktopOrLaptop}
                      isTablet={isTablet}
                      key={item.id}
                      data={item}
                    />
                  </Col>
                );
              })}
            </Row>
            <Pagination
              // defaultPageSize={12}
              // pageSizeOptions={[8, 12, 32, 40]}
              // showSizeChanger
              className="text-center mt-5 cursor-pointer"
              defaultCurrent={1}
              total={courses?.total}
              onChange={handleChangePage}
            />
          </>
        ) : (
          "Không có khóa học phù hợp"
        )}
      </div>
    </div>
  );
}

export default Courses;
