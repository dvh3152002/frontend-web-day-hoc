import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography, Rate, Pagination } from "antd";
import { formatMoney } from "../../../utils/helper";
import * as courseService from "../../../apis/service/CourseService";
import Rating from "../../../components/rating";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../components/loading";

function DetailCourse() {
  const { id } = useParams();

  const getDetailCourse = async () => {
    const res = await courseService.getDetailCourse(id);
    return res;
  };

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: getDetailCourse,
  });

  return (
    <div className="w-full min-h-screen">
      <LoadingComponent isLoading={isLoading}>
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
                {course?.data?.name}
              </Typography.Title>
              <Row>
                {course?.data?.rating === 0 ? (
                  <p>Chưa có đánh giá</p>
                ) : (
                  <div className="flex items-center">
                    <span
                      style={{ color: "#fadb14", fontSize: 14, marginRight: 3 }}
                    >
                      {course?.data?.rating?.toFixed(1)}
                    </span>
                    <Rate
                      disabled
                      allowHalf
                      value={course?.data?.rating}
                      style={{ fontSize: 14 }}
                    />
                  </div>
                )}
              </Row>
              <Typography.Title
                level={3}
                style={{ color: "white", display: "block" }}
              >
                Được giảng dạy bởi {course?.data?.user?.fullname}
              </Typography.Title>
            </div>
            <div
              className="mb-5"
              dangerouslySetInnerHTML={{ __html: course?.data?.description }}
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
                src={course?.data?.image}
                alt={course?.data.name}
              />
            </div>
            <div className="text-xl">
              {course?.data.discount > 0 ? (
                <>
                  <div className="block md:flex gap-3">
                    <p className="font-bold text-sm md:text-base text-red-500">
                      {`${formatMoney(
                        (course?.data.price * (100 - course?.data.discount)) /
                          100
                      )}`}
                      đ
                    </p>
                    <p className="line-through text-sm md:text-base">
                      {`${formatMoney(course?.data.price)}`}đ
                    </p>
                  </div>
                  <p className="text-sm md:text-base">
                    Giảm {course?.data.discount} %
                  </p>
                </>
              ) : (
                <span className="font-bold text-red-500">
                  {`${formatMoney(course?.data.price)}`}đ
                </span>
              )}
            </div>
            <Button className="w-full text-sm md:text-base bg-blue-500 text-white">
              Thêm vào giỏ
            </Button>
          </Col>
        </Row>
      </LoadingComponent>
    </div>
  );
}

export default DetailCourse;
