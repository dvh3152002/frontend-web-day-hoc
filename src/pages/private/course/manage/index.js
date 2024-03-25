import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Table,
  Input,
  Space,
  Button,
  message,
  Modal,
  Image,
  Rate,
} from "antd";
import * as courseService from "../../../../apis/service/CourseService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../store/slice/LoadingSlice";
import { SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { formatMoney, setUrlFile } from "../../../../utils/helper";
import { price, ratings } from "../../../../utils/contant";

function ManageCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [bodyData, setBodyData] = useState({ limit: 10, start: 0 });
  const [update, setUpdate] = useState(false);
  const [rowSelection, setRowSelection] = useState();

  const getListCourse = async () => {
    const res = await courseService.getListCourse(bodyData);
    if (res.success) setData(res.data);
  };

  const deleteUser = async (id) => {
    dispatch(setLoading({ isLoading: true }));
    const res = await courseService.deleteCourse(id);
    if (res.success) {
      message.success("Xóa khóa học thành công");
      setUpdate(!update);
    } else message.error("Xóa khóa học thất bại");
    dispatch(setLoading({ isLoading: false }));
  };

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListCourse();
    dispatch(setLoading({ isLoading: false }));
  }, []);

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    getListCourse();
    dispatch(setLoading({ isLoading: false }));
  }, [bodyData, update]);

  // Các hàm xử lý sự kiện sắp xếp
  const handleTableChange = (pagination, filters, sorter) => {
    const filteredData = {};
    Object.keys(filters).forEach((key) => {
      if (key === "roles" && filters[key]) {
        filteredData[key] = filters[key].join(",");
      } else {
        const values = Array.isArray(filters[key])
          ? filters[key].join(", ")
          : filters[key];

        filteredData[key] = values;
      }
    });
    setBodyData({
      start: pagination.current - 1,
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortType: sorter.order,
      ...filteredData,
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
      title: "Xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa khóa học này",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        deleteUser(record.id);
      },
    });
  };

  const renderAction = (record) => {
    return (
      <div>
        <EyeOutlined
          className="text-3xl text-blue-500 cursor-pointer mr-3"
          onClick={() => {
            navigate(`/admin/course/edit/${record.id}`);
          }}
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
      width: "2%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh khóa học",
      dataIndex: "image",
      render: (image) => (
        <Image src={setUrlFile(image)} width={150} height={100} />
      ),
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "7%",
      render: (price) => `${formatMoney(price)}đ`,
      filters: price.map((item) => ({
        text: item.label,
        value: item.value,
      })),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      width: "10%",
      render: (createDate) => (
        <span>{moment(createDate).format("DD/MM/YYYY")}</span>
      ),
      sortDirections: ["DESC", "ASC"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Rate
          disabled
          allowHalf
          defaultValue={rating}
          style={{ fontSize: "12px" }}
        />
      ),

      width: "10%",
      filters: ratings.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      sortDirections: ["DESC", "ASC"],
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, record) => renderAction(record),
    },
  ];

  return (
    <div className="p-2">
      <Typography.Title className="border-b pb-2">
        Danh sách người dùng
      </Typography.Title>
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
  );
}

export default ManageCourse;
