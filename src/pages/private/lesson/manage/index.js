import React, { useEffect, useRef, useState } from "react";
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

function ManageLesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [bodyData, setBodyData] = useState({
    limit: 10,
    start: 0,
    idCourse: id,
  });
  const [update, setUpdate] = useState(false);
  const [rowSelection, setRowSelection] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [lesson, setLesson] = useState();

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
    if (res.success) setData(res.data);
  };

  const deleteLesson = async (id) => {
    dispatch(setLoading({ isLoading: true }));

    const res = await lessonService.deleteLesson(id);
    if (res.success) {
      message.success("Xóa bài học thành công");
      setUpdate(!update);
    } else message.error("Xóa bài học thất bại");
    dispatch(setLoading({ isLoading: false }));
  };

  const createLesson = async (data) => {
    const formData = setFormData(data);
    dispatch(setLoading({ isLoading: true }));

    const res = await lessonService.createLesson(formData);
    if (res.success) {
      message.success("Thêm bài học thành công");
      setUpdate(!update);
      handleCancel();
    } else message.error("Thêm bài học thất bại");
    dispatch(setLoading({ isLoading: false }));
  };

  const updateLesson = async (data) => {
    const formData = setFormData(data);
    dispatch(setLoading({ isLoading: true }));

    const res = await lessonService.updateLesson(data?.id, formData);
    if (res.success) {
      message.success("Cập nhật bài học thành công");
      setUpdate(!update);
      handleCancelUpdate();
    } else message.error("Cập nhật bài học thất bại");
    dispatch(setLoading({ isLoading: false }));
  };

  const handleSetLesson = async (record) => {
    dispatch(setLoading({ isLoading: true }));

    const res = await lessonService.getLessonById(record.id);
    if (res.success) {
      setLesson(res.data);
      showModalUpdate();
    } else message.error(`Không tồn tại bài học có id là: ${id}`);
    dispatch(setLoading({ isLoading: false }));
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListLessonByCourse();
    dispatch(setLoading({ isLoading: false }));
  }, []);

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListLessonByCourse();
    dispatch(setLoading({ isLoading: false }));
  }, [bodyData, update]);

  // Các hàm xử lý sự kiện sắp xếp
  const handleTableChange = (pagination, filters, sorter) => {
    setBodyData({
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
        deleteLesson(record.id);
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
      render: (video) => (
        // <ReactPlayer width={450} height={300} url={setUrlVideo(video)} />
        <video controls width="250" height="200">
          <source src={video} type="video/mp4" alt="" />
        </video>
      ),
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
        <Table
          columns={columns}
          dataSource={data.items}
          pagination={{
            defaultPageSize: bodyData.limit,
            showSizeChanger: true,
            pageSizeOptions: ["10", "25", "50"],
            total: data.total,
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

export default ManageLesson;
