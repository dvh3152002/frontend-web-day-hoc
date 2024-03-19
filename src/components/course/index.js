import React from "react";
import { Card } from "antd";
import { formatMoney } from "../../utils/helper";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

function Course(props) {
  const navigate = useNavigate();
  const { data, isDesktopOrLaptop, isTablet } = props;
  return (
    <div className="w-full m-auto">
      <Card
        onClick={() => navigate(`/course/${data.id}/${data.slug}`)}
        // hoverable
        style={{
          width: isDesktopOrLaptop || isTablet ? "95%" : "100%",
          fontSize: isTablet ? 13 : 16,
          border: "1px solid black",
          minHeight: 330,
        }}
        className="cursor-pointer"
        cover={
          <img
            alt={data.name}
            src={
              data.image
                ? data.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgUj8mrkUcIsa9f-JmK1Tr7wzP2mZKBFKVw&usqp=CAU"
            }
            style={{ height: "180px" }}
          />
        }
      >
        <Meta
          title={data.name}
          description={data.discount > 0 ? `Giảm tới ${data.discount}%` : ""}
        />
        <Rate disabled allowHalf defaultValue={data.rating} />
        <div className="flex gap-3">
          {data.discount > 0 ? (
            <>
              <span className="font-bold text-red-500">
                {`${formatMoney((data.price * (100 - data.discount)) / 100)}`}đ
              </span>
              <span className="line-through">
                {`${formatMoney(data.price)}`}đ
              </span>
            </>
          ) : (
            <span className="font-bold text-red-500">
              {`${formatMoney(data.price)}`}đ
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Course;
