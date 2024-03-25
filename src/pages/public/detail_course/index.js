import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography, Rate, Pagination } from "antd";
import { formatMoney, setUrlFile } from "../../../utils/helper";
import * as courseService from "../../../apis/service/CourseService";
import Rating from "../../../components/rating";
import { setLoading } from "../../../store/slice/LoadingSlice";

function DetailCourse() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState({});

  const getDetailCourse = async () => {
    dispatch(setLoading({ isLoading: true }));
    const res = await courseService.getDetailCourse(id);
    if (res.success) setCourse(res.data);
    dispatch(setLoading({ isLoading: false }));
  };

  useEffect(() => {
    getDetailCourse();
  }, [id]);

  return (
    <div className="w-full min-h-screen">
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        className="w-full relative"
      >
        <Col className="gutter-row" span={18}>
          <div className="bg-black text-white py-3 px-5">
            <Typography.Title style={{ color: "white", display: "block" }}>
              {course?.name}
            </Typography.Title>
            <Row>
              {course?.rating === 0 ? (
                <p>Chưa có đánh giá</p>
              ) : (
                <div className="flex items-center">
                  <span
                    style={{ color: "#fadb14", fontSize: 14, marginRight: 3 }}
                  >
                    {course?.rating?.toFixed(1)}
                  </span>
                  <Rate
                    disabled
                    allowHalf
                    value={course?.rating}
                    style={{ fontSize: 14 }}
                  />
                </div>
              )}
            </Row>
            <Typography.Title
              level={3}
              style={{ color: "white", display: "block" }}
            >
              Được giảng dạy bởi {course?.user?.fullname}
            </Typography.Title>
          </div>
          <div
            className="mb-5"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          ></div>
          <div className="border-2 px-5 py-2 pb-10 min-h-[300px] relative">
            <p className="text-2xl text-center uppercase">Đánh giá</p>
            <Rating id={id}></Rating>
          </div>
        </Col>
        <Col
          className="gutter-row border-2 py-5 w-full px-2 flex flex-col gap-3 h-[450px]"
          span={6}
        >
          <div className="w-full">
            <img
              style={{ height: "300px", width: "100%" }}
              src={setUrlFile(course?.image)}
              alt={course.name}
            />
          </div>
          <div className="text-xl">
            {course.discount > 0 ? (
              <>
                <div className="block md:flex gap-3">
                  <p className="font-bold text-sm md:text-base text-red-500">
                    {`${formatMoney(
                      (course.price * (100 - course.discount)) / 100
                    )}`}
                    đ
                  </p>
                  <p className="line-through text-sm md:text-base">
                    {`${formatMoney(course.price)}`}đ
                  </p>
                </div>
                <p className="text-sm md:text-base">Giảm {course.discount} %</p>
              </>
            ) : (
              <span className="font-bold text-red-500">
                {`${formatMoney(course.price)}`}đ
              </span>
            )}
          </div>
          <Button className="w-full text-sm md:text-base bg-blue-500 text-white">
            Thêm vào giỏ
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default DetailCourse;
