import React, { memo, useEffect, useState } from "react";
import { Pagination, Rate, Modal, message } from "antd";
import moment from "moment";
import * as ratingService from "../../apis/service/RatingService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slice/LoadingSlice";
import { DeleteOutlined } from "@ant-design/icons";

function Rating(props) {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const { id, isDelete } = props;
  const [rating, setRating] = useState([]);
  const [start, setStart] = useState(1);
  const [isUpdate, setUpdate] = useState(1);

  useEffect(() => {
    getListRating();
  }, [start]);
  const getListRating = async () => {
    dispatch(setLoading({ isLoading: true }));

    const res = await ratingService.getListRating({
      idCourse: id,
      start: start - 1,
    });
    if (res.success) setRating(res.data);
    dispatch(setLoading({ isLoading: false }));
  };

  const handleDelete = (id) => {
    confirm({
      title: "Xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa người dùng này",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        deleteRating(id);
      },
    });
  };

  const deleteRating = async (id) => {
    const res = await ratingService.deleteRating(id);
    if (res.success) {
      message.success("Xóa bình luận thành công");
      setUpdate(!isUpdate);
    } else message.error("Xóa bình luận thất bại");
  };

  return (
    <>
      {rating?.items?.length > 0 ? (
        <>
          <div className="mb-5">
            {rating &&
              rating?.items?.map((item) => {
                return (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center gap-5 mb-5">
                      <img
                        className="border-2 rounded-full h-[50px] w-[50px]"
                        src={
                          item.user?.image
                            ? item.user?.image
                            : "data:image/jpeg;base64,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"
                        }
                      />
                      <div>
                        <p className="font-bold">{item.user.fullname}</p>
                        <div className="flex items-center gap-3">
                          <p>{moment(item.createDate).format("DD/MM/YYYY")}</p>
                          <Rate
                            disabled
                            allowHalf
                            value={item.ratePoint}
                            style={{ fontSize: 14 }}
                          />
                        </div>
                        <p>{item.content}</p>
                      </div>
                    </div>
                    {isDelete && (
                      <DeleteOutlined
                        onClick={() => handleDelete(item.id)}
                        className="text-lg text-red-500 cursor-pointer"
                      />
                    )}
                  </div>
                );
              })}
          </div>
          <div className="">
            <Pagination
              current={start}
              total={rating.total}
              defaultPageSize={5}
              onChange={(page) => {
                setStart(page);
              }}
            />
          </div>
        </>
      ) : (
        <p>Chưa có đánh giá</p>
      )}
    </>
  );
}

export default memo(Rating);
