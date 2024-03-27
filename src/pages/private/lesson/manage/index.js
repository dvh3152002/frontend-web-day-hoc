import React, { memo, useEffect, useRef, useState } from "react";
import { Typography, Table, Input, Space, Button, message, Modal } from "antd";
import * as lessonService from "../../../../apis/service/LessonService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ModalLesson from "../../../../components/modal/lesson";
import moment from "moment";
import { setFormData } from "../../../../utils/helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutationHook } from "../../../../apis/hooks/userMutationHook";
import LoadingComponent from "../../../../components/loading";
import {
  useCreateLesson,
  useDeleteLesson,
  useUpdateLesson,
} from "../../../../apis/hooks/lessonMutationHook";

function ManageLesson(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const [bodyData, setBodyData] = useState({
    limit: 10,
    start: 0,
    idCourse: id,
  });
  const [rowSelection, setRowSelection] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [lesson, setLesson] = useState();

  const { mutate: updateLessonHook } = useUpdateLesson();

  const { mutate: createLessonHook } = useCreateLesson();

  const { mutate: deleteLeson } = useDeleteLesson();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };

  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const getListLessonByCourse = async () => {
    const res = await lessonService.getListLessonByCourse(bodyData);
    return res;
  };

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons", bodyData],
    queryFn: getListLessonByCourse,
  });

  const createLesson = async (data) => {
    createLessonHook(data);
    handleCancel();
  };

  const handleSetLesson = async (record) => {
    const res = await lessonService.getLessonById(record.id);
    if (res.success) {
      setLesson(res.data);
      showModalUpdate();
    } else message.error(`Không tồn tại bài học có id là: ${id}`);
  };

  // Các hàm xử lý sự kiện sắp xếp
  const handleTableChange = (pagination, filters, sorter) => {
    setBodyData({
      ...bodyData,
      start: pagination.current - 1,
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortType: sorter.order,
    });
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <div
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (record) => {
    confirm({
      title: "Xóa khóa học",
      content: "Bạn có chắc chắn muốn xóa khóa học này",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        deleteLeson(record.id);
      },
    });
  };

  const renderAction = (record) => {
    return (
      <div>
        <EditOutlined
          className="text-3xl text-orange-500 cursor-pointer mr-3"
          onClick={() => handleSetLesson(record)}
        />
        <DeleteOutlined
          className="text-3xl text-red-500 cursor-pointer"
          onClick={() => handleDelete(record)}
        />
      </div>
    );
  };

  const updateLesson = (data) => {
    updateLessonHook(data);
    handleCancelUpdate();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      // render: (video) => (
      //   // <ReactPlayer width={450} height={300} url={setUrlVideo(video)} />
      //   <video controls width="250" height="200">
      //     <source src={video} type="video/mp4" alt="" />
      //   </video>
      // ),
      width: "30%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate) => <p>{moment(createDate).format("DD/MM/YYYY")}</p>,
      sortDirections: ["DESC", "ASC"],
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, record) => renderAction(record),
    },
  ];

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between">
          <Typography.Title>Danh sách bài học</Typography.Title>
          <Button type="primary" onClick={showModal}>
            Thêm mới
          </Button>
        </div>
        <LoadingComponent isLoading={isLoading}>
          <Table
            columns={columns}
            dataSource={lessons?.data?.items}
            pagination={{
              defaultPageSize: bodyData.limit,
              showSizeChanger: true,
              pageSizeOptions: ["10", "25", "50"],
              total: lessons?.data?.total,
            }}
            onChange={handleTableChange} // Xử lý sự kiện sắp xếp
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelection(record.id);
                }, // click row
              };
            }}
          />
        </LoadingComponent>
      </div>
      <ModalLesson
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setLesson={createLesson}
        idCourse={id}
      />
      <ModalLesson
        isModalOpen={isModalUpdateOpen}
        handleCancel={handleCancelUpdate}
        setLesson={updateLesson}
        idCourse={id}
        lesson={lesson}
      />
    </>
  );
}

export default memo(ManageLesson);
